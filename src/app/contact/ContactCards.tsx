import React from "react";
import Image from "next/image";
import Wrapper from "@/components/Common/Wrapper/Wrapper";

const ContactCards = () => {
  return (
    <div className="bg-white py-10 dark:bg-black">
      <Wrapper>
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-[#6345ED12] rounded-lg shadow-lg p-6 text-center h-60  flex flex-col justify-between items-center border border-gray-300 dark:border-purple-400">
            <h2 className="text-xl font-semibold dark:text-white text-black">
              Contact Number
            </h2>
            <div className="flex justify-center">
              <Image
                src="/images/Phone.png"
                alt="Location"
                width={80}
                height={80}
              />
            </div>
            <a
              href="tel:+923318551070"
              className="text-base  dark:text-white text-black"
            >
              +971555795213
            </a>
          </div>

          {/* Card 2: Location */}
          <div className="bg-[#6345ED12] rounded-lg shadow-lg p-6 text-center h-60 flex flex-col justify-between items-center border border-gray-300 dark:border-purple-400">
            <h2 className="text-xl font-semibold dark:text-white text-black">
              Location
            </h2>
            <div className="flex justify-center">
              <Image
                src="/images/Location.png"
                alt="Location"
                width={80}
                height={80}
              />
            </div>
            <p className="text-sm  break-words dark:text-white text-black ">
              Shams Buisness Center, Sharjah Media City, Free Zone, AI Messaned,
              Sharjah, UAE.
            </p>
          </div>

          {/* Card 3: Email */}
          <div className="bg-[#6345ED12] rounded-lg shadow-lg p-6 text-center h-60 flex flex-col justify-between items-centerborder-gray-300 border border-gray-300 dark:border-purple-400">
            <h2 className="text-xl font-semibold dark:text-white text-black">
              Email
            </h2>
            <div className="flex justify-center">
              <Image
                src="/images/Email.png"
                alt="Email"
                width={80}
                height={80}
              />
            </div>
            <a
              href="mailto:support@gamergizmo.com"
              className="text-base  break-words dark:text-white text-black"
            >
              support@gamergizmo.com
            </a>
          </div>
        </div>
      </Wrapper>
      {/* Map */}
    </div>
  );
};

export default ContactCards;
