import React from 'react';
import { motion } from 'framer-motion';
import { X, Download } from 'lucide-react';
import { useAssetContext } from './AssetContext';
import ModelViewer from './ModelViewer';

const FullscreenViewer = ({ type, onClose }) => {
  const { currentAsset,objectBlob } = useAssetContext();
  
  const getPBRIndex = () => {
    if (type.startsWith('pbr-')) {
      return parseInt(type.split('-')[1], 10);
    }
    return 0;
  };

  const getActiveContent = () => {
    if (type === 'original') {
      return (
        <div className="flex items-center justify-center h-full w-full">
          <img 
            src={currentAsset.originalImageUrl} 
            alt={`Original image of ${currentAsset.name}`}
            className="max-h-full max-w-full object-contain"
          />
        </div>
      );
    } else if (type.startsWith('pbr')) {
      const index = getPBRIndex();
      const map = currentAsset.pbrMaps[index];
      
      return (
        <div className="flex flex-col items-center justify-center h-full w-full">
          <h3 className="text-2xl font-medium mb-4">{map.type} Map</h3>
          <div className="relative max-h-[80%] max-w-[80%]">
            <img 
              src={map.url} 
              alt={`${map.type} map for ${currentAsset.name}`}
              className="max-h-full max-w-full object-contain"
            />
          </div>
        </div>
      );
    } else {
      return (
        <div className="w-full h-full flex items-center justify-center p-20">
          <ModelViewer />
        </div>
      );
    }
  };

  const getDownloadLink = () => {
    console.log("model blob is ",objectBlob)
    if (type === 'original') {
      return {
        url: currentAsset.originalImageUrl,
        filename: `${currentAsset.name.toLowerCase().replace(/\s+/g, '-')}-original.jpg`
      };
    } else if (type.startsWith('pbr')) {
      const index = getPBRIndex();
      const map = currentAsset.pbrMaps[index];
      return {
        url: map.url,
        filename: `${currentAsset.name.toLowerCase().replace(/\s+/g, '-')}-${map.type}.jpg`
      };
    } else {
      return {
        url:URL.createObjectURL(objectBlob),
        filename: `model.ply`
      };
    }
  };

  const downloadInfo = getDownloadLink();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black flex items-center justify-center"
    >
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 p-2 rounded-full bg-white hover:bg-gray-400 transition-colors z-10 cursor-pointer"
        aria-label="Close fullscreen view"
      >
        <X size={24} />
      </button>

      <a 
        href={downloadInfo.url}
        download={downloadInfo.filename}
        className="absolute top-6 left-6 flex items-center gap-2 py-2 px-4 rounded-lg bg-white hover:bg-blue-700 hover:text-white transition-colors z-10"
      >
        <Download size={18} />
        <span>Download</span>
      </a>

      <div className='w-full h-full'>
        {getActiveContent()}
      </div>
    </motion.div>
  );
};

export default FullscreenViewer;
