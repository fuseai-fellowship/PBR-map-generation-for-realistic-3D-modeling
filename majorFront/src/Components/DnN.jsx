import React, { useRef, useState, Suspense, use, useEffect} from 'react';
import { MdOutlineFileUpload } from "react-icons/md";
import axios from 'axios';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import {Model,PlyModel} from './Model';
import JSZip from 'jszip';
import { FaFileAlt } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';


function DnN() {
  const backendAPI=useSelector(state=>state.backendAPI)
  console.log("In ply viewing page with backend api : ",backendAPI)
  const location=useLocation();
  const props=location.state;

  const [selectedImage, setSelectedImage] = useState(null);
  // const [disableDNN, setDisable]=useState(false)

  useEffect(()=>{
    console.log("Props are",props)
    if (props?.state){
      setSelectedImage(props.image)
      if (props.plyfile){
        const plyurl= URL.createObjectURL(props.plyfile)
        console.log("ply url is ",plyurl)
        setPlyUrl(plyurl)
        if(plyurl){setPlyReceived(true)}
      }


    }
  }
  ,[props])
  console.log("Disable is ",props)

  // const [objUrl,setObjURL]=useState(null);
  // const [mtlUrl,setMtlURL]=useState(null);
  const [plyUrl,setPlyUrl]=useState(null);
  const [zipPly,setZip]=useState(null);

  // const [objReceived,setObjReceived]=useState(null);
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
      //Receive and view 3D object of .ply format
      const response = await axios.post(backendAPI,formData,{
        headers: { 'Content-Type': 'multipart/form-data' }, 
      responseType:'blob'
      });

      const zip = await JSZip.loadAsync(response.data)
      console.log("the zip file is :",zip)
      const plyFile=zip.file("output.ply");

      if( plyFile){
        const plyBlob=await plyFile.async('blob')
        setZip(plyBlob)
        const plyurl= URL.createObjectURL(plyBlob)
        setPlyUrl(plyurl)
        if(plyurl){setPlyReceived(true)}
      }
    } catch (error) {
      console.log("Error occured while receiving ply object:",error)
    }

    // try {
    //   //Receive and view 3D object of .obj file format
    //     const response = await axios.get('http://localhost:4004/api/obj',{
    //         responseType:'blob'
    //     });

    //     const zip= await JSZip.loadAsync(response.data)
    //     console.log("Zip file for obj is received")

    //     const objFile = zip.file("model.obj");
    //     const mtlFile = zip.file("model.mtl");

    //     if ( objFile && mtlFile){
    //         const objBlob= await objFile.async("blob");
    //         const mtlBlob= await mtlFile.async("blob");

    //         const objurl= URL.createObjectURL(objBlob)
    //         const mtlurl=URL.createObjectURL(mtlBlob)
    //         setObjURL(objurl)
    //         setMtlURL(mtlurl)
    //         console.log("Obj url is  ",objurl)

    //         if(objurl && mtlurl){setObjReceived(true)}
    //     }

    // } catch (error) {
    //     console.log("Error occured in object: ",error)
    // } 
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

  const downloadPly=()=>{
      // Download the received zip file in the device

      const objUrl=URL.createObjectURL(zipPly)
        const a=document.createElement('a')
        a.style.display='none';
        a.href=objUrl
        a.download='model.zip'
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(objUrl);
        // console.log('another res =', objUrl)
  }
  return (
    <div className='w-screen h-full mt-24 p-4 mx-auto text-center font-mono'>
      {/* Left Section: Upload Container */}
      <div className='w-full h-2/3 flex gap-10'>
        <div className='w-full h-full flex flex-col justify-start '>
          <div
            className='relative w-full h-3/4 mt-6 border-2 rounded-sm cursor-pointer self-center'
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
              // disabled={disableDNN}
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
              <div className='flex flex-col justify-center mt-16'>
                <img
                  src={URL.createObjectURL(selectedImage)}
                  alt="Preview"
                  className='self-center max-h-64 mb-2'
                />
                <div className='w-1/3 self-center p-1 border-2 rounded-lg text-lg mb-4 bg-blue-200'>
                  Change Image
                  <br />
                </div>
              </div>
            ) : (
              <div className='flex flex-col justify-center mt-32 mb-32'>
                <MdOutlineFileUpload className='self-center text-5xl' />
                <div className='text-lg'>
                  Drop your image here
                  <br />- or -<br />Click to upload
                </div>
              </div>
            )}
          </div>
          <button 
            className='w-full self-center mt-1 py-2 text-xl text-slate-700 bg-blue-300 border-2 rounded-sm cursor-pointer'
            onClick={handleUpload}
          >
            Generate Point Clouds
          </button>
        </div>
       {/* Right section */}
        <div className='w-full h-full flex flex-col justify-start '>
          <div className='relative w-full h-96 mt-6 border-2 rounded-sm self-center '>
            <div className='absolute top-0 left-0 w-1/4 bg-green-300 rounded-sm p-1'>
              3D point cloud
            </div>
            {plyReceived ? (
              <div className="bg-blue-200 w-full h-full rounded-xl">
              <Canvas className="w-full h-full"  camera={{ position: [0, 2, 40] }}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 10]} intensity={2} />
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
                  position={[0, 0, 0]}
                  scale={[10, 10, 10]}
                  />
                  {/* <Box /> */}
                </Suspense>
                <OrbitControls />
              </Canvas>
            </div>
            ) : (
              <div className='flex flex-col justify-center mt-32 '>
                <FaFileAlt className='self-center text-4xl mb-2' />
                <div className='text-lg '>
                  3D point cloud
                  <br /> will <br />appear here
                </div>
              </div>
            )}
          </div>
          <div 
            className='w-full self-center mt-1 py-2 text-xl text-slate-700 bg-blue-300 border-2 rounded-sm cursor-pointer'
            onClick={downloadPly}
          >
            Download 
          </div>
        </div>
      </div>
    </div>
  );
}

export default DnN;