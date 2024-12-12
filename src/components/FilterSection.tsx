import Image from 'next/image';
import React, { useEffect, useState } from 'react'

const FilterSection = () => {
    const [isVisible, setIsVisible] = useState(window.innerWidth > 768);
    const dropdownOptions = [
        { label: 'Processor', options: ['lorem', 'lorem'] },
        { label: 'New Items', options: ['lorem', 'lorem'] },
        { label: 'Model', options: ['Gaming', 'Electronics'] },
        { label: 'Price Range', options: ['Low to High', 'High to Low'] },
        { label: 'Location', options: ['lorem', 'lorem'] },
    ];

    useEffect(() => {
        const handleResize = () => {
            setIsVisible(window.innerWidth > 768);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [])
    return (

        <div className="max-lg:min-h-[50%] max-md:w-full max-md:h-[50rem] md:lg:max-h-[75%]  bg-custom-gradient relative flex flex-col justify-center items-center py-14">
            {isVisible && (
                <div className="flex items-center bg-transparent rounded-full px-4 py-2 border border-gray-300 shadow-md w-[700px] h-[57px]">
                    <i className="fas fa-search text-gray-500 mr-2"></i>
                    <input
                        type="text"
                        placeholder="Find what do you want"
                        className="outline-none bg-transparent text-white placeholder-white"
                    />
                </div>
            )}

            <div className='text-white font-bold max-md:text-[1.4rem] md:text-[2.5rem] max-sm:whitespace-nowrap'>
                A Premier Marketplace for Gamers
            </div>
            <div className='text-white font-bold max-md:text-[1.5rem] md:text-[2.5rem]'>
                where Gamers gear up
            </div>
            <p className='text-white max-md:font-light md:font-medium md:text-lg max-md:text-xs'>Shop a Wide Range of Accessories for Every Device</p>

            <div className="flex max-md:flex-col  bg-[#ffffff] justify-around max-md:rounded-md items-center md:w-[47rem] lg:w-[60rem]
             max-md:w-[20rem]  max-md:h-[30rem] max-md:py-5 md:h-[5.625rem] px-4 mt-5 rounded-md gap-6">
                {dropdownOptions.map((dropdown, index) => (
                    <div key={index} className="w-28 h-10 text-xs max-md:mx-5 max-md:my-[0.3rem] bg-white rounded-full flex justify-center items-center border-2 border-gray-300 ">
                        <select className="w-full full bg-transparent text-black rounded-md px-2 mr-2 outline-none">
                            <option value={dropdown.options[0]}>{dropdown.label}</option>
                            {dropdown.options.map((option, id) => (
                                <option key={id} value={option}>{option}</option>
                            ))}
                        </select>
                    </div>
                ))}
                <div className='bg-custom-gradient  my-3 w-32 h-10 max-md:mx-5 rounded-full flex justify-center items-center md:text-base font-medium text-white'>Filter</div>

            </div>

            <div className='bg-black w-[191px] h-[55px] mt-5 rounded-full flex justify-center gap-3 items-center'>
                <Image src="/images/arrowIcon.png" alt='Arrow-Icon' width={20} height={20} className='' />
                <p>Explore More</p>
            </div>
        </div>
    )
}

export default FilterSection