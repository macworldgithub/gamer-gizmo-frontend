import Image from "next/image";
import React from "react";

const ProductDetails = () => {
  return (
    <div className="w-full flex justify-center items-center h-auto">
      {/* <div className="w-[48rem] bg-orange-300"> */}
      <Image
        src="/images/graphicCard.png"
        alt="logo-img"
        width={300}
        height={200}
        // className="max-sm:w-[4rem] md:w-[2rem] md:ml-[0.2rem] lg:w-[48rem] md:h-[31.25rem] lg:h-12 max-sm:mx-auto"
      />
      {/* </div> */}
    </div>
  );
};

export default ProductDetails;
