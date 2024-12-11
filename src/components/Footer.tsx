// import Image from 'next/image'
// import React from 'react'

// const Footer = () => {
//     return (
//         <div className='bg-black w-full h-[30rem] flex justify-center items-center'>
//             <div className='flex-col justify-center'>
//                 <Image src="/images/gameIcon.png" alt='logo img' width={100} height={100} />
//                 <p>"Gamer Gizmo – Your ultimate destination for gaming gear, laptops, and accessories. Level up your gaming experience with ease."</p>
//             </div>
//             <div></div>
//             <div></div>
//             <div></div>
//             <div></div>
//         </div>
//     )
// }

// export default Footer

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faLinkedin, faYoutube } from '@fortawesome/free-brands-svg-icons';
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';

const Footer = () => {
    return (
        <div className="relative bg-black text-white py-20">

            <div className="absolute -top-16 w-full rounded-md">
                <div className="bg-custom-gradient rounded-2xl flex flex-col md:flex-row justify-between items-center  mx-auto max-w-5xl px-8 py-8">
                    {/* Heading and Description */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left">
                        <h2 className="text-2xl md:text-3xl font-bold">Newsletters</h2>
                        <p className="text-sm md:text-lg mt-2">
                            Most popular gaming digital nft marketplace
                        </p>
                    </div>

                    {/* Input and Button */}
                    <div className="flex mt-6 md:mt-0 md:ml-8">
                        <input
                            type="email"
                            placeholder="Enter Email Address"
                            className="md:w-[15rem] w-full p-3 rounded-l-full focus:outline-none"
                        />
                        <button className="bg-white text-purple-600 font-bold py-3 px-6 rounded-r-full">
                            Browse More
                        </button>
                    </div>
                </div>
            </div>

            {/* Footer Main Section */}
            <div className="pt-32 pb-10 px-8 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
                {/* Logo & Description */}
                <div className=''>
                    <Image src="/images/gameIcon.png" width={100} height={100} alt="Logo" className="mb-2" />
                    <p className="text-sm max-w-xs leading-relaxed text-start">
                        “Gamer Gizmo – Your ultimate destination for gaming gear, laptops,
                        and accessories. Level up your gaming experience with ease.”
                    </p>
                    <div className="flex mt-4">
                        <Link href="#" className="text-white mx-2">
                            <FontAwesomeIcon icon={faFacebookF} className="z-10" color="#4267B2" />
                        </Link>
                        <Link href="#" className="text-white mx-2">
                            <FontAwesomeIcon icon={faLinkedin} className="z-10" color="#a0a4a7" />
                        </Link>
                        <Link href="#" className="text-white mx-2">
                            <FontAwesomeIcon icon={faYoutube} className="z-10" color="#a0a4a7" />

                        </Link>
                    </div>
                </div>

                {/* Marketplace */}
                <div className='text-start'>
                    <h3 className="font-bold mb-4 text-[1.2rem] ">Marketplace</h3>
                    <ul className="space-y-2 text-sm ">
                        <li>Gaming Gear</li>
                        <li>Consoles</li>
                        <li>Gaming PCs</li>
                        <li>Laptops</li>
                        <li>Used Components</li>
                        <li>Accessories</li>
                    </ul>
                </div>

                {/* Support */}
                <div className='text-start'>
                    <h3 className="mb-4 text-[1.2rem] font-bold">Supports</h3>
                    <ul className="space-y-2 text-sm">
                        <li>Terms & Conditions</li>
                        <li>24/7 Supports</li>
                        <li>Cookie Policy</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>

                {/* Contact */}
                <div className='text-start'>
                    <h3 className="mb-4 text-[1.2rem] font-bold">Contact</h3>
                    <p className="text-sm">
                        Email: support@gamergizmo.com
                        <br />
                        Phone: +123 456 7890
                    </p>
                </div>
                <div className="text-start">
                    <h4 className="mb-2 text-[1.2rem] font-bold">News & Post</h4>
                    <div className="flex items-start space-x-4 mb-4">
                        {/* <div className="w-16 h-16 bg-gray-600"></div> */}
                        <Image src="/images/footerImg.png" alt='footer-image' width={40} height={40} />
                        <div>
                            <p className="text-sm">
                                Boost Your Gaming Setup with These Hacks
                            </p>
                            <Link href="#" className="text-xs underline">
                                Read More
                            </Link>
                        </div>
                    </div>
                    <div className="flex items-start space-x-4">
                        <Image src="/images/footerImg.png" alt='footer-image' width={40} height={40} />

                        <div>
                            <p className="text-sm">
                                Boost Your Gaming Setup with These Hacks
                            </p>
                            <Link href="#" className="text-xs underline">
                                Read More
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="text-center border-t border-gray-800 py-4 text-sm">
                © Copyright 2021 - All Rights Reserved
            </div>
        </div>
    );
};

export default Footer;
