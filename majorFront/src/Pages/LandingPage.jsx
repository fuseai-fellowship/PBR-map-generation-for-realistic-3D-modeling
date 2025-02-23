import React from 'react'
import {Link} from "react-router-dom"
import butterfly1 from '../Components/Assets/butterfly1.png'
import butterfly from '../Components/Assets/butterfly.jpg'



function LandingPage() {
  return (
    <div className='flex flex-col  w-screen h-screen '>

        <div className='flex px-20 justify-between'>

            <div className='m-4 w-3/5 h-auto  px-8 py-36 '>
                <p className='text-4xl leading-14 font-extrabold tracking-wide'>   Transform Any Image into High-Quality PBR Textures</p>
                <p className='mt-24 mb-6 underline'> Try it now</p>
                <Link to="/pbr">
                <p className='w-56 mt-2 text-center py-2 px-10 rounded-sm bg-black text-white '> Extract PBR </p>
                </Link>
                <Link to="/pointcloud" >
                <p className='w-56 mt-2 text-center py-2 px-10 rounded-sm bg-black text-white '> View Point Clouds </p>
                </Link>
            </div>
            {/* shadow-sm p-2 bg-slate-100 rounded-xl */}
            <div className='w-2/5'>
                <img className=' mt-10' src={butterfly1}/>
            </div>
         
        </div>
      

        <div className='flex flex-col px-20 justify-between'>
            <p className='font-bold ml-5 text-2xl'>Discover Popular PBR images</p>
            <div className='flex w-full px-6 justify-between'>

                <div className='w-1/5'>
                <img className='w-full mt-10' src={butterfly}></img>
                <p className='text-lg font-bold text-center py-2'>PBR image of Butterfly</p>
                </div>
            
                <div className='w-1/5'>
                <img className='w-full mt-10' src={butterfly}></img>
                <p className='text-lg font-bold text-center py-2'>PBR image of Butterfly</p>
                </div>

                <div className='w-1/5'>
                <img className='w-full mt-10' src={butterfly}></img>
                <p className='text-lg font-bold text-center py-2'>PBR image of Butterfly</p>
                </div>

                <div className='w-1/5'>
                <img className='w-full mt-10' src={butterfly}></img>
                <p className='text-lg font-bold text-center py-2'>PBR image of Butterfly</p>
                </div>
            </div>
            <hr className='mt-4 w-full'/>

            <div className='mt-20 px-10 font-sans'>
                <div className='mb-6  shadow-xl p-4 rounded-lg bg-slate-50'>
                    <p className='text-xl font-bold mt-2 mb-2'>Generate Realistic Textures Instantly</p>
                    <p>Turn any image into high-quality Physically-Based Rendering (PBR) 
                        textures with just a few clicks. Our AI-powered tool extracts and converts 
                        images into seamless texture maps, perfect for game development, 3D rendering, 
                        and digital design.</p>
                </div>

                <div className='mb-6  shadow-xl p-4 rounded-lg bg-slate-50'>

                <p className='text-xl font-bold mt-2 mb-2'>Why Choose Our PBR Texture Converter?</p>
                    <ul className='ml-2'>
                        <li>✅ AI-Driven Precision – Generate accurate Albedo, Normal, Roughness, Metalness, and other PBR maps effortlessly. </li> 
                        <li> ✅ Seamless Workflow – Upload an image, select texture preferences, and download optimized PBR materials instantly.</li>
                        <li>✅ Game & VFX Ready – Designed for industry professionals, ensuring compatibility with Blender, Unreal Engine, Unity, and more.</li>   
                        <li> ✅ No Design Experience Needed – Simplified UI makes it easy for artists, developers, and beginners to create stunning textures</li>
                    </ul>
                </div>

                <div className='mb-6  shadow-xl p-4 rounded-lg bg-slate-50'>

                    <p className='text-xl font-bold mt-2 mb-2'>How It Works</p>
                    <ol className='ml-2'>
                        <li>Upload Your Image – Drag and drop or select an image to process.</li>
                        <li>AI Analyzes & Converts – Our model extracts material properties to generate realistic texture maps.</li>
                        <li>Download & Apply – Export your PBR textures in various formats and integrate them into your 3D projects.</li>
                    </ol>
                </div>

                <div className='mb-6  shadow-xl p-4 rounded-lg bg-slate-50'>

                <p className='text-xl font-bold mt-2 mb-2'>Perfect for</p>
               <ul className='ml-2'>
                    <li>  🎮 Game Developers</li>
                    <li>🏗️ 3D Modelers & Artists </li>  
                    <li>  🎬 VFX & CGI Professionals</li>   
                    <li> 🏠 Architectural Visualization </li>   

                </ul> 

                </div>
            </div>
            <hr className='mt-10 mb-4 w-full'/>
        </div>

      


    </div>
  )
}

export default LandingPage
