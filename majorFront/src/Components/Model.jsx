import React from 'react'
import { useLoader } from '@react-three/fiber'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';


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

export default Model
