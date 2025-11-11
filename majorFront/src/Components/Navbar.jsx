import React, { useState } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from "../Context/backendapi";
import { googleLogout } from '@react-oauth/google';
import { IoLogOutOutline } from "react-icons/io5";
import { Menu, X } from "lucide-react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const loggedIn = useSelector(state => state.status);

  const toggleMenu = () => {
    setIsOpen(prev => !prev);
  };

  const LogOut = () => {
    googleLogout();
    dispatch(logout());
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white border-b border-gray-200 z-10 font-mono">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-10 h-20 flex justify-between items-center">
        {/* Logo + Desktop Nav */}
        <div className="flex items-center justify-between w-full md:w-auto">
          <Link to="/" className="text-4xl font-extrabold text-[#2F2E0C]">
            PBR Mapper
          </Link>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="ml-4 p-2 rounded-md text-gray-800 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-300"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Desktop Nav */}
        <ul className="hidden md:flex space-x-8 text-[#2F2E0C] text-xl items-center">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/DepthnTexture">D&T</Link></li>
          {/*<li><Link to="/research">Research Papers</Link></li>*/}
          {loggedIn ? (
            <li>
              <button
                onClick={LogOut}
                className="flex items-center gap-2 border-2 px-6 py-2 rounded-sm text-[#2F2E0C] hover:bg-emerald-800 hover:text-white hover:border-emerald-800"
              >
                Logout
                <IoLogOutOutline />
              </button>
            </li>
          ) : (
            <li className="flex gap-x-4">
              <Link to="/login">
                <div className="border-2 px-6 py-2 rounded-sm hover:bg-emerald-800 hover:text-white hover:border-emerald-800">
                  Login
                </div>
              </Link>
              <Link to="/signup">
                <div className="bg-[#AEFF6E] hover:bg-[#99d26d] border-2 border-[#AEFF6E] px-6 py-2 rounded-sm text-[#2F2E0C]">
                  Sign Up
                </div>
              </Link>
            </li>
          )}
        </ul>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 py-4 space-y-3 bg-white border-t border-gray-200">
          <Link to="/" className="block text-lg text-gray-900 hover:bg-gray-50 px-2 py-1 rounded" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/DepthnTexture" className="block text-lg text-gray-900 hover:bg-gray-50 px-2 py-1 rounded" onClick={() => setIsOpen(false)}>D&T</Link>
          {/*<Link to="/research" className="block text-lg text-gray-900 hover:bg-gray-50 px-2 py-1 rounded" onClick={() => setIsOpen(false)}>Research Papers</Link>*/}

          {loggedIn ? (
            <button
              onClick={() => { LogOut(); setIsOpen(false); }}
              className="w-full flex items-center gap-2 justify-center border-2 px-4 py-2 rounded-sm text-[#2F2E0C] hover:bg-emerald-800 hover:text-white hover:border-emerald-800"
            >
              Logout
              <IoLogOutOutline />
            </button>
          ) : (
            <div className="flex flex-col gap-2 pt-2">
              <Link to="/login" onClick={() => setIsOpen(false)}>
                <div className="w-full border-2 px-4 py-2 rounded-sm text-[#2F2E0C] text-center hover:bg-emerald-800 hover:text-white hover:border-emerald-800">
                  Login
                </div>
              </Link>
              <Link to="/signup" onClick={() => setIsOpen(false)}>
                <div className="w-full bg-[#AEFF6E] hover:bg-[#99d26d] border-2 border-[#AEFF6E] px-4 py-2 rounded-sm text-center text-[#2F2E0C]">
                  Sign Up
                </div>
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
