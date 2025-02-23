import React from 'react'
import { FaFile } from "react-icons/fa";

function Reconstruct() {
  return (
    <div className='w-screen h-full p-4 mx-auto text-center font-mono flex flex-col justify-center'>
         <div className='w-3/4 self-center mx-6 py-2 border-2 rounded-sm bg-amber-300'>
          Reconstruct 3D
        </div>
         <div className='flex flex-col justify-center '>
                    <div className='flex w-2/3 h-64 m-2 bg-yellow-400 border-2 rounded-sm self-center'>
                            <div className='top-0 left-0 w-2/5 h-7 bg-green-300 rounded-sm'>
                            3D point cloud( Sample sparse version)
                            </div>

                            <div className='flex '>
                            <FaFile className=' self-center'/>
                            </div>

                    </div>
                    <div className='flex w-2/3 h-64 m-4 bg-yellow-400 border-2 rounded-sm self-center'>
                            <div className='top-0 left-0 w-2/5 h-7 bg-green-300 rounded-sm'>
                            3D point cloud(.ply)
                            </div>

                            <div className='flex '>
                            <FaFile className=' self-center'/>
                            </div>
                    </div>
              </div>
    </div>
  )
}

export default Reconstruct
