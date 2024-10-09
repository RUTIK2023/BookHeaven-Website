import React, { useState } from "react";
import logo from "../../assets/dp3.webp";
import { NavLink } from "react-router-dom";
import { useSelector } from 'react-redux';
import { FaBars, FaTimes } from 'react-icons/fa';

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // checking user logged in or not..
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const role = useSelector((state) => state.auth.role);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <div className="sticky top-0 z-50 border-b-2 border-zinc-700 bg-zinc-900 h-16 px-5 flex items-center justify-between text-white shadow-md">
            {/* Logo and Title */}
            <div className="logo flex items-center gap-3">
                <img className="rounded-full h-12 w-12 shadow-lg border-4 border-gradient-to-r from-pink-500 to-purple-500" src={logo} alt="Logo" />
                <NavLink to='/'>
                    <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 animate-pulse shadow-lg">
                        Book<span className="text-white">Heaven</span>
                    </h1>
                </NavLink>
            </div>

            {/* Hamburger menu button (Visible on mobile) */}
            <div className="md:hidden">
                <button onClick={toggleMenu}>
                    {isMenuOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
                </button>
            </div>

            {/* Navigation Links */}
            <div className={`fixed bg-black top-0 left-0 h-full w-full bg-opacity-70 flex flex-col items-center gap-10 pt-20 md:pt-0 md:static md:bg-transparent md:flex-row md:gap-5 transition-transform duration-500 ease-in-out transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:ml-auto md:w-auto`}>
                <ul className="flex flex-col gap-6 items-center md:flex-row">
                    <NavLink onClick={closeMenu} className="transition-all duration-300 hover:text-blue-400 hover:scale-105" to="/">Home</NavLink>
                    <NavLink onClick={closeMenu} className="transition-all duration-300 hover:text-blue-400 hover:scale-105" to='/about'>About us</NavLink>
                    <NavLink onClick={closeMenu} className="transition-all duration-300 hover:text-blue-400 hover:scale-105" to='/allbooks'>All Books</NavLink>
                    {isLoggedIn && role === "user" && (
                        <div className="flex flex-col gap-4 items-center md:flex-row">
                            <NavLink onClick={closeMenu} className="transition-all duration-300 hover:text-blue-400 hover:scale-105" to='/cart'>Cart</NavLink>
                            <NavLink onClick={closeMenu} className="transition-all duration-300 hover:scale-105 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-400 hover:to-blue-600 text-black font-semibold border-2 border-blue-500 px-3 py-1 rounded-lg" to='/profile'>
                                Profile
                            </NavLink>
                        </div>
                    )}
                    {isLoggedIn && role === "admin" && (
                        <div className="flex flex-col gap-4 items-center md:flex-row">
                            <NavLink onClick={closeMenu} className="transition-all duration-300 hover:scale-105 bg-gradient-to-r from-pink-500 to-pink-700 hover:from-pink-400 hover:to-pink-600 text-black font-semibold border-2 border-pink-500 px-3 py-1 rounded-lg" to='/profile'>
                                Admin Profile
                            </NavLink>
                        </div>
                    )}
                </ul>

                {/* Login/Signup Buttons for non-authenticated users */}
                {!isLoggedIn &&
                    <div className="flex flex-col gap-4 items-center md:flex-row">
                        <NavLink onClick={closeMenu} to='/login'>
                            <button className="transition-all duration-300 hover:scale-105 bg-gradient-to-r from-gray-700 to-gray-900 hover:bg-gradient-to-r hover:from-gray-600 hover:to-gray-800 text-white px-4 py-2 rounded-md shadow-md">
                                Login
                            </button>
                        </NavLink>
                        <NavLink onClick={closeMenu} to='/signup'>
                            <button className="transition-all duration-300 hover:scale-105 bg-gradient-to-r from-blue-500 to-blue-00 hover:from-blue-400 hover:to-blue-600 text-white px-4 py-2 rounded-md shadow-md">
                                Signup
                            </button>
                        </NavLink>
                    </div>
                }
            </div>
        </div>
    );
}

export default Navbar;
