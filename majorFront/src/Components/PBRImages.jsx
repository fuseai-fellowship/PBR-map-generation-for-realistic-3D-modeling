import React from 'react';
import { useAssetContext } from './AssetContext';
import { Download, Maximize2 } from 'lucide-react';

const PBRImages = ({ onViewFullscreen }) => {
  const { currentAsset,objectBlob } = useAssetContext();

  async function handleDownload(name,blob){
    // Download the received zip file in the device
    if (blob){
        console.log("Blob file is ",blob)

                // console.log("hl",value)
                    // const blob = new Blob([value], { type: 'application/zip' });
                    // const blob=await value.async('blob')
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `${name}.png`;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    window.URL.revokeObjectURL(url);
    
          // console.log('another res =', objUrl)
    }
    else alert('Generate PBR images !!!')

}

  return (
    <div className="grid grid-cols-2 gap-3">
      {currentAsset.pbrMaps.map((map, index) => (
        <div key={map.type} className="group relative rounded-lg overflow-hidden">
          <div className="aspect-square">
            <img 
              src={map.url} 
              alt={`${map.type} map for ${currentAsset.name}`}
              className="h-full w-full object-cover"
            />
          </div>
          
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between">
            <div className="p-2 flex justify-between items-start">
              <span className="text-xs font-medium bg-gray-700 text-neutral-100 px-2 py-1 rounded-md select-none">
                {map.type}
              </span>

              { objectBlob && 
               <button 
               onClick={() => onViewFullscreen(index)}
               className="p-1 bg-gray-200 rounded-full transition-all cursor-pointer"
               aria-label={`View ${map.type} map fullscreen`}
             >
               <Maximize2 size={14} />
             </button>
             }
             
            </div>
            
            <div className="p-2 flex justify-end ">
            { objectBlob && 
              <div 
              onClick={()=>handleDownload(map.type,map.blob)}
                className="flex items-center gap-1 py-1 px-2 bg-white hover:bg-blue-700 hover:text-white rounded text-xs transition-colors"
              >
                <Download size={12} />
                <span>Download</span>
              </div>}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PBRImages;
