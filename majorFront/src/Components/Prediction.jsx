import React from 'react'
import { FaRegImage } from "react-icons/fa6";
import { FaFile } from "react-icons/fa";



function Prediction() {
  return (
    <div className='w-screen h-full p-4 mx-auto text-center font-mono  flex flex-col justify-center'>
         <div className='w-3/4 self-center mx-6 py-2 border-2 rounded-sm bg-amber-300'>
          Predict depth and normal
        </div>

        <div className='w-full h-3/4 '>
           

              <div className='h-64 flex justify-center '>
                    <div className='flex w-1/3 h-auto m-2 bg-yellow-400 border-2 rounded-sm'>
                            <div className='top-0 left-0 w-2/5 h-7 bg-green-300 rounded-sm'>
                            Output depth
                            </div>

                            <div className='flex'>
                            <FaRegImage className='self-center '/>
                            </div>
                           
                    </div>
                    <div className='flex w-1/3 h-auto m-2 bg-yellow-400 border-2 rounded-sm'>
                            <div className='top-0 left-0 w-2/5 h-7 bg-green-300 rounded-sm'>
                            Output normal
                            </div>

                            <div className='flex '>
                            <FaRegImage className=' self-center'/>
                            </div>
                    </div>
              </div>


              <div className='h-64 flex justify-center '>
                    <div className='flex w-1/3 h-auto m-2 bg-yellow-400 border-2 rounded-sm'>
                            <div className='top-0 left-0 w-2/5 h-7 bg-green-300 rounded-sm'>
                            Depth(.npy)
                            </div>

                            <div className='flex '>
                            <FaFile className=' self-center'/>
                            </div>

                    </div>
                    <div className='flex w-1/3 h-auto m-2 bg-yellow-400 border-2 rounded-sm'>
                            <div className='top-0 left-0 w-2/5 h-7 bg-green-300 rounded-sm'>
                            Normal(.npy)
                            </div>

                            <div className='flex '>
                            <FaFile className=' self-center'/>
                            </div>
                    </div>
              </div>

        </div>
    </div>
  )
}

export default Prediction