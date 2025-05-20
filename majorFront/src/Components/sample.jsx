import { useState, useRef, useEffect } from 'react';
import { Camera, X } from 'lucide-react';
import { motion } from 'framer-motion';

import axios from 'axios';
import JSZip from 'jszip';
import { useNavigate } from 'react-router-dom';
import { useAssetContext } from './AssetContext';
import { useSelector } from 'react-redux';

const Sample = () => {
  const [isStreaming, setIsStreaming] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [extract,setExtract] =useState(false);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const { currentAsset ,updatePBRMapByType ,updateAllPBRMap,addBlob,addOriginalImage} = useAssetContext();

  const backendAPI=useSelector(state=>state.backendAPI)
  const navigate=useNavigate();

  // Call this to start the stream process (sets up UI)
  const startCamera = () => {
    setIsStreaming(true); // Trigger rendering of the <video> element
  };

  // After video element is mounted, start stream
  useEffect(() => {
    const initCamera = async () => {
      if (isStreaming && videoRef.current && !streamRef.current) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: {
              facingMode: 'user',
              width: { ideal: 1280 },
              height: { ideal: 720 },
            },
          });
          videoRef.current.srcObject = stream;
          streamRef.current = stream;
          videoRef.current.play();
        } catch (error) {
          console.error('Error accessing camera:', error);
        }
      }
    };

    initCamera();
  }, [isStreaming]);

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsStreaming(false);
  };

  const captureImage = async () => {
    if (videoRef.current) {
      const video = videoRef.current;
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth || 1280;
      canvas.height = video.videoHeight || 720;
  
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageDataUrl = canvas.toDataURL('image/jpeg');
        setCapturedImage(imageDataUrl);
     
        stopCamera();
      } 
    }
  };

  useEffect(()=>{
    async function extractPBR() {
      // console.log("extract ", extract)
      if(extract){
        // Convert base64 to Blob
        const blob = await fetch(capturedImage).then(res => res.blob());
         
        // Prepare form data
        const formData = new FormData();
        formData.append('image', blob, 'captured.jpg');
       
        addOriginalImage(capturedImage)
        // updateAllPBRMap('all',{url:'https://media.tenor.com/IfbOs_yh89AAAAAM/loading-buffering.gif'})
        updateAllPBRMap('all',{url:'https://miro.medium.com/v2/resize:fit:1400/1*jJKlUDkGzezjiFPagzvnuw.gif'})
        navigate('/extraction')
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
       
                        updatePBRMapByType('Roughness', {
                          url: roughUrl,
                          blob: roughBlob
                        });
                  }
       
       
                  const amb=zip.file("ambient_occlusion.png");
                  if(amb){
                      const ambBlob=await amb.async('blob')
                      const ambUrl= URL.createObjectURL(ambBlob)
                      // setAmb(ambUrl)
                      updatePBRMapByType('Ambient', {
                        url: ambUrl,
                        blob:ambBlob
                      });
       
                  }
       
       
       
                  const norm=zip.file("normal_map.png");
                  if(norm){
                      const normBlob=await norm.async('blob')
                      const normUrl= URL.createObjectURL(normBlob)
                      // setNorm(normUrl)
                      updatePBRMapByType('Normal', {
                        url: normUrl,
                        blob:normBlob
                      });
       
                  }
       
                  const depth=zip.file("depth.png");
                  if ( depth){
                      const depthBlob=await depth.async('blob')
                      const depthUrl= URL.createObjectURL(depthBlob)
       
                      updatePBRMapByType('Depth', {
                        url: depthUrl,
                        blob: depthBlob
                      });
                  }
       
       
                   const plyFile=zip.file("output.ply");
                   console.log("ply ifle is ",plyFile)
                   if(plyFile){
                      const plyBlob=await plyFile.async('blob')
       
                      console.log("Ply blob is ",plyBlob)
                      addBlob(plyBlob)
                      console.log("asset after adding ",currentAsset)
       
                   }
              }
          
              } catch (error) {
              console.log("error",error)   
              }
             }        
      
    }

    extractPBR();
  },[capturedImage,extract])



  const resetCamera = () => {
    setCapturedImage(null);
    stopCamera();
  };

  // Clean up on unmount
  useEffect(() => {
    return () => stopCamera();
  }, []);

  return (
    <div className="flex flex-col items-center gap-4 mt-40 sm:mt-40 px-4 w-full">
  {!isStreaming && !capturedImage && (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={startCamera}
      className="bg-blue-500 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-blue-600 transition-colors w-full max-w-xs justify-center"
    >
      <Camera className="w-5 h-5" />
      Open Camera
    </motion.button>
  )}

  {isStreaming && (
    <div className="relative w-full max-w-md sm:max-w-2xl">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="w-full rounded-lg shadow-lg"
      />
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col sm:flex-row gap-3 sm:gap-4 items-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={captureImage}
          className="bg-blue-500 text-white px-6 py-2 rounded-full shadow-lg hover:bg-blue-600 transition-colors w-40 text-center"
        >
          Capture
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={stopCamera}
          className="bg-white text-gray-700 px-6 py-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors w-40 text-center"
        >
          Close
        </motion.button>
      </div>
    </div>
  )}

  {capturedImage && (
    <div className="w-full max-w-md sm:max-w-2xl">
      <div className="text-lg font-semibold text-gray-700 mb-2 text-center sm:text-left">
        Captured Image
      </div>
      <div className="relative">
        <img
          src={capturedImage}
          alt="Captured"
          className="w-full rounded-lg shadow-lg"
        />
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={resetCamera}
          className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-lg hover:bg-red-50 transition-colors"
        >
          <X className="w-5 h-5 text-red-500" />
        </motion.button>
        <div className="flex items-center justify-center">
          <p
            onClick={() => setExtract(true)}
            className="bg-blue-500 text-white rounded-xl px-4 py-2 mt-3 hover:bg-blue-600 cursor-pointer text-sm sm:text-base text-center"
          >
            Extract PBR
          </p>
        </div>
      </div>
    </div>
  )}
</div>
  );
};

export default Sample;