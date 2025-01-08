import React from "react";

function stats() {
  return (
    <div className=" py-8 px-4 md:px-16 bg-[#F4F2FE] dark:bg-[#1e1e2f] ">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 items-center ">
        {/* Left Section: Message */}
        <div className="col-span-1 md:col-span-1 ">
          <h3 className="text-gray-600 font-semibold text-sm mb-4 dark:text-white">
            MONTHLY STATS
          </h3>
          <p className="text-lg font-bold text-gray-900 dark:text-white">
            40% of UAE residents use GamerGizmo every month
          </p>
        </div>

        {/* Right Section: Stats */}
        <div className="col-span-1 md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4 ">
          {/* Stat 1 */}
          <div className="bg-white border border-[#DC39FC] shadow-md rounded-lg text-center p-6 dark:bg-black ">
            <h4 className="text-3xl font-bold text-[#6345ED] mb-2">4.1M</h4>
            <p className="text-[#7D7D7D] dark:text-white">Unique Users</p>
          </div>

          {/* Stat 2 */}
          <div className="bg-white border border-[#DC39FC] shadow-md rounded-lg text-center p-6 dark:bg-black">
            <h4 className="text-3xl font-bold text-[#6345ED] mb-2">163M</h4>
            <p className="text-[#7D7D7D] dark:text-white">Page views</p>
          </div>

          {/* Stat 3 */}
          <div className="bg-white border border-[#DC39FC] shadow-md rounded-lg text-center p-6 dark:bg-black">
            <h4 className="text-3xl font-bold text-[#6345ED] mb-2">511K</h4>
            <p className="text-[#7D7D7D] dark:text-white">Listings</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default stats;
