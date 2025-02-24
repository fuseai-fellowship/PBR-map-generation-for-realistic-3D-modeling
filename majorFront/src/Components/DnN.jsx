import React, { useRef, useState, Suspense, use} from 'react';
import { MdOutlineFileUpload } from "react-icons/md";
import { FiImage } from 'react-icons/fi'; 
import axios from 'axios';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import {Model,PlyModel} from './Model';
import JSZip from 'jszip';

function DnN() {
  const [enlarge, setEnlarge] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [responseImage, setResponseImage] = useState(null);

  const [objUrl,setObjURL]=useState(null);
  const [mtlUrl,setMtlURL]=useState(null);
  const [plyUrl,setPlyUrl]=useState(null);

  const [objReceived,setObjReceived]=useState(null);
  const [plyReceived,setPlyReceived]=useState(null)
  const fileInputRef = useRef(null);


  // File handling
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setSelectedImage(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (file) setSelectedImage(file);
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleClick = () => {
    fileInputRef.current.click();
  };

  // Handle image upload
  const handleUpload = async () => {
    if (!selectedImage) return;
    const formData = new FormData();
    formData.append('image', selectedImage);

    try {
      const response = await axios.post('http://localhost:4004/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        responseType: 'blob'
      });
      const imageUrl = URL.createObjectURL(response.data);
      // setResponseImage(imageUrl);
    } catch (error) {
      console.error('Error uploading image:', error);
    } 

    try {
      const response = await axios.get('http://localhost:4004/api/ply',{
      responseType:'blob'
      });

      const zip = await JSZip.loadAsync(response.data)
      const plyFile=zip.file("model.ply");

      if( plyFile){
        const plyBlob=await plyFile.async('blob')

        const plyurl= URL.createObjectURL(plyBlob)
        setPlyUrl(plyurl)
        if(plyurl){setPlyReceived(true)}
      }
    } catch (error) {
      console.log("Error occured while receiving ply object:",error)
    }

    try {
        const response = await axios.get('http://localhost:4004/api/obj',{
            responseType:'blob'
        });

        const zip= await JSZip.loadAsync(response.data)
        console.log("Zip file for obj is received")

        const objFile = zip.file("model.obj");
        const mtlFile = zip.file("model.mtl");
        const normalFile = zip.file("cottage_normal.png");
        const diffuseFile = zip.file("cottage_diffuse.png")


        if ( objFile && mtlFile){
            const objBlob= await objFile.async("blob");
            const mtlBlob= await mtlFile.async("blob");
            const normalImage= await normalFile.async("blob")
            const diffuseImage= await diffuseFile.async("blob")
            console.log("normalImage url is ",objBlob)

            const objurl= URL.createObjectURL(objBlob)
            const mtlurl=URL.createObjectURL(mtlBlob)
            const normalurl=URL.createObjectURL(normalImage)
            setResponseImage(normalurl)
            setObjURL(objurl)
            setMtlURL(mtlurl)
            console.log("Obj url is  ",objurl)

            if(objurl && mtlurl){setObjReceived(true)}
        }
        // Download the received zip file in the device

        // const objUrl=URL.createObjectURL(anotherResponse.data)
        // const a=document.createElement('a')
        // a.style.display='none';
        // a.href=objUrl
        // a.download='model.zip'
        // document.body.appendChild(a);
        // a.click();
        // window.URL.revokeObjectURL(objUrl);
        // console.log('another res =', objUrl)

    } catch (error) {
        console.log("Error occured in object: ",error)
    } 
  };

  // A simple box for demonstration (optional)
  function Box(props) {
    const meshRef = useRef();
    const [hovered, setHover] = useState(false);
    const [active, setActive] = useState(false);
    return (
      <mesh
        {...props}
        ref={meshRef}
        scale={active ? 1.5 : 1}
        onClick={() => setActive(!active)}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
      >
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
      </mesh>
    );
  }

  return (
    <div className='w-screen h-full mt-16 p-4 mx-auto text-center font-mono'>
      {/* Top Section: Upload Container */}
      <div className='w-full h-2/3 flex flex-col'>
        <div className='w-full h-full flex flex-col justify-center'>
          <div
            className='relative w-1/2 h-3/4 mt-6 border-2 rounded-sm cursor-pointer self-center'
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
                <img
                  src={URL.createObjectURL(selectedImage)}
                  alt="Preview"
                  className='self-center max-h-64 mb-4'
                />
                <div className='text-lg'>
                  Image selected!
                  <br />
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
            Generate Point Clouds
          </div>
        </div>

        {/* Bottom Section: Maps & Point Clouds */}
        <div className='flex flex-col mt-20 text-3xl font-mono justify-center'>
          <p>Maps & Point clouds</p>
          <hr className='mt-4 w-1/3 self-center border-2 rounded-2xl'/>
        </div>

        <div className='relative p-4'>
          <div className='flex justify-evenly mt-12 mb-20'>
            {/* Depth Map Container */}
            <div className='w-1/3  transition-all duration-60 mt-4 hover:shadow-lg rounded-xl border-2 bg-slate-200'>
              <div>
                {responseImage !=null? (
                  <img 
                    className='rounded-tr-xl rounded-tl-xl w-full h-60 object-cover'
                    src={responseImage}
                    alt="Content preview"
                  />
                ) : (
                  <div className='w-full h-60 flex items-center justify-center bg-white'>
                    <FiImage className='w-16 h-16 text-gray-500'/>
                  </div>
                )}
              </div>
              <div className='flex w-5/6 text-left mx-2 my-2'>
                <p className='w-full text-lg'>Depth map</p>
              </div>
            </div>

            {/* Depth Point Cloud Container */}
            <div className='w-1/3  transition-all duration-60 mt-4 hover:shadow-lg rounded-xl border-2 bg-slate-200'>
              <div>
                <img 
                  className='rounded-tr-lg rounded-tl-lg w-full h-60 object-cover'
                  src="https://images.pexels.com/photos/2071882/pexels-photo-2071882.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                  alt="Depth point cloud"
                />
              </div>
              <div className='flex w-5/6 text-left mx-2 my-2'>
                <p className='w-full text-lg'>Depth Point Cloud</p>
              </div>
            </div>
          </div>

          <div className='flex justify-evenly mt-12 mb-20'>
            {/* Normal Map Container (with 3D model) */}
            <div className='w-1/3 transition-all duration-60 mt-4 hover:shadow-lg rounded-xl border-2 bg-slate-200 relative'>
              {/* Small (default) 3D model container */}
              <div className="bg-blue-200 rounded-xl h-60">
                {plyReceived &&
                <Canvas className="w-full h-full"  camera={{ position: [0, 2, 40] }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 10]} intensity={2} />
                  {/* <pointLight position={[-10, -10, -10]} /> */}
                  <Suspense fallback={null}>
                    {/* <Model 
                        objPath={objUrl}
                        mtlPath={mtlUrl}
                      // objPath="/src/Components/assets/resource/cottage/cottage_obj.obj" 
                      // mtlPath="/src/Components/assets/resource/cottage/cottage_obj.mtl" 
                      position={[0, 0, 10]}
                      scale={[1, 1, 1]}
                    /> */}

                    <PlyModel
                    plyPath={plyUrl}
                    position={[0, 0, 10]}
                    scale={[1, 1, 1]}
                    />
                    <Box />
                  </Suspense>
                  <OrbitControls />
                </Canvas>
                }
              </div>
              <div className='flex w-5/6 text-left mx-2 my-2'>
                <p 
                  className='w-full text-lg cursor-pointer'
                  onClick={() => setEnlarge(true)}
                >
                  Normal map
                </p>
              </div>

              {/* Overlay: Enlarged 3D model container */}
              {enlarge && (
                <div className="absolute inset-y-10 -top-3/4 flex justify-center items-center z-10">
                  <div className="bg-blue-200 relative w-[70vw] h-[30vw] rounded-xl">
                    <button 
                      onClick={() => setEnlarge(false)}
                      className="absolute top-2 right-2 bg-red-500 text-white px-2 rounded-full z-20"
                    >
                      X
                    </button>
                    <Canvas className="w-full h-full" camera={{ position: [0, 2, 40] }}>
                      <ambientLight intensity={0.5} />
                      <directionalLight position={[10, 10, 10]} intensity={2} />
                      {/* <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} /> */}
                      {/* <pointLight position={[-10, -10, -10]} /> */}
                      <Suspense fallback={null}>
                        {/* <Model 
                          objPath="/src/Components/assets/resource/cottage/cottage_obj.obj" 
                          mtlPath="/src/Components/assets/resource/cottage/cottage_obj.mtl" 
                          position={[0, 0, 0]}
                          scale={[1, 1, 1]}
                        /> */}
                        <PlyModel
                            plyPath={plyUrl}
                            position={[0, 0, 0]}
                            scale={[1, 1, 1]}
                        />
                        <Box />
                      </Suspense>
                      <OrbitControls />
                    </Canvas>
                  </div>
                </div>
              )}
            </div>

            {/* Normal Point Cloud Container */}
            <div className='w-1/3 transition-all duration-60 mt-4 hover:shadow-lg rounded-xl border-2 bg-slate-200'>
              <div>
                <img 
                  className='rounded-tr-lg rounded-tl-lg w-full h-60 object-cover'
                  src="https://images.pexels.com/photos/2071882/pexels-photo-2071882.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                  alt="Normal point cloud"
                />
              </div>
              <div className='flex w-5/6 text-left mx-2 my-2'>
                <p className='w-full text-lg'>Normal Point Cloud</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DnN;
