import React from "react";
import Image from "next/image";
import Wrapper from "@/components/Common/Wrapper/Wrapper";

const ContactCards = () => {
  return (
    <div className="bg-white py-10 dark:bg-black">
      {/* Container for Cards */}
      <Wrapper>
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Contact Number */}
          <div className="bg-[#6345ED12] rounded-lg shadow-lg p-6 text-center h-80 flex flex-col justify-between items-center border border-gray-300 dark:border-purple-400">
            <h2 className="text-xl font-semibold dark:text-white">
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
            <p className="text-lg text-purple-400 dark:text-white ">
              +012 (345) 678 88
            </p>
          </div>

          {/* Card 2: Location */}
          <div className="bg-[#6345ED12] rounded-lg shadow-lg p-6 text-center h-80 flex flex-col justify-between items-center border border-gray-300 dark:border-purple-400">
            <h2 className="text-xl font-semibold dark:text-white">Location</h2>
            <div className="flex justify-center">
              <Image
                src="/images/Location.png"
                alt="Location"
                width={80}
                height={80}
              />
            </div>
            <p className="text-lg text-gray-700 break-words dark:text-white">
              55 Main Street, 2nd Block,
              <br />
              3rd Floor, New York
            </p>
          </div>

          {/* Card 3: Email */}
          <div className="bg-[#6345ED12] rounded-lg shadow-lg p-6 text-center h-80 flex flex-col justify-between items-centerborder-gray-300 border border-gray-300 dark:border-purple-400">
            <h2 className="text-xl font-semibold dark:text-white">Email</h2>
            <div className="flex justify-center">
              <Image
                src="/images/Email.png"
                alt="Email"
                width={80}
                height={80}
              />
            </div>
            <p className="text-lg text-gray-700 break-words dark:text-white">
              hotlineinfo@gmail.com
              <br />
              www.bidzen.net
            </p>
          </div>
        </div>
      </Wrapper>
      {/* Map */}
    </div>
  );
};

export default ContactCards;
