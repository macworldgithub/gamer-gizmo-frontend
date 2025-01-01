// import Image from "next/image";
// import Link from "next/link";
// import React from "react";

// const ProductDetails = () => {
//   return (
//     <div className="w-full flex justify-center items-center h-auto">
//       {/* <div className="w-[48rem] bg-orange-300"> */}
//       <Image
//         src="/images/graphicCard.png"
//         alt="logo-img"
//         width={600}
//         height={400}
//         // className="max-sm:w-[4rem] md:w-[2rem] md:ml-[0.2rem] lg:w-[48rem] md:h-[31.25rem] lg:h-12 max-sm:mx-auto"
//       />
//       {/* </div> */}
//     </div>
//   );
// };

// export default ProductDetails;
import Image from "next/image";

const ProductDetails = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      {/* Image Section */}
      <div className="w-full flex justify-center items-center h-auto">
        <Image
          src="/images/graphicCard.png"
          alt="graphic-card"
          width={600}
          height={400}
        />
      </div>

      {/* Details Section */}
      <div className="w-full max-w-5xl bg-white p-6 mt-6">
        <div className="flex flex-col justify-center items-center">
          {/* <div className="flex items-center justify-between gap-36 mt-4 md:mt-0  shadow-md rounded-md">
            <div className="text-sm text-gray-400 flex items-center space-x-1">
              <div>Dale J. Barnes</div>
              <span>|</span>
              <span>05 Jan 2022</span>
            </div>
            <div className="text-sm text-gray-400 flex items-center">
              Comments (5)
            </div>
          </div> */}
          <div className="w-full flex justify-start mt-4 mb-7">
            <div className="w-full flex justify-between  items-center bg-white shadow-md  rounded-lg">
              {/* User Info */}
              <div className="flex items-center space-x-2">
                <div className="text-purple-600">
                  <i className="fas fa-user"></i>
                </div>
                <div className="text-gray-700 font-medium">Dale J. Barnes</div>
              </div>

              {/* Divider */}
              <div className="h-6 w-px bg-gray-300"></div>

              {/* Date Info */}
              <div className="flex items-center space-x-2">
                <div className="text-purple-600">
                  <i className="fas fa-calendar-alt"></i>
                </div>
                <div className="text-gray-700 font-medium">05 Jan 2022</div>
              </div>

              {/* Divider */}
              <div className="h-6 w-px bg-gray-300"></div>

              {/* Comments */}
              <div className="flex items-center space-x-2">
                <div className="text-purple-600">
                  <i className="fas fa-comment-alt"></i>
                </div>
                <div className="text-gray-700 font-medium">Comments (5)</div>
              </div>
            </div>
          </div>
          <div className=" flex flex-col  items-start">
            <p className="md:text-xl max-md:text-[0.9rem] font-bold text-gray-800  mb-4">
              AMD Radeon RX 580 GTS XXX Edition Graphics Card, S Version, 8GB
              DDR5 256 Bit Memory, Dual Bios, 2304 Stream Processor, 1386MHz
              OC+, PCI-E, HDMI, DisplayPort | RX-58085D6
            </p>
            <p className="text-sm text-gray-500 mt-2 text-start">
              <span className="font-semibold">Warranty:</span> 1 Year &nbsp;
              <span>
                Effortless warranty claims with global coverage; shipping costs
                are on us.
              </span>
            </p>
          </div>
        </div>

        {/* Tags and Share Section */}
        <div className="flex flex-row justify-between border-t border-gray-200 mt-6 pt-4">
          <div className="flex flex-col items-start">
            <h1 className="text-black font-bold text-lg mb-5"> Popular Tags</h1>
            <div className="flex justify-between gap-6">
              <button className="bg-custom-gradient text-white px-4 py-2 rounded-full text-sm flex md:justify-end hover:bg-purple-600 max-sm:mt-3">
                Overview
              </button>
              <button className="bg-gray-200 text-white px-4 py-2 rounded-full text-sm flex md:justify-end hover:bg-purple-600 max-sm:mt-3">
                Specifications
              </button>
            </div>
          </div>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <span className="text-gray-600 font-semibold">Share Post:</span>
            <div className="flex space-x-3">
              <button className="text-blue-600 hover:text-blue-800">
                <i className="fab fa-facebook-f"></i>
              </button>
              <button className="text-blue-600 hover:text-blue-800">
                <i className="fab fa-twitter"></i>
              </button>
              <button className="text-blue-600 hover:text-blue-800">
                <i className="fab fa-linkedin-in"></i>
              </button>
              <button className="text-blue-600 hover:text-blue-800">
                <i className="fab fa-google"></i>
              </button>
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-800">
            AMD Radeon RX 580
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            With an overclocked core and memory, based on AMD's Polaris
            architecture, and AMD LiquidVR ready, the XFX Force Radeon RX 580
            GTS XXX Edition Graphics Card allows you to have the full virtual
            reality experience. Not only for gaming, the Radeon RX 580 supports
            APIs such as OpenCL and OpenGL. These APIs can take advantage of the
            GPU's 2304 Stream Processors to accelerate parallel computing tasks,
            taking some of the processing load off the CPU.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
