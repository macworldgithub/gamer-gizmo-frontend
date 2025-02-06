import React from "react";
import Image from "next/image";

const Map = () => {
  return (
    <div className="w-full bg-white dark:bg-black ">
      <div className="md:relative w-full xl:h-[69rem] lg:h-[48rem] md:h-[41rem]  bg-white flex flex-col md:block dark:bg-black">
        {/* Map Section */}
        <Image
          src="/images/map.png"
          alt="Map"
          width={2500}
          height={500}
          className="w-full"
        />

        <div className="md:absolute md:left-[50%]  transform md:-translate-x-1/2 md:-translate-y-1/3 w-full sm:w-[80%] max-sm:w-[90%] max-md:mx-auto  p-6 bg-white rounded-lg shadow-2xl mt-4 md:-mt-10  max-w-xl dark:bg-black  dark:shadow-purple-500 dark:shadow-sm">
          <h2 className="text-3xl font-semibold text-center mb-4 dark:text-white">
            Send Us Message
          </h2>
          <p className="text-center mb-6 dark:text-white">
            Most popular gaming digital NFT marketplace
          </p>
          <form className="space-y-4 px-8">
            <input
              className="w-full p-3 rounded bg-gray-100 font-bold text-gray-700 border-2 border-gray-300 focus:outline-none dark:bg-black dark:text-white dark:border-purple-500"
              placeholder="Your Full Name"
            />
            <input
              className="w-full p-3 rounded bg-gray-100 font-bold text-gray-700 border-2 border-gray-300 focus:outline-none dark:bg-black dark:text-white dark:border-purple-500"
              placeholder="Email Address"
            />
            <input
              className="w-full p-3 rounded bg-gray-100 font-bold text-gray-700 border-2 border-gray-300 focus:outline-none dark:bg-black dark:text-white dark:border-purple-500"
              placeholder="Subject"
            />
            <textarea
              placeholder="Write Message"
              className="w-full p-3 rounded-md bg-gray-100 font-bold text-gray-700 border-2 border-gray-300 focus:outline-none dark:bg-black dark:text-white dark:border-purple-500"
            ></textarea>
            <button
              type="submit"
              className="w-full bg-custom-gradient text-white font-semibold py-3 rounded-full"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Map;
