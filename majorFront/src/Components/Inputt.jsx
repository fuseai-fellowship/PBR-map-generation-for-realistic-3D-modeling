import React, { useRef, useState } from 'react';
import { MdOutlineFileUpload } from "react-icons/md";

function Inputt() {
  const [selectedImage, setSelectedImage] = useState(null);
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

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  // When user clicks the container, trigger file selection
  const handleClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className='w-screen h-full mt-16 p-4 mx-auto text-center font-mono'>
      <div className='w-full h-2/3 flex'>
        <div
          className='w-1/2 h-3/4 m-6 bg-yellow-400 border-2 rounded-sm relative cursor-pointer'
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

          <div className='flex justify-center'>
            <MdOutlineFileUpload className='self-center mt-4 text-xl' />
          </div>
        </div>

        <div className='w-1/2 m-6'>
          <div className='w-full h-24 p-4 border-2 rounded-sm bg-amber-300 text-left'>
            <p>Model</p>
            <div>
              <select className='w-full h-8 mt-2 px-2 bg-blue-400 border-2 rounded-sm'>
                <option>vit-large</option>
                <option>vit-small</option>
              </select>
            </div>
          </div>

          <div className='w-full h-auto mt-2 p-4 border-2 rounded-sm bg-amber-300 text-left'>
            <p>Advanced Options</p>
            <div className='flex text-sm items-start'>
              <div className='flex border-2 p-2 rounded-sm'>
                <div className='mr-4'>
                  <p>Sensor width in mm</p>
                  <div className='border-2 m-1 rounded-sm pl-1'>0</div>
                </div>
                <div className='mr-4'>
                  <p>Sensor height in mm</p>
                  <div className='border-2 m-1 rounded-sm pl-1'>0</div>
                </div>
                <div>
                  <p>Focal length in mm</p>
                  <div className='border-2 m-1 rounded-sm pl-1'>0</div>
                </div>
              </div>
              <div className='h-1/2 ml-1 p-2 border-2 rounded-sm'>
                Detect Camera from EXIF
              </div>
            </div>

            <div className='flex mt-2 text-sm items-start justify-between'>
              <div className='flex border-2 p-2 rounded-sm gap-4'>
                <div>
                  <p>fx in pixels</p>
                  <div className='border-2 m-1 rounded-sm pl-1'>0</div>
                </div>
                <div>
                  <p>fy in pixels</p>
                  <div className='border-2 m-1 rounded-sm pl-1'>0</div>
                </div>
              </div>
              <div className='h-1/2 ml-1 p-2 border-2 rounded-sm'>
                Calculate intrinsic
              </div>
            </div>
          </div>

          <div className='w-full h-24 mt-2 p-4 border-2 rounded-sm bg-amber-300 text-left'>
            <p>Messages</p>
            <div className='w-full h-8 mt-2 bg-blue-400 border-2 rounded-sm px-2'>
              This is the message
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Inputt;
