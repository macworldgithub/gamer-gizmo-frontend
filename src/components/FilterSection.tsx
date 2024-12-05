import React from 'react'

const FilterSection = () => {
    const dropdownOptions = [
        { label: 'Processor', options: ['lorem', 'lorem'] },
        { label: 'New Items', options: ['lorem', 'lorem'] },
        { label: 'Model', options: ['Gaming', 'Electronics'] },
        { label: 'Price Range', options: ['Low to High', 'High to Low'] },
        { label: 'Location', options: ['lorem', 'lorem'] },
    ];

    return (

        <div className="min-h-[50%] max-h-[75%] bg-custom-gradient relative flex flex-col justify-center items-center py-14">
            <div className="flex items-center bg-transparent rounded-full px-4 py-2 border border-gray-300 shadow-md w-[700px] h-[57px]">
                <i className="fas fa-search text-gray-500 mr-2"></i>
                <input
                    type="text"
                    placeholder="Find what do you want"
                    className="outline-none bg-transparent text-white placeholder-white"
                />
            </div>

            <div className='text-white font-bold text-[50px]'>
                A Premier Marketplace for Gamers
            </div>
            <div className='text-white font-bold text-[50px]'>
                where Gamers gear up
            </div>
            <div className='text-white font-medium text-lg'>Shop a Wide Range of Accessories for Every Device</div>

            <div className="flex bg-white justify-around items-center w-[1389px] h-[90px] mt-5 rounded-md gap-6">
                {dropdownOptions.map((dropdown, index) => (
                    <div key={index} className="w-40 h-10 bg-[#ffffff] rounded-full flex justify-center items-center border-2 border-gray-300">
                        <select className="w-full h-full bg-transparent text-black rounded-md px-2 mr-2 outline-none">
                            <option value={dropdown.options[0]}>{dropdown.label}</option>
                            {dropdown.options.map((option, id) => (
                                <option key={id} value={option}>{option}</option>
                            ))}
                        </select>
                    </div>
                ))}
                <div className='bg-custom-gradient w-40 h-10 rounded-full flex justify-center items-center text-lg font-medium text-white'>Filter</div>

            </div>

            <div className='bg-black w-[191px] h-[55px] mt-5 rounded-full flex justify-center items-center'>Explore More</div>
        </div>
    )
}

export default FilterSection