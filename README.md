<<<<<<< HEAD
# PBR Image Extractor and 3D viewer

A robust tool for extracting Physically Based Rendering (PBR) textures from given image. This project extracts key PBR maps (such as diffuse, normal, roughness, metallic, etc.) from Image and makes them available for display and further processing like viewing it in 3D .

## Features

- **Automatic Extraction:** Extracts PBR images from uploaded Image.
- **Multi-Map Support:** Supports diffuse, normal, roughness, metallic, and other common PBR texture maps.
- **RESTful API:** Provides endpoints to upload Image files and retrieve extracted textures.
- **Frontend Viewer:** A simple React-based UI to preview and download the extracted textures and 3D view.
- **Extensible:** Easily integrate with THREE Js for 3D rendering and viewing.

## Technologies Used

- **Backend:** Node.js, Express, Multer, Unzipper
- **Frontend:** React, Axios, JSZip (for client-side extraction), Tailwind CSS
- **Version Control:** Git & GitHub

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/)

### Clone the Repository

```bash
git clone https://github.com/Kingyakstha/MajorProject.git
cd MajorProject
```
### Backend Setup
It is a demo backend for testing purposes.
Navigate to the backend folder:
```bash
cd backend
```
Install dependencies:
```bash
npm install
```
Start the server:
```bash
npm run dev
```
The backend server will run on http://localhost:4004.

### Frontend Setup
Open a new terminal and navigate to the frontend folder:
```bash
cd frontend
```
Install dependencies:
```bash

npm install
```
Start the React development server:
```bash

npm start
```
The frontend will open in your default browser (usually on http://localhost:5173).

```bash
MajorProject/
├── majorBack/                  # Server-side code
│   ├── cottage/                # Model files
│   └── server.js               # Main server file (Express, etc.)
├── majorFront/                 # Client-side React application
│   ├── public/                
│   └── src/
│       ├── Components/         # Reusable React components
│       │   ├── assets/         # Images, fonts, and other static resources
│       │   ├── DnN.jsx
│       │   ├── index.js
│       │   ├── Inputt.jsx
│       │   ├── Items.jsx
│       │   ├── Model.jsx
│       │   ├── Navbar.jsx
│       │   ├── PBR.jsx
│       │   ├── Prediction.jsx
│       │   └── reconstruct.jsx
│       ├── Pages/              # Page-level components
│       │   ├── index.jsx
│       │   ├── LandingPage.jsx
│       │   └── M3dcopy.jsx
│       ├── App.jsx             # Root app component
│       ├── index.css           # Global CSS styles
│       └── main.jsx            # Application entry point
└── README.md                   
```
=======
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



>>>>>>> b255ca04fe8b31287a1d2c8ddfdaeb1193dc2fd3
