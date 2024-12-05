"use client";
import Image from 'next/image';
import ThemeToggle from './ThemeToggle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
const Navbar = () => {
    // const currentTheme = useSelector((state: any) => state.theme.theme);

    return (
        <div className="bg-white w-screen absolute top-0">
            {/* Top Bar */}
            <div className="h-16 bg-[#f9f9f9] flex justify-between items-center px-10">
                {/* Dropdown Menus */}
                <div className="flex space-x-4 ml-[5%]">
                    <div className="w-40 h-10 bg-[#ffffff] rounded-md flex justify-center ml-28 items-center">
                        <select className="w-full h-full bg-transparent text-black rounded-md px-2 outline-none">
                            <option value="ethereum">Ethereum</option>
                            <option value="bitcoin">Bitcoin</option>
                            <option value="solana">Solana</option>
                        </select>
                    </div>
                    <div className="w-40 h-10 bg-[#ffffff] rounded-md flex justify-center items-center">
                        <select className="w-full h-full bg-transparent text-black rounded-md px-2 outline-none">
                            <option value="english">English</option>
                            <option value="french">French</option>
                            <option value="spanish">Spanish</option>
                        </select>
                    </div>
                </div>
                {/* Live Streaming Section */}
                <div className="flex items-center  mr-[10px]">
                    <p
                        className="text-navTextLight text-base mr-5"

                    >Live Streaming Coming Soon</p>

                    <div className="px-4 ml-2 mr-8 py-1 bg-custom-gradient text-white rounded-md">
                        05:29:32:48
                    </div>
                    <div className='flex  gap-3'>
                        <FontAwesomeIcon icon={faFacebookF} className="z-10" color="#4267B2" />
                        <FontAwesomeIcon icon={faTwitter} className="z-10" color="#a0a4a7" />
                        <FontAwesomeIcon icon={faInstagram} className="z-10" color="#a0a4a7" />
                        <FontAwesomeIcon icon={faGlobe} className="z-10" color="#a0a4a7" />
                        <FontAwesomeIcon icon={faLinkedin} className="z-10" color="#a0a4a7" />
                    </div>
                </div>
                {/* Social Media Icons */}
                <div className="flex space-x-4 text-secondaryColorLight">
                    <a href="#"><i className="fab fa-facebook"></i></a>
                    <a href="#"><i className="fab fa-twitter"></i></a>
                    <a href="#"><i className="fab fa-pinterest"></i></a>
                    <a href="#"><i className="fab fa-instagram"></i></a>
                    <a href="#"><i className="fab fa-linkedin"></i></a>
                </div>
            </div>

            {/* Bottom Navigation Bar */}
            <div className="flex justify-around items-center px-10 h-20 bg-white">
                <div>
                    <Image src="/images/gameIcon.svg" alt="logo-img" width={100} height={100} />
                </div>
                {/* <div className="flex  gap-10"> */}
                <a href="#" className="text-navTextLight" >Laptops</a>
                <a href="#" className="text-navTextLight">Desktops</a>
                <a href="#" className="text-navTextLight">Store</a>
                <a href="#" className="text-navTextLight">Components</a>
                <a href="#" className="text-navTextLight">Blogs</a>
                <a href="#" className="text-navTextLight">About Us</a>
                <a href="#" className="text-navTextLight">Contact Us</a>
                <a href="#" className="text-secondaryColorLight">Inspection</a>
                {/* </div> */}
                {/* <div className="flex  items-center"> */}
                <div className="w-40 h-10 bg-custom-gradient rounded-full flex justify-center items-center gap-2">
                    <Image src="/images/btnIcon.png" width={18} height={18} alt="btnIcon" />
                    <p>Post Your Ad</p>
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
                {/* </div> */}
                {/* </div> */}
            </div>
        </div>
    );
};

export default Navbar;