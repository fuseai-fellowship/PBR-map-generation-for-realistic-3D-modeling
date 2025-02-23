import React from 'react'
import butterfly1 from "./assets/butterfly1.png"


function Items(props) {
  return (
    <div className='w-60 hover:scale-105 transition-all duration-60 mt-4 hover:shadow-lg rounded-xl relative border-2 bg-amber-400'>
      <div className='relative'>
      <img className='rounded-tr-xl rounded-tl-xl  w-full h-60 object-cover' src={butterfly1}/>
   
      </div>

        <div className='flex w-5/6 text-left mx-2 my-2'>
          <p className='w-full font-mono font-extrabold text-lg'>{props.title || "Depth map"}</p>
        </div>
   
    </div>
  )
}
export default Items