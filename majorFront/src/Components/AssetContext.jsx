import React, { createContext, useContext, useState } from 'react';

// Sample data
const sampleAsset = {
  id: '1',
  name: 'Metallic Sphere',
  description: 'A high-quality PBR metallic sphere with various material properties for use in 3D applications and games.',
  author: 'Design Studio',
  license: 'CC BY 4.0',
  resolution: '2048x2048',
  polygonCount: 4096,
  fileFormat: 'glTF 2.0 (.glb)',
  originalImageUrl: 'https://images.pexels.com/photos/1121123/pexels-photo-1121123.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  modelUrl: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Sphere/glTF-Binary/Sphere.glb',
  pbrMaps: [
    {
      type: 'Ambient',
      url: 'https://images.pexels.com/photos/7640027/pexels-photo-7640027.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      description: 'Base color texture',
      blob:null
    },
    {
      type: 'Normal',
      url: 'https://images.pexels.com/photos/5022847/pexels-photo-5022847.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      description: 'Surface detail texture',
      blob:null
    },
    {
      type: 'Roughness',
      url: 'https://images.pexels.com/photos/5022849/pexels-photo-5022849.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      description: 'Surface roughness texture',
      blob:null
    },
    {
      type: 'Depth',
      url: 'https://images.pexels.com/photos/139309/pexels-photo-139309.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      description: 'Metal property texture',
      blob:null
    }
  ],


};

// Create context
const AssetContext = createContext();

// Provider component
export const AssetProvider = ({ children }) => {
  const [currentAsset,setAsset] = useState( sampleAsset);
  const [objectBlob,setBlob]=useState(null )
  // const addURL=(type)=>{
  //   console.log("it reached here ")
  //   sampleAsset.pbrMaps.forEach((items)=>{
  //     if (items.type == type){
  //       items.url='https://plus.unsplash.com/premium_photo-1673967831980-1d377baaded2?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2F0c3xlbnwwfHwwfHx8MA%3D%3D';
  //     }
  //   })
    
  //   setAsset(sampleAsset)
  //   console.log("\n hello",currentAsset)
  // }
  const addBlob=(blob)=>{
    setBlob(blob)
  }
  const updatePBRMapByType = (type, newData) => {
    setAsset(prev => ({
      ...prev,
      pbrMaps: prev.pbrMaps.map(map =>
        map.type === type ? { ...map, ...newData } : map
      )
    }));
  };
  const updateAllPBRMap = (type,newData) => {
    setAsset(prev => ({
      ...prev,
      pbrMaps: prev.pbrMaps.map(map =>
        type === 'all' ? { ...map, ...newData } : map
      )
    }));
  };

  return (
    <AssetContext.Provider value={{ currentAsset,objectBlob,addBlob,updatePBRMapByType,updateAllPBRMap }}>
      {children}
    </AssetContext.Provider>
  );
};

// Custom hook to use the context
export const useAssetContext = () => {
  const context = useContext(AssetContext);
  if (context === undefined) {
    throw new Error('useAssetContext must be used within an AssetProvider');
  }
  return context;
};
