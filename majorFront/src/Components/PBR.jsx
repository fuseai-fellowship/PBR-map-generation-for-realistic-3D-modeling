import React, { useRef, useState ,useEffect} from 'react';
import { MdOutlineFileUpload } from "react-icons/md";
import { FiImage } from 'react-icons/fi'; 
import axios from 'axios';
import JSZip from 'jszip';
import { useSelector } from 'react-redux';
import butterfly from '../Components/Assets/butterfly.jpg'
import { Link } from 'react-router-dom';

function PBR() {
    const backendAPI=useSelector(state=>state.backendAPI)
    console.log("In pbr maps displaying page with backendapi : ",backendAPI)

    const [selectedImage, setSelectedImage] = useState(null); // for uploaded imaged
    // const [responseImage, setResponseImage] = useState(null);  // for received image

    const [roughness,setRough]=useState(null)
    const [ambient,setAmb]=useState(null)
    const [depth,setDpt]=useState(null)
    const [normal,setNorm]=useState(null)
    const [original,setOrg]=useState(null)
    const [plyObj,setPly]=useState(null)


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
        if (!selectedImage) return;
        console.log("inside the handle upload")

        const formData = new FormData();
        formData.append('image', selectedImage);
    
        // try {
        //     console.log("trying....")
        //     const response = await axios.post('http://localhost:4004/api/upload', formData, {
        //     headers: { 'Content-Type': 'multipart/form-data' },
        //     responseType: 'blob'
        //     });

        //     const imageUrl = URL.createObjectURL(response.data);
        //     console.log("Completed....",response)
        //     setResponseImage(imageUrl);
        // } catch (error) {
        //     console.error('Error uploading image:\n', error);
        // }

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
                    }
                    else setRough(butterfly);

                    const amb=zip.file("ambient_occlusion.png");
                    if(amb){
                        const ambBlob=await amb.async('blob')
                        const ambUrl= URL.createObjectURL(ambBlob)
                        setAmb(ambUrl)
                    }
                    else setAmb(butterfly);

                    const norm=zip.file("normal_map.png");
                    if(norm){
                        const normBlob=await norm.async('blob')
                        const normUrl= URL.createObjectURL(normBlob)
                        setNorm(normUrl)
                    }
                    else setNorm(butterfly);

                    const depth=zip.file("depth.png");
                    if ( depth){
                        const depthBlob=await depth.async('blob')
                        const depthUrl= URL.createObjectURL(depthBlob)
                        setDpt(depthUrl)
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
                     if(plyFile){
                        const plyBlob=await plyFile.async('blob')
                        // const plyurl= URL.createObjectURL(plyBlob)
                        setPly(plyBlob)
                     }
               
                }
            
        } catch (error) {
         console.log("error",error)   
        }
      };

  return (
    <div className='w-screen h-full mt-16 p-4 mx-auto text-center font-mono '>
        <div className='w-full h-2/3 flex flex-col'>
            <div className='w-full h-full flex flex-col justify-center'>

            <div
                className='w-1/2 h-3/4 mt-6  border-2 rounded-sm relative cursor-pointer self-center'
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
                    className="absolute top-2 right-2 bg-red-400 rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-gray-500"
                    onClick={(e) => {
                    e.stopPropagation(); 
                    setSelectedImage(null);
                    }}
                >
                    X
                </button>
                )}

                <div className='absolute top-0 left-0 w-1/4 bg-green-300 rounded-sm p-1'>
                Original image
                </div>


                {selectedImage ? (
                <div className='flex flex-col justify-center mt-24'>
                    {/* Display a preview of the selected image */}
                    <img
                    src={URL.createObjectURL(selectedImage)}
                    alt="Preview"
                    className='self-center max-h-64 mb-4'
                    />
                    <div className='text-lg'>
                    Image selected!
                    <br />
                    <button className='mt-2 px-4 py-2 bg-blue-500 text-white rounded'>
                        Change Image
                    </button>
                    </div>
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

                <hr className='mt-14' />
            </div>


                <div 
                className='w-1/2 self-center mt-1 py-2 text-xl text-slate-700 bg-blue-300 border-2 rounded-sm cursor-pointer'
                onClick={handleUpload}
                >
                    Extract PBR maps
                </div>


            </div>



            <div className=' flex flex-col mt-20 text-3xl font-mono justify-center'>
                <p>PBR maps</p>
                <hr className='mt-4 w-48 self-center border-2 rounded-2xl'/>
            </div>
            <div className='flex justify-evenly mt-12 mb-20'>
                <div className='w-60 hover:scale-105 transition-all duration-60 mt-4 hover:shadow-lg rounded-xl relative border-2 bg-slate-200'>
                    
                    <div className='relative'>
                        {original  ? (
                        <img 
                            className='rounded-tr-xl rounded-tl-xl w-full h-60 object-cover'
                            src={URL.createObjectURL(selectedImage)}
                            alt="Content preview"
                        />
                            ) 
                            : (
                                <div className='w-full h-60 flex items-center justify-center bg-white'>
                                    <FiImage className='w-16 h-16 text-gray-500' />
                                </div>
                            )
                            }
                    </div>

                    <div className='flex w-5/6 text-left mx-2 my-2'>
                        <p className='w-full  text-lg'> Original image</p>
                    </div>
    
                </div>

                <div className={`  hover:scale-105 transition-all duration-60 mt-4 hover:shadow-lg rounded-xl border-2 bg-slate-200 w-60`}>
                    
                <div className='relative'>
                        {ambient  ? (
                        <img 
                            className='rounded-tr-xl rounded-tl-xl w-full h-60 object-cover'
                            src={ambient}
                            alt="Content preview"
                        />
                            ) 
                            : (
                                <div className='w-full h-60 flex items-center justify-center bg-white'>
                                    <FiImage className='w-16 h-16 text-gray-500' />
                                </div>
                            )
                            }
                    </div>

                    <div className='flex w-5/6 text-left mx-2 my-2'>
                        <p className='w-full text-lg'> Ambient</p>
                    </div>
    
                </div>

                <div className='w-60 hover:scale-105 transition-all duration-60 mt-4 hover:shadow-lg rounded-xl relative border-2 bg-slate-200'>
                    
                <div className='relative'>
                        {roughness  ? (
                        <img 
                            className='rounded-tr-xl rounded-tl-xl w-full h-60 object-cover'
                            src={roughness}
                            alt="Content preview"
                        />
                            ) 
                            : (
                                <div className='w-full h-60 flex items-center justify-center bg-white'>
                                    <FiImage className='w-16 h-16 text-gray-500' />
                                </div>
                            )
                            }
                    </div>

                    <div className='flex w-5/6 text-left mx-2 my-2'>
                        <p className='w-full  text-lg'>  Roughness</p>
                    </div>
    
                </div>

                <div className='w-60 hover:scale-105 transition-all duration-60 mt-4 hover:shadow-lg rounded-xl  border-2 bg-slate-200'>
                    
                <div className='relative'>
                        {depth  ? (
                        <img 
                            className='rounded-tr-xl rounded-tl-xl w-full h-60 object-cover'
                            src={depth}
                            alt="Content preview"
                        />
                            ) 
                            : (
                                <div className='w-full h-60 flex items-center justify-center bg-white'>
                                    <FiImage className='w-16 h-16 text-gray-500' />
                                </div>
                            )
                            }
                    </div>

                    <div className='flex w-5/6 text-left mx-2 my-2'>
                        <p className='w-full  text-lg'>  Depth</p>
                    </div>
    
                </div>

                <div className='w-60 hover:scale-105 transition-all duration-60 mt-4 hover:shadow-lg rounded-xl relative border-2 bg-slate-200'>
                    
                <div className='relative'>
                        {normal  ? (
                        <img 
                            className='rounded-tr-xl rounded-tl-xl w-full h-60 object-cover'
                            src={normal}
                            alt="Content preview"
                        />
                            ) 
                            : (
                                <div className='w-full h-60 flex items-center justify-center bg-white'>
                                    <FiImage className='w-16 h-16 text-gray-500' />
                                </div>
                            )
                            }
                    </div>

                    <div className='flex w-5/6 text-left mx-2 my-2'>
                        <p className='w-full text-lg'>  Normal</p>
                    </div>
    
                </div>
            </div>
            <div className='flex flex-col items-center  justify-center '>
                <Link to={`/pointcloud`} state={{state:true,plyfile:plyObj,image:selectedImage}}>
                <p className='px-10 py-3 rounded-xl border-2 bg-blue-400 cursor-pointer'>View Point Cloud </p>
                </Link>
            </div>

        </div>
      </div>
  )
}

export default PBR