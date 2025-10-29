import torch
import torch.nn.functional as F

def generate_ambient_occlusion_map(depth_map, kernel_size=5):
    """
    Generate an Ambient Occlusion (AO) map from a depth map tensor.

    Args:
        depth_map (torch.Tensor): A 2D tensor representing the depth map with values in range [0, 1].
        kernel_size (int): The size of the Sobel kernel for computing gradients.

    Returns:
        torch.Tensor: A 2D tensor representing the AO map with values in range [0, 1].
    """
    if depth_map.dim() != 2:
        raise ValueError("depth_map must be a 2D tensor.")

    # Compute gradients in the x and y directions using Sobel filters
    sobel_x = torch.tensor([[-1, 0, 1], 
                            [-2, 0, 2], 
                            [-1, 0, 1]], dtype=torch.float32).unsqueeze(0).unsqueeze(0)  # Shape: (1, 1, 3, 3)
    
    sobel_y = torch.tensor([[-1, -2, -1], 
                            [ 0,  0,  0], 
                            [ 1,  2,  1]], dtype=torch.float32).unsqueeze(0).unsqueeze(0)  # Shape: (1, 1, 3, 3)

    # Add batch and channel dimensions to the depth map
    depth_map = depth_map.unsqueeze(0).unsqueeze(0)  # Shape: (1, 1, H, W)

    # Apply Sobel filters
    grad_x = F.conv2d(depth_map, sobel_x, padding=1)  # Shape: (1, 1, H, W)
    grad_y = F.conv2d(depth_map, sobel_y, padding=1)  # Shape: (1, 1, H, W)

    # Compute the gradient magnitude
    gradient_magnitude = torch.sqrt(grad_x**2 + grad_y**2)

    # Normalize the gradient magnitude to range [0, 1]
    gradient_magnitude = (gradient_magnitude - gradient_magnitude.min()) / (gradient_magnitude.max() - gradient_magnitude.min())

    # Invert the gradient magnitude to simulate ambient occlusion
    ao_map = 1.0 - gradient_magnitude

    # Remove batch and channel dimensions for output
    ao_map = ao_map.squeeze(0).squeeze(0)  # Shape: (H, W)

    return ao_map