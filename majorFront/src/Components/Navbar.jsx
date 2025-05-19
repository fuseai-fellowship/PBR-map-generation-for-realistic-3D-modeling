
import React,{useState} from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
import {Link} from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux';
import {logout} from "../Context/backendapi";
import { googleLogout } from '@react-oauth/google';
import { IoLogOutOutline,IoLogInOutline } from "react-icons/io5";


function Navbar() {
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);
    const disptach=useDispatch();
    const loggedIn=useSelector(state=>state.status)
    const toggleSidebar = () => {
      setIsSidebarVisible(!isSidebarVisible);
    };

    const LogOut=()=>{
        googleLogout()
        disptach(logout())

    }
  return (
    <div className='fixed top-0 left-0 w-full px-10 bg-white h-20 flex justify-between items-center border-gray-200 border-b-2 font-mono z-10'>
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
        <ul className='md:flex space-x-8 text-[#2F2E0C] text-xl items-center cursor-pointer hidden'>
        <li>
                <Link to="/">
                Home
                </Link>
               
            </li>
            <li>
                <Link to="/DepthnTexture">
                D&T
                </Link>
                
            </li>
            <li>
                <Link to="/research">
                Research Papers
                </Link>
          </li>
          {loggedIn?
          <li>
            <div
            onClick={LogOut} 
            className='flex border-2 bg-white px-6 py-2 rounded-sm items-center gap-2 text-[#2F2E0C] font-medium cursor-pointer hover:bg-emerald-800 hover:text-white hover:border-emerald-800'>
               
                Logout
                <IoLogOutOutline/>
            </div>
          </li>:
          <li className='flex gap-x-4'>
            <Link to='/login'>
            <div className=' border-2 bg-white px-6 py-2 rounded-sm text-[#2F2E0C] font-medium cursor-pointer hover:bg-emerald-800 hover:text-white hover:border-emerald-800'>
                Login
            </div>
            </Link>
         
            <Link to='/signup'>
            <div className='bg-[#AEFF6E] hover:bg-[#99d26d] hover:border-[#99d26d] border-2 border-[#AEFF6E] px-6 py-2 rounded-sm text-[#2F2E0C] font-medium  cursor-pointer'>
                Sign Up
            </div>
            </Link>
          </li>}
          
          
        </ul>
    </div>
  )
}

export default Navbar