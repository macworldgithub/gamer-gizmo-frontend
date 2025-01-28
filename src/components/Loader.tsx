import Image from "next/image";
import React from "react";

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <Image
        src="/images/gameIcon.svg"
        alt="Loading"
        width={200}
        height={200}
      />

      {/* Purple loading bar */}
      <div className="mt-4 w-32 h-1 bg-purple-500 animate-ping"></div>
    </div>
  );
};

export default Loader;
