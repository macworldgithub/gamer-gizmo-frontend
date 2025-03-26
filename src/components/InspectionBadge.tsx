"use client"

import { useRouter } from "next/navigation";


const InspectionBadge = ({ onClick }: any) => {
const router = useRouter()
    return (
      <div className="flex items-center p-4 bg-red-100 rounded-lg shadow-md">
        {/* Icon Section */}
        <div className="flex items-center justify-center w-12 h-12 bg-red-200 rounded-full">
          <img src="https://via.placeholder.com/40" alt="Car Inspection" className="w-10 h-10" />
        </div>
  
        {/* Text Section */}
        <div className="ml-4 flex-1">
          <h2 className="text-secondaryColorLight font-bold text-lg">
            PC Inspection, <span className="text-gray-800">Hassle Free!</span>
          </h2>
          <p className="text-gray-600 text-sm">
            Buy with confidence and avoid costly surprises with gamergimo's car inspections, helping you negotiate better deals every time.
          </p>
        </div>
  
        {/* Button Section */}
        <button 
          className="bg-red-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-700"
          //@ts-ignore
        //   onClick={router.push('/Inspection')}
        >
          Book Inspection
        </button>
      </div>
    );
  };
  
  export default InspectionBadge;
  