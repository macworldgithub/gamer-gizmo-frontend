"use client"

import { useRouter } from "next/navigation";
import { FcInspection } from "react-icons/fc";

const InspectionBadge = ({ onClick }: any) => {
  const router = useRouter();

  const handleNavigation = () => {
    router.push("/Inspection");
  };
    return (
      <div className="flex max-md:flex-col items-center p-3 w-[100%] bg-secondaryColorDark rounded-lg shadow-md">
        {/* Icon Section */}
        <div className="flex items-center justify-center w-12 h-12 bg-red-200 rounded-full">
          {/* <img src="https://via.placeholder.com/40" alt="Car Inspection" className="w-10 h-10" /> */}
          <FcInspection size={22}/>
        </div>
  
        {/* Text Section */}
        <div className="ml-3 flex-1">
          <h2 className=" font-bold text-white text-lg">
            PC Inspection, <span className="text-gray-800">Hassle Free!</span>
          </h2>
          <p className="md:text-sm max-md:text-[0.5rem] md:w-96 max-md:hidden max-md:w-75 max-md:pl-2 text-white">
            Buy with confidence and avoid costly surprises with gamergimo's car inspections, helping you negotiate better deals every time.
          </p>
        </div>
  
        {/* Button Section */}
        <button 
          className="bg-bluishBorder text-black font-bold py-2 px-2 rounded-lg hover:bg-secondaryColorLight"
          onClick={handleNavigation} 
        >
          Book Inspection
        </button>
      </div>
    );
  };
  
  export default InspectionBadge;
  