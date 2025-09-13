# 3D PBR image generation for realistic 3D modeling

## Introduction

This project introduces a cutting-edge, single-step AI framework designed to revolutionize the creation of Physically Based Rendering (PBR) maps. Our solution addresses the current bottleneck in 3D asset creation by providing a fast, accurate, and physically consistent method for generating essential PBR textures specifically, normal, roughness, metallic, and depth maps from a single RGB image. This significantly accelerates workflows for content creators, game developers, and visual effects artists.

## The Problem

Traditionally, generating high-quality PBR maps is a labor-intensive and specialized process involving manual texture painting, complex photogrammetry, or fragmented software solutions. Existing AI methods are often inefficient, focusing on generating only a single map type or producing inconsistent results that compromise realism. Our framework solves this by offering a unified and efficient solution.

## Solution 

We propose a unified AI-based framework that directly generates normal, roughness, metallic, and depth maps from a single RGB image in a single inference step. This innovative approach ensures:

- Speed: Rapid, simultaneous generation of all PBR maps.

- Accuracy: High-quality maps that capture intricate surface details and light interactions.

- Physical Consistency: Maps that are inherently consistent with each other, leading to more realistic material appearances under varying lighting conditions.

- Ease of Use: A streamlined process requiring only a single RGB input.

## Key features

- Single-step generation of Normal, Roughness, Metallic, and Depth maps.
- Input: A single RGB image.
- Output: Physically consistent PBR maps ready for 3D applications.
- User-friendly web interface.
- Fast inference times for quick iteration.

### Technologies used

* Frontend: React.js
* Backend: Django
* Database: SQLite



