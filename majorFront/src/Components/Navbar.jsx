
import React,{useState} from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
import {Link} from 'react-router-dom'


function Navbar() {
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);

    const toggleSidebar = () => {
      setIsSidebarVisible(!isSidebarVisible);
    };
  return (
    <div className='fixed top-0 left-0 w-full bg-white h-20 flex justify-around items-center border-gray-200 border-b-2 font-mono z-10'>
        <div className='text-5xl text-[#2F2E0C] font-extrabold hidden md:flex'>
            Mapper
        </div>
        <div  className='flex text-5xl text-[#2F2E0C] font-extrabold md:hidden gap-x-10'>
        <GiHamburgerMenu className=' p-2 bg-white rounded-xl'  onClick={toggleSidebar} />
        {isSidebarVisible && 
            <ul className=' fixed top-20 left-0 h-44 w-56  text-[#2F2E0C] bg-white text-xl cursor-pointer gap-y-4 flex flex-col pl-3 pt-5 border-2 border-amber-50'>
            <li>
                <Link to="/">
                Home
                </Link>
               
            </li>
            <li>
                <Link to="/DepthnTexture">
                D & T
                </Link>
                
            </li>
            <li>
                <Link to="/research">
                Research Papers
                </Link>
          </li>
        </ul>
        }
            M
        </div>
        <ul className='md:flex space-x-14 text-[#2F2E0C] text-xl cursor-pointer hidden'>
        <li>
                <Link to="/">
                Home
                </Link>
               
            </li>
            <li>
                <Link to="/DepthnTexture">
                D & T
                </Link>
                
            </li>
            <li>
                <Link to="/research">
                Research Papers
                </Link>
          </li>
        </ul>
        <div className=' flex  w-fit space-x-4 px-4 items-center '>
            <div className='border-[#e0e0d7] border-2 bg-white px-6 py-2 rounded-sm text-[#2F2E0C] font-medium cursor-pointer hover:bg-amber-50 hover:border-[#b1b1a6]'>
                Log in
            </div>
            <div className='border-[#AEFF6E] border-2 bg-[#AEFF6E] hover:bg-[#c3f69cf0] hover:border-[#c3f69cf0] px-6 py-2 rounded-sm text-[#2F2E0C] font-medium  cursor-pointer'>
                Sign-up
            </div>
        </div>
    </div>
  )
}

export default Navbar