import React from 'react';
import { useAssetContext } from './AssetContext';

const ModelViewer = () => {
  const { currentAsset } = useAssetContext();

  return (
    <div className="h-full w-full bg-gradient-to-b from-gray-800 to-gray-900 relative">
      <img 
        src="https://images.pexels.com/photos/1089438/pexels-photo-1089438.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt="3D Model Preview"
        className="w-full h-full  object-cover"
      />
    </div>
  );
};

export default ModelViewer;
