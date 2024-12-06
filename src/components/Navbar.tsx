"use client";
import Image from 'next/image';
import ThemeToggle from './ThemeToggle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import Link from 'next/link';
const Navbar = () => {
    // const currentTheme = useSelector((state: any) => state.theme.theme);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [firstClick, setFirstClick] = useState(false)

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
        setFirstClick(true)
    };

    return (
        <div className="bg-white w-screen">
            {/* Top Bar */}
            <div className="max-sm:h-20 h-16 bg-[#f9f9f9]   flex lg:justify-between md:justify-center items-center max-sm:px-1 sm:px-8 px-10">
                {/* Dropdown Menus */}
                <div className="flex max-sm:space-x-0 space-x-4 max-sm:ml-0 sm:ml-0 max-sm:gap-2 md:ml-[12%]">
                    <div className="max-sm:w-[4rem] sm:w-[5rem]  md:w-[6rem] max-sm-h-5  md:h-10 bg-[#ffffff] rounded-md flex justify-center max-sm:ml-2 sm:ml-8 ml-28 items-center">
                        <select className="w-full h-full bg-transparent max-sm:text-[0.7rem] sm:text-sm text-black rounded-md max-sm:px-1 px-2 outline-none">
                            <option value="ethereum">Ethereum</option>
                            <option value="bitcoin">Bitcoin</option>
                            <option value="solana">Solana</option>
                        </select>
                    </div>
                    <div className="max-sm:w-[4rem]  sm:w-[5rem] md:w-[6rem] md:h-10 bg-[#ffffff] rounded-md flex justify-center items-center">
                        <select className="w-full h-full bg-transparent max-sm:text-xs sm:text-sm text-black rounded-md max-sm:px-0 px-2 outline-none">
                            <option value="english">English</option>
                            <option value="french">French</option>
                            <option value="spanish">Spanish</option>
                        </select>
                    </div>
                </div>
                {/* Live Streaming Section */}
                <div className="flex items-center max-sm:mr-2 mr-[20%]">
                    <div className='flex max-sm:block justify-center items-center'>
                        <p className="text-navTextLight text-[0.5rem] w-max text-wrap  md:text-xs sm:ml-5 text-center   md:mr-5"
                        >Live Streaming Coming Soon</p>
                        <div className="px-4 tracking-wider max-sm:w-[5rem]  w-44 max-sm:h-8 h-[2rem] md:h-12 ml-2 mr-8 py-1 flex justify-center items-center text-[0.6rem] md:text-lg bg-custom-gradient text-white rounded-md">
                            05:29:32:48
                        </div>
                    </div>
                    <div className='flex  gap-3'>
                        <FontAwesomeIcon icon={faFacebookF} className="z-10" color="#4267B2" />
                        <FontAwesomeIcon icon={faTwitter} className="z-10" color="#a0a4a7" />
                        <FontAwesomeIcon icon={faInstagram} className="z-10" color="#a0a4a7" />
                        <FontAwesomeIcon icon={faGlobe} className="z-10" color="#a0a4a7" />
                        <FontAwesomeIcon icon={faLinkedin} className="z-10" color="#a0a4a7" />
                    </div>
                </div>

            </div>

            {/* Bottom Navigation Bar */}
            <div className="flex justify-evenly items-center  h-20  bg-white">
                {/* <div> */}
                <Image src="/images/gameIcon.png" alt="logo-img" width={100} height={100} className='max-sm:w-[4rem] md:w-[2rem] lg:w-[5rem] md:h-[2rem] lg:h-10 max-sm:mx-auto' />
                {/* </div> */}
                <div className='hidden md:flex md:gap-5 lg:gap-9 font-bold md:text-[0.8rem] lg:text-[1.2rem]'>
                    <Link href="#" className="text-navTextLight " >Laptops</Link>
                    <Link href="#" className="text-navTextLight">Desktops</Link>
                    <Link href="#" className="text-navTextLight">Store</Link>
                    <Link href="#" className="text-navTextLight">Components</Link>
                    <Link href="#" className="text-navTextLight">Blogs</Link>
                    <Link href="#" className="text-navTextLight">About Us</Link>
                    <Link href="#" className="text-navTextLight">Contact Us</Link>
                    <Link href="#" className="text-secondaryColorLight">Inspection</Link>
                </div>

                <div className="md:hidden absolute left-0 ml-4">
                    <button
                        onClick={toggleDrawer}
                        className="text-black focus:outline-none"
                    >
                        {/* Drawer Icon */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3.75 6.75h16.5m-16.5 5.25h16.5m-16.5 5.25h16.5"
                            />
                        </svg>
                    </button>
                    {/* Drawer Menu */}
                    {
                        (

                            <div
                                className={`fixed left-0 bg-white w-[10rem] h-screen z-50 bg-red flex flex-col items-center space-y-6 py-8 
                                ${isDrawerOpen ? 'animate-slide-in' : firstClick ? 'animate-slide-out' : 'hidden'}`}>
                                <Image
                                    src="/images/profile.png"
                                    alt="Profile"
                                    width={40}
                                    height={40}
                                    className="rounded-full"
                                />
                                <p className='text-secondaryColorLight'>Ayla Imran</p>

                                <Link href="#" className="text-black text-lg hover:text-gray-300" onClick={() => setIsDrawerOpen(false)}>Laptops</Link>
                                <Link href="#" className="text-black text-lg hover:text-gray-300" onClick={() => setIsDrawerOpen(false)}>Desktops</Link>
                                <Link href="#" className="text-black text-lg hover:text-gray-300" onClick={() => setIsDrawerOpen(false)}>Store</Link>
                                <Link href="#" className="text-black text-lg hover:text-gray-300" onClick={() => setIsDrawerOpen(false)}>Components</Link>
                                <Link href="#" className="text-black text-lg hover:text-gray-300" onClick={() => setIsDrawerOpen(false)}>Blogs</Link>
                                <Link href="#" className="text-black text-lg hover:text-gray-300" onClick={() => setIsDrawerOpen(false)}>About Us</Link>
                                <Link href="#" className="text-black text-lg hover:text-gray-300" onClick={() => setIsDrawerOpen(false)}>Contact Us</Link>
                                <Link href="#" className="text-black text-lg hover:text-gray-300" onClick={() => setIsDrawerOpen(false)}>Inspection</Link>

                                <div className="flex-col items-center mx-auto pl-0">
                                    <div className="w-[7rem] mx-auto h-10 bg-custom-gradient rounded-full flex justify-center items-center gap-2">
                                        <Image src="/images/btnIcon.png" className='w-[0.8rem]' width={18} height={18} alt="btnIcon" />
                                        <p className='text-sm'>Post Your Ad</p>
                                    </div>

                                    <ThemeToggle />
                                </div>
                            </div>
                        )}

                </div>
                <div className="hidden md:flex  items-center md:gap-10 mr-16 ml-0 pl-0">
                    <div className="md:w-[8rem] lg:[10rem] md:h-7 lg:h-10 md:ml-2  bg-custom-gradient rounded-full flex justify-center items-center gap-2">
                        <Image src="/images/btnIcon.png" className='md:w-[0.6rem]' width={18} height={18} alt="btnIcon" />
                        <p className='md:text-xs'>Post Your Ad</p>
                    </div>
                    {/* <div className="flex space-x-4 items-center"> */}
                    <Image
                        src="/images/profile.png"
                        alt="Profile"
                        width={40}
                        height={40}
                        className="rounded-full"
                    />
                    <ThemeToggle />
                </div>
                {/* </div> */}
            </div>
        </div>
    );
};

export default Navbar;