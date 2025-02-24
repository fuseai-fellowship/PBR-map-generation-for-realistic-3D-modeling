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

function PlyModel({plyPath,...props}){
  console.log("ply file path",plyPath)

  const geometry=useLoader(PLYLoader,plyPath)

  geometry.computeVertexNormals();

  const material = new THREE.MeshStandardMaterial({ color: 'orange' });
    // const material = new THREE.MeshStandardMaterial({ vertexColors: true });

  return <mesh geometry={geometry} material={material} {...props} />;
}
export {Model,PlyModel}
