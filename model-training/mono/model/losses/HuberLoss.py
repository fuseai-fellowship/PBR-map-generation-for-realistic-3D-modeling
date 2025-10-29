import torch
import torch.nn as nn
import torch.nn.functional as F

class HuberLoss(nn.Module):
    """
    Implements the Huber Loss (Smooth L1 Loss) based on its formula.
    L_delta(d) = 0.5 * d^2         if |d| <= delta
    L_delta(d) = delta * |d| - 0.5 * delta^2 if |d| > delta
    where d = (prediction - target)
    """
    def __init__(self, delta=1.0, loss_weight=1.0):
        super(HuberLoss, self).__init__()
        self.loss_weight = loss_weight
        self.delta = delta
        
    def forward(self, prediction, target, **kwargs):
        """
        Calculates the mean Huber Loss between prediction and target.
        """
        if prediction.shape != target.shape:
            raise ValueError(f"Shape mismatch: {prediction.shape} vs {target.shape}")
            
        # 1. Calculate the difference (d)
        diff = torch.abs(prediction - target)
        
        # 2. Identify regions where |d| <= delta (L2 region)
        L2_mask = diff <= self.delta
        
        # 3. Apply the L2 formula: 0.5 * d^2
        L2_loss = 0.5 * (diff**2)
        
        # 4. Apply the L1 formula: delta * |d| - 0.5 * delta^2
        L1_loss = self.delta * diff - 0.5 * (self.delta**2)
        
        # 5. Combine the two regions using the mask
        # Use L2_loss where L2_mask is True, and L1_loss otherwise (where |d| > delta)
        huber_loss_per_pixel = torch.where(L2_mask, L2_loss, L1_loss)
        
        # 6. Calculate the mean loss across all pixels
        mean_huber_loss = torch.mean(huber_loss_per_pixel)
        
        # 7. Return the scaled loss (a PyTorch tensor, required for .backward())
        return mean_huber_loss * self.loss_weight



    