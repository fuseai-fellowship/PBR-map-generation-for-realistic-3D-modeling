import torch
import torch.nn as nn
from mono.utils.comm import get_func
# from mono.utils.comm import get_func # This import is assumed to work in your environment
# from mono.model.criterion import build_criterions # Assuming HuberLoss is a custom criterion
import numpy as np
import torch.nn.functional as F

# --- HUBER LOSS DEFINITION ---
# You need to ensure this or a similar HuberLoss class is accessible for use in criterions_main.
class HuberLoss(nn.Module):
    """
    Implements the Huber Loss (Smooth L1 Loss) based on its formula.
    L_delta(d) = 0.5 * d^2          if |d| <= delta
    L_delta(d) = delta * |d| - 0.5 * delta^2 if |d| > delta
    where d = (prediction - target)
    NOTE: 'mask' and other kwargs are typically passed to a loss function
    in this framework, but the original HuberLoss implementation provided 
    didn't use them directly for masking/weighting. 
    A robust version would incorporate the 'mask'.
    """
    def __init__(self, delta=1.0, loss_weight=1.0, data_type=['any']):
        super(HuberLoss, self).__init__()
        self.loss_weight = loss_weight
        self.delta = delta
        # Added for compatibility with create_mask_as_loss
        self.data_type = data_type 
        
    # Required for the loss dictionary key generation
    def _get_name(self):
        return 'HuberLoss'
        
    def forward(self, prediction, target, mask=None, **kwargs):
        """
        Calculates the mean Huber Loss between prediction and target.
        Applies masking if provided.
        """
        if prediction.shape != target.shape:
            raise ValueError(f"Shape mismatch: {prediction.shape} vs {target.shape}")
            
        # 1. Calculate the difference (d)
        diff = torch.abs(prediction - target)
        
        # 2. Identify regions where |d| <= delta (L2 region)
        L2_mask = diff <= self.delta
        
        # 3. Apply the L2 formula: 0.5 * d^2
        L2_loss = 0.5 * (diff**2)
        
        # 4. Apply the L1 formula: delta * |d| - 0.5 * (self.delta**2)
        L1_loss = self.delta * diff - 0.5 * (self.delta**2)
        
        # 5. Combine the two regions using the mask
        huber_loss_per_pixel = torch.where(L2_mask, L2_loss, L1_loss)
        
        # 6. Apply the provided mask if it exists
        if mask is not None:
            huber_loss_per_pixel = huber_loss_per_pixel * mask.float()
            # Calculate mean over ONLY the unmasked elements
            mean_huber_loss = huber_loss_per_pixel.sum() / (mask.sum() + 1e-8)
        else:
            # Calculate mean loss across all pixels
            mean_huber_loss = torch.mean(huber_loss_per_pixel)
        
        # 7. Return the scaled loss (a PyTorch tensor)
        return mean_huber_loss * self.loss_weight


# --- BASE DEPTH MODEL CLASS ---
class BaseDepthModel(nn.Module):
    def __init__(self, cfg, criterions, **kwards):
        super(BaseDepthModel, self).__init__()    
        model_type = cfg.model.type
        # Assuming get_func is correctly implemented elsewhere
        self.depth_model = get_func('mono.model.model_pipelines.' + model_type)(cfg) 

        self.criterions_main = criterions['decoder_losses'] if criterions and 'decoder_losses' in criterions else None
        self.criterions_auxi = criterions['auxi_losses'] if criterions and 'auxi_losses' in criterions else None
        self.criterions_pose = criterions['pose_losses'] if criterions and 'pose_losses' in criterions else None
        self.criterions_gru = criterions['gru_losses'] if criterions and 'gru_losses' in criterions else None
        try:
            self.downsample = cfg.prediction_downsample
        except:
            self.downsample = None

        self.training = True

    def forward(self, data):
        if self.downsample != None:
            self.label_downsample(self.downsample, data)
        
        output = self.depth_model(**data)

        losses_dict = {}
        if self.training:
            output.update(data)
            losses_dict = self.get_loss(output)
        if self.downsample != None:
            self.pred_upsample(self.downsample, output)

        return output, losses_dict
    
    def inference(self, data):
        with torch.no_grad():
            output = self.depth_model(**data)
            output.update(data)

        if self.downsample != None:
            self.pred_upsample(self.downsample, output)

            output['dataset'] = 'wild'
        return output

    def get_loss(self, paras):
        losses_dict = {}
        # Losses for training
        if self.training:
            # decode branch is the ONLY branch we use now (to calculate Huber Loss)
            losses_dict.update(self.compute_decoder_loss(paras))
            
            # The following calls are commented out/removed to ensure ONLY Huber Loss 
            # (which must be in self.criterions_main) is calculated.
            # losses_dict.update(self.compute_auxi_loss(paras))
            # losses_dict.update(self.compute_pose_loss(paras))
            # losses_dict.update(self.compute_gru_loss(paras))

            # --- START FIX FOR 'AttributeError: 'int' object has no attribute 'backward'' ---
            
            # 1. Collect all TENSOR values from the dictionary.
            tensor_losses = [v for v in losses_dict.values() if isinstance(v, torch.Tensor)]
            
            # 2. Sum the tensors. The result is guaranteed to be a tensor.
            if tensor_losses:
                # total_loss is now the Huber Loss (or sum of Huber Loss components)
                total_loss = sum(tensor_losses) 
            else:
                total_loss = torch.tensor(0.0, device=paras['input'].device, requires_grad=True)

            # 3. Store the total loss TENSOR. This is the value used by .backward()
            losses_dict['total_loss'] = total_loss
            
            # 4. Convert individual losses to scalars for clean logging/printing.
            for k, v in losses_dict.items():
                 if k != 'total_loss' and isinstance(v, torch.Tensor):
                    losses_dict[k] = v.detach().item() 
            
            # --- END FIX ---
            
        return losses_dict
    
    def compute_gru_loss(self, paras_):
        losses_dict = {}
        if self.criterions_gru is None or len(self.criterions_gru) == 0:
            return losses_dict
        
        # The logic remains the same for GRU, but these losses will only 
        # be calculated if they are explicitly added back to get_loss.
        
        paras = {k:v for k,v in paras_.items() if k!='prediction' and k!='prediction_normal'}
        n_predictions = len(paras['predictions_list'])
        for i, pre in enumerate(paras['predictions_list']):
            if i == n_predictions-1:
                break
            #if i % 3 != 0:
                #continue
            if 'normal_out_list' in paras.keys():
                pre_normal = paras['normal_out_list'][i]
            else:
                pre_normal = None
            iter_dict = self.branch_loss(
                prediction=pre,
                prediction_normal=pre_normal,
                criterions=self.criterions_gru,
                branch=f'gru_{i}',
                **paras
            )
            # We adjust the loss_gamma so it is consistent for any number of RAFT-Stereo iterations
            adjusted_loss_gamma = 0.9**(15/(n_predictions - 1))
            i_weight = adjusted_loss_gamma**(n_predictions - i - 1)
            # Ensure weighting is applied to a tensor, result is a tensor
            iter_dict = {k:v*i_weight for k,v in iter_dict.items()} 
            losses_dict.update(iter_dict)
        return losses_dict

    def compute_decoder_loss(self, paras):
        losses_dict = {}
        # This will calculate Huber Loss if it is configured in self.criterions_main
        if self.criterions_main is None or len(self.criterions_main) == 0:
             return losses_dict
             
        decode_losses_dict = self.branch_loss(
            prediction=paras['prediction'], # Assuming main prediction is here
            criterions=self.criterions_main, 
            branch='decode',
            **paras
            )
        return decode_losses_dict
    
    def compute_auxi_loss(self, paras):
        losses_dict = {}
        if self.criterions_auxi is None or len(self.criterions_auxi) == 0:
            return losses_dict
        args = dict(
            target=paras['target'],
            data_type=paras['data_type'],
            sem_mask=paras['sem_mask'],
        )
        for i, auxi_logit in enumerate(paras['auxi_logit_list']): 
            auxi_losses_dict = self.branch_loss(
                prediction=paras['auxi_pred'][i],
                criterions=self.criterions_auxi,
                pred_logit=auxi_logit,     
                branch=f'auxi_{i}',
                **args
                )
            losses_dict.update(auxi_losses_dict)
        return losses_dict
    
    def compute_pose_loss(self, paras):
        losses_dict = {}
        if self.criterions_pose is None or len(self.criterions_pose) == 0:
            return losses_dict
            
        for loss_method in self.criterions_pose:
            loss_tmp = loss_method(**paras)
            if not isinstance(loss_tmp, torch.Tensor):
                 print(f"Warning: Pose loss {loss_method._get_name()} returned a non-tensor value!")
                 continue 
                 
            losses_dict['pose_' + loss_method._get_name()] = loss_tmp
        return losses_dict

    def branch_loss(self, criterions, branch='decode', **kwargs):    
        prediction = kwargs.pop('prediction')
        pred_logit = kwargs.pop('pred_logit', None) # pred_logit might not always exist

        B, _, _, _ = prediction.shape
        losses_dict = {}
        args = dict(pred_logit=pred_logit)
        
        target = kwargs.pop('target')
        args.update(kwargs)

        # data type for each batch
        batches_data_type = np.array(kwargs.pop('data_type'))
        
        mask = target > 1e-8
        for loss_method in criterions:
            # sample batches, which satisfy the loss requirement for data types
            new_mask = self.create_mask_as_loss(loss_method, mask, batches_data_type)

            # Pass prediction, target, and the mask
            loss_tmp = loss_method(
                prediction=prediction, 
                target=target, 
                mask=new_mask, 
                **args)                
            losses_dict[branch + '_' + loss_method._get_name()] = loss_tmp
        return losses_dict
    
    def create_mask_as_loss(self, loss_method, mask, batches_data_type):
        # Assumes loss_method has a data_type attribute, which is a list of strings/ints
        data_type_req = np.array(loss_method.data_type)[:, None] 
        # Create a boolean mask where True means the batch sample matches one of the required data_types
        batch_mask = torch.tensor(np.any(data_type_req == batches_data_type, axis=0), device=mask.device) 
        # Combine the depth mask (target > 1e-8) with the batch data type mask
        new_mask = mask * batch_mask[:, None, None, None]
        return new_mask
    
    def label_downsample(self, downsample_factor, data_dict):
        scale_factor = float(1.0 / downsample_factor)
        downsample_target = F.interpolate(data_dict['target'], scale_factor=scale_factor)
        downsample_stereo_depth = F.interpolate(data_dict['stereo_depth'], scale_factor=scale_factor)

        data_dict['target'] = downsample_target
        data_dict['stereo_depth'] = downsample_stereo_depth

        return data_dict

    def pred_upsample(self, downsample_factor, data_dict):
        scale_factor = float(downsample_factor)
        upsample_prediction = F.interpolate(data_dict['prediction'], scale_factor=scale_factor).detach()
        upsample_confidence = F.interpolate(data_dict['confidence'], scale_factor=scale_factor).detach()

        data_dict['prediction'] = upsample_prediction
        data_dict['confidence'] = upsample_confidence

        return data_dict


def min_pool2d(tensor, kernel, stride=1):
    tensor = tensor * -1.0
    tensor = F.max_pool2d(tensor, kernel, padding=kernel//2, stride=stride)
    tensor = -1.0 * tensor
    return tensor