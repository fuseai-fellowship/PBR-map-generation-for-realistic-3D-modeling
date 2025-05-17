import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useAssetContext } from './AssetContext';

const AssetInfo = ({ onClose }) => {
  const { currentAsset } = useAssetContext();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-40 bg-black/50 flex items-center justify-center p-4"
    >
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-xl"
      >
        <div className="p-4 bg-[#1a472a] flex justify-between items-center">
          <h3 className="text-xl font-semibold text-white">Asset Information</h3>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-[#143620] transition-colors text-white"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-5">
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-500">Name</h4>
              <p className="text-lg text-gray-900">{currentAsset.name}</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-500">Description</h4>
              <p className="text-base text-gray-700">{currentAsset.description}</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-500">Author</h4>
              <p className="text-base text-gray-700">{currentAsset.author}</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-500">License</h4>
              <p className="text-base text-gray-700">{currentAsset.license}</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-500">Resolution</h4>
              <p className="text-base text-gray-700">{currentAsset.resolution}</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-500">Polygon Count</h4>
              <p className="text-base text-gray-700">{currentAsset.polygonCount} triangles</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-500">File Format</h4>
              <p className="text-base text-gray-700">{currentAsset.fileFormat}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AssetInfo;
