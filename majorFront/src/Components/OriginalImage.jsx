import React, { useRef, useState ,useEffect} from 'react';
import { MdOutlineFileUpload } from "react-icons/md";
import { FiImage } from 'react-icons/fi'; 
import axios from 'axios';
import JSZip from 'jszip';
import { useSelector } from 'react-redux';
import butterfly from '../Components/Assets/butterfly.jpg'
import { Link } from 'react-router-dom';
import { useAssetContext } from './AssetContext';
import { Download } from 'lucide-react';

const OriginalImage = () => {
  const { currentAsset ,updatePBRMapByType ,updateAllPBRMap,addBlob} = useAssetContext();

  // const backendAPI=useSelector(state=>state.backendAPI)
  const backendAPI='https://aad8-34-105-23-20.ngrok-free.app/process'
    console.log("In pbr maps displaying page with backendapi : ",backendAPI)

    const [selectedImage, setSelectedImage] = useState(null); // for uploaded imaged
    // const [responseImage, setResponseImage] = useState(null);  // for received image

    const [roughness,setRough]=useState(null)
    const [ambient,setAmb]=useState(null)
    const [depth,setDpt]=useState(null)
    const [normal,setNorm]=useState(null)
    const [original,setOrg]=useState(null)
    const [plyObj,setPly]=useState(null)
    const [zipFile,setZip]=useState([])


    const fileInputRef = useRef(null);
  
    // When a file is selected via the hidden input
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setSelectedImage(file);
      }
    };
  
    // When a file is dropped onto the container
    const handleDrop = (e) => {
      e.preventDefault();
      e.stopPropagation();
      const file = e.dataTransfer.files[0];
      if (file) {
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
      fileInputRef.current.click(); // simulates the click on the actual DOM element which it references
    };



    // When user clicks the Extract button
    const handleUpload = async () => {
      // alert("Clicked")
      // updatePBRMapByType('Albedo', {
      //   url: 'https://media.istockphoto.com/id/1033704156/vector/loading-circle-icon-progress-loading-vector-icon-update-icon.jpg?s=612x612&w=0&k=20&c=Ap_ELUDTrZj1jRFqbqBfKipF6Y_4C8QRgwWf0NFLDw0=',
      // });
      updateAllPBRMap('all',{url:'https://media.tenor.com/IfbOs_yh89AAAAAM/loading-buffering.gif'})

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
                console.log(zip)
          
                if( zip){

                    const rough=zip?.file("roughness.png");
                    if (rough){
                        const roughBlob=await rough.async('blob')
                        const roughUrl= URL.createObjectURL(roughBlob)
                        setRough(roughUrl)
                        //  updatePBRMapByType('Albedo', {
                        //     url: 'https://media.istockphoto.com/id/1033704156/vector/loading-circle-icon-progress-loading-vector-icon-update-icon.jpg?s=612x612&w=0&k=20&c=Ap_ELUDTrZj1jRFqbqBfKipF6Y_4C8QRgwWf0NFLDw0=',
                        //   });

                          updatePBRMapByType('Roughness', {
                            url: roughUrl,
                            blob: roughBlob
                          });

                        setZip(prev=>[...prev,{roughness:roughBlob}])
                    }
                    else setRough(butterfly);


                    const amb=zip.file("ambient_occlusion.png");
                    if(amb){
                        const ambBlob=await amb.async('blob')
                        const ambUrl= URL.createObjectURL(ambBlob)
                        setAmb(ambUrl)
                        updatePBRMapByType('Ambient', {
                          url: ambUrl,
                          blob:ambBlob
                        });
                        setZip(prev=>[...prev,{ambient:ambBlob}])
                    }
                    else setAmb(butterfly);


                    const norm=zip.file("normal_map.png");
                    if(norm){
                        const normBlob=await norm.async('blob')
                        const normUrl= URL.createObjectURL(normBlob)
                        setNorm(normUrl)
                        updatePBRMapByType('Normal', {
                          url: normUrl,
                          blob:normBlob
                        });
                        setZip(prev=>[...prev,{normal:normBlob}])
                    }
                    else setNorm(butterfly);


                    const depth=zip.file("depth.png");
                    if ( depth){
                        const depthBlob=await depth.async('blob')
                        const depthUrl= URL.createObjectURL(depthBlob)
                        setDpt(depthUrl)
                        updatePBRMapByType('Depth', {
                          url: depthUrl,
                          blob: depthBlob
                        });
                        setZip(prev=>[...prev,{depth:depthBlob}])
                    }
                    else setDpt(butterfly)

                    // const original=zip.file("original_image.png")
                    // if ( original){
                    //     const originalBlob=await original.async('blob')
                    //     const orgUrl= URL.createObjectURL(originalBlob)
                    //     setOrg(orgUrl)
                    // }
                    // else
                     setOrg(selectedImage)

                     const plyFile=zip.file("output.ply");
                     console.log("ply ifle is ",plyFile)
                     if(plyFile){
                        const plyBlob=await plyFile.async('blob')
                        console.log("Ply blob is ",plyBlob)
                        addBlob(plyBlob)
                        console.log("asset after adding ",currentAsset)
                        // const plyurl= URL.createObjectURL(plyBlob)
                        // setZip(prev=>[...prev,{oject:plyBlob}])
                        setPly(plyBlob)
                     }
               
                }
            
        } catch (error) {
         console.log("error",error)   
        }
      };

      async function handleDownload(){
        // Download the received zip file in the device
        if (zipFile){
            console.log("zip file is ",zipFile)

            zipFile.map((items)=>{
                Object.entries(items).map(async([key,value])=>  {
                    console.log("hl",value)
                        // const blob = new Blob([value], { type: 'application/zip' });
                        // const blob=await value.async('blob')
                        const url = window.URL.createObjectURL(value);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = `${key}.png`;
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                        window.URL.revokeObjectURL(url);
                })
            })
        
              // console.log('another res =', objUrl)
        }
        else alert('Generate PBR images !!!')

    }

  return (
   <div className='w-full h-full flex flex-col justify-center '>
   
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

        {selectedImage && (
        <button
            className="absolute top-2 right-2 z-2 bg-red-400 rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-gray-500"
            onClick={(e) => {
            e.stopPropagation(); 
            setSelectedImage(null);
            }}
        >
            X
        </button>
        )}

        {/* <div className='absolute top-0 left-0 w-1/4 bg-green-300 rounded-sm p-1'>
        Original image
        </div> */}


        {selectedImage ? (
        <div className='w-full h-full flex flex-col justify-center relative'>
            {/* Display a preview of the selected image */}
            <img
            src={URL.createObjectURL(selectedImage)}
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
        className='w-full flex justify-around text-center mt-1 py-2 text-xl text-slate-700  rounded-sm cursor-pointer'>
            <p 
            className='bg-blue-300  border-2 px-4 rounded-sm'
            onClick={handleUpload}
            >
            Extract PBR maps
            </p>
              {selectedImage?
              <p onClick={handleClick} className='bg-blue-300  border-2 px-4 rounded-sm'>Change Image</p>:
              <p onClick={handleClick} className='bg-blue-300  border-2 px-4 rounded-sm'>Add Image</p>}
        </div>
   
   
</div>
  );
};

export default OriginalImage;
