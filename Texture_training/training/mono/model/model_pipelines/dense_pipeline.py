import torch
import torch.nn as nn
from mono.utils.comm import get_func


class DensePredModel(nn.Module):
    def __init__(self, cfg):
        super(DensePredModel, self).__init__()

        self.encoder = get_func('mono.model.' + cfg.model.backbone.prefix + cfg.model.backbone.type)(**cfg.model.backbone)
        self.decoder = get_func('mono.model.' + cfg.model.decode_head.prefix + cfg.model.decode_head.type)(cfg)
        self.device_list = cfg.kaggle['device_list']
        # try:
        #     decoder_compiled = torch.compile(decoder, mode='max-autotune')
        #     "Decoder compile finished"
        #     self.decoder = decoder_compiled
        # except:
        #     "Decoder compile failed, use default setting"
        #     self.decoder = decoder

        self.training = True

    def to_grayscale(self,input):
        
        weights = torch.tensor([0.2989, 0.5870, 0.1140]).view(3, 1, 1).to("cuda")
        grayscale_batch = torch.sum(input* weights.view(1, 3, 1, 1), dim=1)
        return grayscale_batch

    
    def forward(self, input, **kwargs):
        # [f_32, f_16, f_8, f_4]
        
        # if len(self.device_list )>1:
        #     self.encoder = self.encoder.to(self.device_list[0])
        #     self.decoder = self.decoder.to(self.device_list[1])
        #     features = self.encoder(input)
        # # [x_32, x_16, x_8, x_4, x, ...]
        #     features=features.to(self.device[1])
        #     out = self.decoder(features, **kwargs)
        # else:
        features = self.encoder(input)
        gray_images=self.to_grayscale(input)
        # [x_32, x_16, x_8, x_4, x, ...]
        out = self.decoder(features,gray_images, **kwargs)
        return out