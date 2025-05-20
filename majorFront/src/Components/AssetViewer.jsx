import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Maximize2, Download, Info } from 'lucide-react';
import { useAssetContext } from './AssetContext';
import OriginalImage from './OriginalImage';
import PBRImages from './PBRImages';
import ModelViewer from './ModelViewer';
import FullscreenViewer from './FullscreenViewer';
import AssetInfo from './AssetInfo';

const AssetViewer = () => {
  const { currentAsset,objectBlob} = useAssetContext();
  const [activeView, setActiveView] = useState(null);
  const [showFullscreen, setShowFullscreen] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  
  const handleFullscreen = (type, index) => {
    setActiveView(type === 'pbr' && index !== undefined ? `pbr-${index}` : type);
    setShowFullscreen(true);
  };

  return (

    <div className="py-24 px-4 sm:px-8 md:px-16 lg:px-28 w-full bg-gradient-to-b from-[#e7f6eb] to-[#caf3d5]">
  <motion.header 
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    className="mb-8"
  >
    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-2 text-[#1a472a]">
      PBR Map & 3D Point Cloud
    </h1>
    <p className="text-gray-600 text-center max-w-xl mx-auto text-sm sm:text-base">
      Extraction & Interactive viewing
    </p>
  </motion.header>
  
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 md:gap-16 lg:gap-20">
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
      className="flex flex-col gap-6"
    >
      {/* Original Image */}
      <div className="bg-white rounded-2xl p-4 shadow-lg">
        <h2 className="text-lg sm:text-xl font-semibold mb-3 flex items-center justify-between text-[#1a472a]">
          <span>Original Image</span>
          {objectBlob &&
            <button 
              onClick={() => handleFullscreen('original')}
              className="p-1.5 bg-[#f4f9f4] hover:bg-[#e4f0e4] rounded-full transition-colors"
              aria-label="View fullscreen"
            >
              <Maximize2 size={16} className="text-[#1a472a]" />
            </button>
          }
        </h2>
        <div className="aspect-square relative rounded-xl">
          <OriginalImage />
        </div>
      </div>

      {/* PBR Maps */}
      <div className="bg-white rounded-2xl p-4 shadow-lg">
        <h2 className="text-lg sm:text-xl font-semibold mb-3 text-[#1a472a]">PBR Maps</h2>
        <PBRImages onViewFullscreen={(index) => handleFullscreen('pbr', index)} />
      </div>
    </motion.div>

    {/* 3D Model Viewer */}
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.1 }}
      className="lg:col-span-2 bg-white rounded-2xl overflow-hidden shadow-lg"
    >
      <div className="relative w-full aspect-video sm:aspect-[4/3] lg:aspect-[16/9]">
        <ModelViewer />

        {objectBlob &&
          <button 
            onClick={() => handleFullscreen('model')}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 bg-gray-200 hover:bg-gray-300 rounded-full transition-colors shadow-lg"
            aria-label="View fullscreen"
          >
            <Maximize2 size={20} className="text-[#1a472a]" />
          </button>
        }

        {objectBlob &&
          <button 
            onClick={() => setShowInfo(!showInfo)}
            className="absolute top-4 left-4 sm:top-6 sm:left-6 p-2 bg-gray-200 hover:bg-gray-300 rounded-full transition-colors shadow-lg"
            aria-label="Show information"
          >
            <Info size={20} className="text-[#1a472a]" />
          </button>
        }

        {objectBlob &&
          <a 
            href={URL.createObjectURL(objectBlob)}
            download={'model.ply'}
            className="absolute bottom-4 sm:bottom-8 right-4 sm:right-8 flex items-center gap-2 py-2 px-3 sm:px-4 bg-gray-300 text-black hover:bg-blue-700 rounded-lg transition-colors hover:text-white shadow-lg text-sm"
          >
            <Download size={16} />
            <span className="font-medium">Download</span>
          </a>
        }
      </div>
    </motion.div>
  </div>

  {/* Modals */}
  {showInfo && <AssetInfo onClose={() => setShowInfo(false)} />}
  {showFullscreen && (
    <FullscreenViewer 
      type={activeView || 'model'} 
      onClose={() => setShowFullscreen(false)} 
    />
  )}
</div>

//     <div className=" py-24 px-28 w-full bg-gradient-to-b from-[#e7f6eb] to-[#caf3d5]">
//       <motion.header 
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="mb-8"
//       >
//         <h1 className="text-3xl md:text-4xl font-bold text-center mb-2 text-[#1a472a]">
// PBR Map & 3D Point Cloud
//         </h1>
//         <p className="text-gray-600 text-center max-w-2xl mx-auto">
//           Extraction & Interactive viewing
//         </p>
//       </motion.header>
      
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
//       <motion.div 
//           initial={{ opacity: 0, x: 20 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ delay: 0.2 }}
//           className="flex flex-col gap-6"
//         >
//           <div className="bg-white rounded-2xl p-4 shadow-lg">
//             <h2 className="text-xl font-semibold mb-3 flex items-center justify-between text-[#1a472a]">
//               <span>Original Image</span>
              
//               {objectBlob &&
//                <button 
//                onClick={() => handleFullscreen('original')}
//                className="p-1.5 bg-[#f4f9f4] hover:bg-[#e4f0e4] rounded-full transition-colors"
//                aria-label="View fullscreen"
//              >
//                <Maximize2 size={16} className="text-[#1a472a]" />
//              </button>
//               }
             
//             </h2>
//             <div className="aspect-square relative rounded-xl">
//               <OriginalImage />
//             </div>
//           </div>

//           <div className="bg-white rounded-2xl p-4 shadow-lg">
//             <h2 className="text-xl font-semibold mb-3 text-[#1a472a]">PBR Maps</h2>
//             <PBRImages onViewFullscreen={(index) => handleFullscreen('pbr', index)} />
//           </div>
//         </motion.div>
//         <motion.div 
//           initial={{ opacity: 0, scale: 0.95 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ delay: 0.1 }}
//           className="lg:col-span-2 bg-white rounded-2xl overflow-hidden shadow-lg"
//         >
//           <div className="relative  w-full h-2/3 ">
//             <ModelViewer />
//             {objectBlob && 
//             <button 
//               onClick={() => handleFullscreen('model')}
//               className="absolute top-6 right-6 p-2 bg-gray-200 hover:bg-gray-300 rounded-full transition-colors shadow-lg"
//               aria-label="View fullscreen"
//             >
//               <Maximize2 size={20} className="text-[#1a472a]" />
//             </button>}
//             {objectBlob && 
//             <button 
//               onClick={() => setShowInfo(!showInfo)}
//               className="absolute top-6 left-6 p-2 bg-gray-200 hover:bg-gray-300 rounded-full transition-colors shadow-lg"
//               aria-label="Show information"
//             >
//               <Info size={20} className="text-[#1a472a]" />
//             </button>}
//             {objectBlob && 
//              <a 
//              href={URL.createObjectURL(objectBlob)}
//              download={'model.ply'}
//              className="absolute bottom-8 right-8 flex items-center gap-2 py-2 px-4 bg-gray-300 text-black hover:bg-blue-700 rounded-lg transition-colors hover:text-white shadow-lg"
//            >
//              <Download size={16} />
//              <span className="text-sm font-medium">Download Model</span>
//            </a>
//            }
           
//           </div>
//         </motion.div>

     
//       </div>

//       {showInfo && <AssetInfo onClose={() => setShowInfo(false)} />}
      
//       {showFullscreen && (
//         <FullscreenViewer 
//           type={activeView || 'model'} 
//           onClose={() => setShowFullscreen(false)} 
//         />
//       )}
//       {/* <iframe class="aspect-video rounded-xl" src="https://www.youtube.com/embed/dQw4w9WgXcQ"></iframe> */}
//     </div>
  );
};

export default AssetViewer;
