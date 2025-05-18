import React from 'react';
import {Link} from "react-router-dom"
import butterfly1_nobg from '../Components/Assets/butterfly1_nobg.png'


const HeroSection = () => {
  console.log("Inside the hero section")
  const handleClick=()=>{
    console.log("Hello ")
  }
  return (
    <div className="mt-8 pb-20 relative overflow-hidden bg-gradient-to-b from-white to-[#e9f5ec]">
      
      {/* <div className="absolute inset-0 opacity-100 ">  bg-texture-pattern */}
      <div className=" mx-auto px-4">
      
        <div className="grid md:grid-cols-2 gap-8 items-center">
          
          
          <div className="space-y-6 mt-32">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800  leading-tight">
              Generate Realistic <span className="text-[#274A2A]">Textures</span> Instantly
            </h1>
            
            <p className="text-lg text-gray-600 leading-relaxed">
              Turn any image into high-quality Physically-Based Rendering (PBR) textures with just a few clicks. 
              Our AI-powered tool extracts and converts images into seamless texture maps, perfect for game development, 
              3D rendering, and digital design.
            </p>
           
            <div className="flex flex-wrap gap-3">
            
            <Link to="/extraction">
              <p className="bg-[#274A2A] hover:bg-[#1a331d] text-white px-6 py-6 h-auto text-lg rounded-lg">
                Try Free Demo
              </p>
             </Link>
             
              <p
              className="border-[#274A2A] border-1 text-[#274A2A] bg-white hover:bg-[#e9f5ec] px-6 py-6 h-auto text-lg rounded-lg cursor-pointer">
                View Examples
                </p>
            </div>
          
          </div>
          <div className='w-full'>
                <img src={butterfly1_nobg}/>
          </div>
          
          {/* <div className="relative animate-slide-up">
            <div className="absolute -bottom-4 -right-4 w-64 h-64 bg-mapper-light rounded-full blur-3xl opacity-50"></div>
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 relative">
              <div className="aspect-square bg-gray-100 relative overflow-hidden">
                {/* This would be a texture preview or demo animation */}
               {/* <div className="grid grid-cols-2 grid-rows-2 h-full">
                  <div className="bg-gradient-to-br from-gray-200 to-gray-300"></div>
                  <div className="bg-gradient-to-bl from-mapper-light to-mapper-accent/50"></div>
                  <div className="bg-gradient-to-tr from-gray-300 to-gray-200"></div>
                  <div className="bg-gradient-to-tl from-mapper-accent/30 to-mapper-light"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-black/40 backdrop-blur-sm px-6 py-3 rounded-full">
                    <p className="text-white font-medium">Texture Preview</p>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium text-mapper-primary">Normal Map</p>
                  <p className="text-xs text-gray-500">2K Resolution</p>
                </div>
                <div className="mt-2 h-2 bg-gray-100 rounded-full">
                  <div className="h-full w-3/4 bg-gradient-to-r from-mapper-primary to-mapper-secondary rounded-full"></div>
                </div>
              </div>
            </div>
          </div> */}

        </div>
      </div>
    </div>
    // </div>
    // <div className='hover:text-blue-600 mt-36'>
    //   <Link to='/research'>
    //   <p>
    //   hello
    //   </p>
    //   </Link>

    // </div>
  );
};

export default HeroSection;