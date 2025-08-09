import Image from "next/image";
import React from "react";

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <Image
        src="/images/gameIcon.webp"
        alt="Loading"
        width={200}
        height={200}
      />

      {/* Purple loading bar */}
      <div className="mt-4 w-32 h-1 bg-purple-500 animate-ping"></div>

      {/* Under Construction Message */}
      {/* <p className="mt-6 text-lg font-bold text-gray-600 text-center px-4 animate-slide-right-to-left ">
        🚧 Our website is online, but some features are still under development.
        Stay tuned for updates! 🚀
      </p> */}
    </div>
  );
};

export default Loader;
