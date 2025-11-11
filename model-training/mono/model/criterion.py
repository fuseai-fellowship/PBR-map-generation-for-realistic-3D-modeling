# criterion.py

# ... (Existing imports, including your HuberLoss class)
from mono.model.losses.HuberLoss import HuberLoss

def build_criterions(cfg):
    
    # 1. Instantiate the Huber Loss
    # You should configure the delta and weight here, possibly using 'cfg'
    huber_loss_instance = HuberLoss(
        delta=1.0, 
        loss_weight=1.0 
        
    )
    
    # 2. Construct the criterions dictionary
    criterions = {
        # *** MAIN LOSS: ONLY HUBERLOSS INSTANCE ***
        'decoder_losses': [huber_loss_instance], 
        
        # *** AUXILIARY LOSSES: MUST BE EMPTY LISTS ***
        'auxi_losses': [], 
        'pose_losses': [], 
        'gru_losses': [],
    }
    
    # This is the line you originally asked about, which returns the configured dictionary
    return criterions