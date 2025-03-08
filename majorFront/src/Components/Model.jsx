import React from 'react'
import { useLoader } from '@react-three/fiber'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { PLYLoader } from 'three/examples/jsm/loaders/PLYLoader.js';
import * as THREE from 'three';


function Model({ objPath, mtlPath, ...props }) {
  console.log("Obj Path in model ",objPath)
  // Load the MTL file first
  const materials = useLoader(MTLLoader, mtlPath)
  // Preload materials and pass them to the OBJLoader
  const object = useLoader(OBJLoader, objPath, (loader) => {
    materials.preload();
    loader.setMaterials(materials);
  });

  return <primitive object={object} {...props} />
}

function facePlyModel({plyPath,...props}){
  console.log("ply file path",plyPath)

  const geometry=useLoader(PLYLoader,plyPath)

  geometry.computeVertexNormals();

  // const material = new THREE.MeshStandardMaterial({ color: 'orange' });
    const material = new THREE.MeshStandardMaterial({ vertexColors: true });

  return <mesh geometry={geometry} material={material} {...props} />;
}

function PlyModel({ plyPath, pointSize = 0.05, ...props }) {
  const geometry = useLoader(PLYLoader, plyPath)

  // Create buffer geometry with positions from the PLY data
  const pointsGeometry = new THREE.BufferGeometry()
  const positions = new Float32Array(geometry.attributes.position.count * 3)
  positions.set(geometry.attributes.position.array)
  pointsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

  // Add colors if available in the PLY file
  if (geometry.attributes.color) {
    const colors = new Float32Array(geometry.attributes.color.array)
    pointsGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  }

  // Custom material for spherical points
  const material = new THREE.PointsMaterial({
    size: pointSize,
    vertexColors: true,
    alphaTest: 0.5,
    transparent: true,
    depthWrite: true,
    // Custom shader to make points appear spherical
    onBeforeCompile: (shader) => {
      shader.fragmentShader = shader.fragmentShader.replace(
        'gl_FragColor = vec4( outgoingLight, diffuseColor.a );',
        `
        vec2 circ = gl_PointCoord * 2.0 - 1.0;
        float dist = length(circ);
        if (dist > 1.0) discard;
        gl_FragColor = vec4(outgoingLight, diffuseColor.a * (1.0 - smoothstep(0.8, 1.0, dist)));
        `
      )
    }
  })

  return <points 
  geometry={pointsGeometry}  
  rotation={[ 0,3.14,3.14]} 
  material={material} {...props} />
}
export {Model,PlyModel,facePlyModel}
