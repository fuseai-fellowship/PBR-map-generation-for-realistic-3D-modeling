import React, { useRef, useState ,useEffect} from 'react';
import { MdOutlineFileUpload } from "react-icons/md";
import butterfly1 from "./assets/butterfly1.png"
import { FiImage } from 'react-icons/fi'; 
import axios from 'axios';



function PBR() {
    const [selectedImage, setSelectedImage] = useState(null); // for uploaded imaged
    const [responseImage, setResponseImage] = useState(null);  // for received image
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
    
        try {
            console.log("trying....")
            const response = await axios.post('http://localhost:4004/api/upload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
            responseType: 'blob'
            });

            const imageUrl = URL.createObjectURL(response.data);
            console.log("Completed....",response)
            setResponseImage(imageUrl);
        } catch (error) {
            console.error('Error uploading image:\n', error);
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
                        Upload Image
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
                        {responseImage  ? (
                        <img 
                            className='rounded-tr-xl rounded-tl-xl w-full h-60 object-cover'
                            src={responseImage}
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
                        <p className='w-full  text-lg'> PBR map 1</p>
                    </div>
    
                </div>

                <div className={`  hover:scale-105 transition-all duration-60 mt-4 hover:shadow-lg rounded-xl border-2 bg-slate-200 w-60`}>
                    
                    <div className=''>
                        <img className='rounded-tr-xl rounded-tl-xl  w-full h-60 object-cover' src={butterfly1}/>
                    </div>

                    <div className='flex w-5/6 text-left mx-2 my-2'>
                        <p className='w-full text-lg'> PBR map 2</p>
                    </div>
    
                </div>

                <div className='w-60 hover:scale-105 transition-all duration-60 mt-4 hover:shadow-lg rounded-xl relative border-2 bg-slate-200'>
                    
                    <div className='relative'>
                        <img className='rounded-tr-xl rounded-tl-xl  w-full h-60 object-cover' src={butterfly1}/>
                    </div>

                    <div className='flex w-5/6 text-left mx-2 my-2'>
                        <p className='w-full  text-lg'>  PBR map 3</p>
                    </div>
    
                </div>

                <div className='w-60 hover:scale-105 transition-all duration-60 mt-4 hover:shadow-lg rounded-xl  border-2 bg-slate-200'>
                    
                    <div className=''>
                        <img className='rounded-tr-xl rounded-tl-xl  w-full h-60 object-cover' src={butterfly1}/>
                    </div>

                    <div className='flex w-5/6 text-left mx-2 my-2'>
                        <p className='w-full  text-lg'>  PBR map 4</p>
                    </div>
    
                </div>

                <div className='w-60 hover:scale-105 transition-all duration-60 mt-4 hover:shadow-lg rounded-xl relative border-2 bg-slate-200'>
                    
                    <div className='relative'>
                        <img className='rounded-tr-lg rounded-tl-lg  w-full h-60 object-cover ' src={"https://images.pexels.com/photos/2071882/pexels-photo-2071882.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"}/>
                    </div>

                    <div className='flex w-5/6 text-left mx-2 my-2'>
                        <p className='w-full text-lg'>  PBR map 5</p>
                    </div>
    
                </div>
            </div>

        </div>
      </div>
  )
}

export default PBR