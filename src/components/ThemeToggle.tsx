// "use client";

// import { changeTheme } from "@/app/Redux/ThemeSlice";
// import { faSun } from "@fortawesome/free-regular-svg-icons";
// import { faMoon } from "@fortawesome/free-regular-svg-icons";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";


// const ThemeToggle = () => {
//     const [isDarkMode, setIsDarkMode] = useState(false);

//     const handleToggle = () => {
//         setIsDarkMode((prev) => !prev);
//         if (!isDarkMode) {
//             document.documentElement.classList.add("dark");
//         } else {
//             document.documentElement.classList.remove("dark");
//         }
//     };


//     return (
//         <div
//             className="relative  w-[175px] h-[55px] bg-white rounded-full flex items-center p-1 cursor-pointer shadow-md"
//             onClick={handleToggle}
//         >
//             {/* Icons */}
//             <div className="absolute left-[20%] flex items-center space-x-12 w-36">
//                 <FontAwesomeIcon icon={faSun} className="z-10" color="#000000" />
//             </div>
//             <div className="absolute left-[70%] flex items-center w-36">
//                 <FontAwesomeIcon icon={faMoon} className="z-10 " style={{ color: isDarkMode ? 'white' : 'black' }} />
//             </div>

//             {/* Gradient Toggle */}
//             <div
//                 className={`w-[50%] h-[47px] bg-custom-gradient rounded-full transform transition-all duration-300 ${isDarkMode ? "translate-x-[100%]" : "translate-x-0"
//                     }`}
//             />
//         </div>
//     );
// };

// export default ThemeToggle;

// "use client";

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
// import { changeTheme } from "@/app/Redux/ThemeSlice";

// const ThemeToggle = () => {
//     const dispatch = useDispatch();
//     const currentTheme = useSelector((state: any) => state.Theme.theme);


//     return (
//         <div
//             className="relative w-[175px] h-[55px] bg-white rounded-full flex items-center p-1 cursor-pointer shadow-md"
//             onClick={() => dispatch(currentTheme())}
//         >
//             {/* Icons */}
//             <div className="absolute left-[20%] flex items-center space-x-12 w-36">
//                 <FontAwesomeIcon icon={faSun} className="z-10" color={"#000000"} />
//             </div>
//             <div className="absolute left-[70%] flex items-center w-36">
//                 <FontAwesomeIcon icon={faMoon} className="z-10" style={{ color: currentTheme === "night" ? 'white' : 'black' }} />
//             </div>

//             {/* Gradient Toggle */}
//             <div
//                 className={`w-[50%] h-[47px] bg-custom-gradient rounded-full transform transition-all duration-300 ${currentTheme === "day" ? "translate-x-[100%]" : "translate-x-0"
//                     }`}
//             />
//         </div>
//     );
// };

// export default ThemeToggle;


"use client";

import React, { useState } from "react";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { changeTheme } from "@/app/Redux/ThemeSlice";

// const [isDarkMode,setDa]
const ThemeToggle = () => {
    const dispatch = useDispatch()
    const [isDarkMode, setIsDarkMode] = useState(false);
    //@ts-ignore
    const theme = useSelector(state => state.Theme.theme)

    const handleToggle = () => {
        setIsDarkMode(!isDarkMode);
        if (!isDarkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }

        dispatch(changeTheme())


    };
    return (
        <div
            className="relative w-[175px] h-[55px] bg-white rounded-full flex items-center p-1 cursor-pointer shadow-md" onClick={handleToggle}

        >
            {/* Icons */}
            <div className="absolute left-[20%] flex items-center space-x-12 w-36">
                <FontAwesomeIcon icon={faSun} className="z-10 " color="#000000" />
                {/* color={isDarkMode ? 'white' : 'black'} */}
            </div>
            <div className="absolute left-[70%] flex items-center w-36">
                <FontAwesomeIcon icon={faMoon} className="z-10" color={`${theme === "night" ? "#ffffff" : "#000000"}`} />
                {/* style={{ color: isDarkMode ? 'white' : 'black' }} */}
            </div>
            <div
                className={`w-[50%] h-[47px] bg-custom-gradient rounded-full transform transition-all duration-300 ${theme === "night" ? "translate-x-[100%]" : "translate-x-0"
                    }`}
            />
        </div>
    );
};

export default ThemeToggle;