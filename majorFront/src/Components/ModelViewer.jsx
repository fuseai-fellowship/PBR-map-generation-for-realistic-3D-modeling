import React, { useState ,Suspense,useEffect} from 'react';
import { useAssetContext } from './AssetContext';
import { FaFileAlt } from "react-icons/fa";

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import {Model,PlyModel} from './Model';


const ModelViewer = () => {
  const { currentAsset,objectBlob } = useAssetContext();
  // console.log("Model url is ",objectBlob)
  const [plyReceived,setReceived]=useState(null)
 
  useEffect(() => {
    if (objectBlob) {
      const url = URL.createObjectURL(objectBlob);
      setReceived(url);
  
      // Optional cleanup
      return () => URL.revokeObjectURL(url);
    }
  }, [objectBlob]);

  return (
    <div className='w-full h-full flex flex-col justify-start rounded-lg p-4'>
    <div className='relative w-full h-full rounded-sm items-center justify-center'>
      {/* <div className='absolute top-0 left-0 w-1/4 bg-green-300 rounded-sm p-1'>
        3D point cloud
      </div> */}
      {plyReceived ? (
        <div className="bg-blue-300 w-full h-full rounded-xl">
        <Canvas className="w-full h-full"  camera={{ position: [0, 2, 40] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={2} />
          <Suspense fallback={null}>
            {/* <Model 
                objPath={objUrl}
                mtlPath={mtlUrl}
              // objPath="/src/Components/assets/resource/cottage/cottage_obj.obj" 
              // mtlPath="/src/Components/assets/resource/cottage/cottage_obj.mtl" 
              position={[0, 0, 10]}
              scale={[1, 1, 1]}
            /> */}

            <PlyModel
            plyPath={plyReceived}
            position={[0, 0, 0]}
            scale={[10, 10, 10]}
            />
            {/* <Box /> */}
          </Suspense>
          <OrbitControls />
        </Canvas>
      </div>
      ) : (
        <div className='h-full flex flex-col justify-center text-center border-2 rounded-2xl p-4 '>
          <FaFileAlt className='self-center text-5xl mb-4' />
          <div className='text-2xl '>
            3D point cloud
            <br /> will <br />appear here
          </div>
        </div>
      )}
    </div>
    {/* <div 
      className='w-full self-center mt-1 py-2 text-xl text-slate-700 bg-blue-300 border-2 rounded-sm cursor-pointer'
      // onClick={downloadPly}
    >
      Download 
    </div> */}
  </div>
  );
};

export default ModelViewer;
