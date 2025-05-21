import React, { useRef, useState ,useEffect} from 'react';
import { MdOutlineFileUpload } from "react-icons/md";
import axios from 'axios';
import JSZip from 'jszip';
import { useSelector } from 'react-redux';
import { useAssetContext } from './AssetContext';

const OriginalImage = () => {
  const { currentAsset ,updatePBRMapByType ,updateAllPBRMap,addBlob,addOriginalImage} = useAssetContext();

  const backendAPI=useSelector(state=>state.backendAPI)
  // const backendAPI='https://b872-104-196-153-231.ngrok-free.app/process'
    console.log("In pbr maps displaying page with backendapi : ",backendAPI)

    const [selectedImage, setSelectedImage] = useState(null); // for uploaded imaged
    const [extractPBR,setExtractPBR]=useState(true);
    const fileInputRef = useRef(null);
  
    // useEffect(()=>{
    //   if (currentAsset.originalImageUrl){
    //     setExtractPBR()
    //   }
    
    // },[currentAsset.originalImageUrl])
    // When a file is selected via the hidden input
    const handleFileChange = (e) => {
      // console.log("original")
      const file = e.target.files[0];
      if (file) {
        // console.log("original added")
        const url=URL.createObjectURL(file)
        addOriginalImage(url)
        setSelectedImage(file);
      }
    };
  
    // When a file is dropped onto the container
    const handleDrop = (e) => {
      e.preventDefault();
      e.stopPropagation();
      const file = e.dataTransfer.files[0];
      if (file) {
        const url=URL.createObjectURL(file)
        addOriginalImage(url)
        setSelectedImage(file);
      }
    };
  
    // Prevent default behavior for drag over
    const handleDragOver = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };
  
    // When user clicks the container, trigger file selection
    const handleClick = () => {
      // console.log("clicked")
      fileInputRef.current.click(); // simulates the click on the actual DOM element which it references
    };


    const cancelUpload=()=>{
      setExtractPBR(true);
      updateAllPBRMap('all',{url:'https://images.pexels.com/photos/2071882/pexels-photo-2071882.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'})
    }
    // When user clicks the Extract button
    const handleUpload = async () => {
      setExtractPBR(false);
      // updateAllPBRMap('all',{url:'https://media.tenor.com/IfbOs_yh89AAAAAM/loading-buffering.gif'})
      updateAllPBRMap('all',{url:'https://miro.medium.com/v2/resize:fit:1400/1*jJKlUDkGzezjiFPagzvnuw.gif'})
      

        if (!selectedImage) return;
        console.log("inside the handle upload")

        const formData = new FormData();
        formData.append('image', selectedImage);

        try {
            console.log("hello ji")
            const response = await axios.post(backendAPI,formData,{
                headers: { 'Content-Type': 'multipart/form-data' },
                responseType:'blob'
                });
                const zip = await JSZip.loadAsync(response.data)
                console.log("Response is received ",zip)
          
                if( zip){

                    const rough=zip?.file("roughness.png");
                    if (rough){
                        const roughBlob=await rough.async('blob')
                        const roughUrl= URL.createObjectURL(roughBlob)
                        // setRough(roughUrl)
                          updatePBRMapByType('Roughness', {
                            url: roughUrl,
                            blob: roughBlob
                          });

                        // setZip(prev=>[...prev,{roughness:roughBlob}])
                    }
                    // else setRough(butterfly);


                    const amb=zip.file("ambient_occlusion.png");
                    if(amb){
                        const ambBlob=await amb.async('blob')
                        const ambUrl= URL.createObjectURL(ambBlob)
                        // setAmb(ambUrl)
                        updatePBRMapByType('Ambient', {
                          url: ambUrl,
                          blob:ambBlob
                        });
                        // setZip(prev=>[...prev,{ambient:ambBlob}])
                    }
                    // else setAmb(butterfly);


                    const norm=zip.file("normal_map.png");
                    if(norm){
                        const normBlob=await norm.async('blob')
                        const normUrl= URL.createObjectURL(normBlob)
                        // setNorm(normUrl)
                        updatePBRMapByType('Normal', {
                          url: normUrl,
                          blob:normBlob
                        });
                        // setZip(prev=>[...prev,{normal:normBlob}])
                    }
                    // else setNorm(butterfly);


                    const depth=zip.file("depth.png");
                    if ( depth){
                        const depthBlob=await depth.async('blob')
                        const depthUrl= URL.createObjectURL(depthBlob)
                        // setDpt(depthUrl)
                        updatePBRMapByType('Depth', {
                          url: depthUrl,
                          blob: depthBlob
                        });
                        // setZip(prev=>[...prev,{depth:depthBlob}])
                    }
                    // else setDpt(butterfly)

                    //  setOrg(selectedImage)

                     const plyFile=zip.file("output.ply");
                     console.log("ply ifle is ",plyFile)
                     if(plyFile){
                        const plyBlob=await plyFile.async('blob')

                        console.log("Ply blob is ",plyBlob)
                        addBlob(plyBlob)
                        console.log("asset after adding ",currentAsset)

                        // setPly(plyBlob)
                     }
               
                }
            
        } catch (error) {
         console.log("error",error)   
        }
      };

  return (
   <div className='w-full h-full flex flex-col justify-center select-none'>
   
    <div
        className='w-full h-full items-center text-center border-2 rounded-sm relative cursor-pointer self-center '
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={handleClick}
    >

        <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
        />

        {currentAsset.originalImageUrl!=null && (
        <button
            className="absolute top-2 right-2 z-2 bg-red-400 rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-gray-500"
            onClick={(e) => {
            e.stopPropagation(); 
            setSelectedImage(null);
            addOriginalImage(null);
            }}
        >
            X
        </button>
        )}


        {currentAsset.originalImageUrl ? (
        <div className='w-full h-full flex flex-col justify-center relative'>
            {/* Display a preview of the selected image */}
            <img
            // src={URL.createObjectURL(selectedImage)}
            src={currentAsset.originalImageUrl}
            alt="Preview"
            className='w-full h-full absolute object-cover '
            />
        </div>
        ) : (
        <div className='flex flex-col justify-center mt-24'>
            <MdOutlineFileUpload className='self-center text-5xl' />
            <div className='text-lg'>
            Drop your image here
            <br />- or -<br />Click to upload
            </div>
        </div>
        )}
    </div>


        <div 
        className='w-full flex justify-around text-center mt-1 py-2 text-lg text-white rounded-sm cursor-pointer'>
            {extractPBR?
            <div className='flex justify-around'>
            <p 
            className={`bg-blue-500 hover:bg-blue-600 ${currentAsset.originalImageUrl?'':'pointer-events-none'} border-2 px-4 rounded-sm inline-block`}
            onClick={handleUpload}
            >
            Extract PBR maps
            </p>
            {currentAsset.originalImageUrl?
              <p onClick={handleClick} className='bg-blue-500 hover:bg-blue-600   border-2 px-4 rounded-sm inline-block'>Change Image</p>:
              <p onClick={handleClick} className='bg-blue-500 hover:bg-blue-600 border-2 px-4 rounded-sm inline-block'>Add Image</p>}
            </div>
            :
            <p
            onClick={cancelUpload} 
            className='bg-red-500 hover:bg-red-600  border-2 px-4 rounded-sm inline-block'>
              Cancel
            </p>
  }

        </div>
   
   
</div>
  );
};

export default OriginalImage;
