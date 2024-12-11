import React from "react";
import Card from "./Card";

const CategoriesComponent = () => {
  const category = [
    "New Gaming PC Parts",
    "Used Gaming PC Parts",
    "New Desktops",
    "New Laptops",
    "Used Laptops",
    "Used Desktops",
    "Accessories",
    "Gaming Consoles",
    "Customization & Gaming Gears",
  ];
  const offeringList = [
    { name: "Headphones", price: "237 AED", image: "/images/headPhones.png" },
    { name: "Mouse", price: "237 AED", image: "/images/mouse.png" },
    { name: "Keyboard", price: "237 AED", image: "/images/keyboard.png" },
    { name: "Earbuds", price: "237 AED", image: "/images/earbuds.png" },
    { name: "Controller", price: "237 AED", image: "/images/controller.png" },
    { name: "Mousepad", price: "237 AED", image: "/images/mousepad.png" },
  ]
  return (
    <div>
      {/* Top Section */}

      <div className="bg-[#f4f2fe] py-12 w-full">
        {/* Main Container */}
        <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6 lg:p-10 flex flex-col lg:flex-row items-center gap-6">
          {/* Left Section */}
          <div className="flex-1 text-center">
            <h2 className="text-xl font-bold text-purple-700 mb-4">
              Post your Ad on GamerGizmo
            </h2>
            <ul className="text-sm space-y-2 mb-6">
              <li className="flex items-center justify-center gap-2">
                <span className="text-secondaryColorDark">✔</span>
                Post your Ad for Free in 3 Easy Steps
              </li>
              <li className="flex items-center justify-center gap-2">
                <span className="text-secondaryColorDark">✔</span>
                Sell your component at the Best Price
              </li>
              <li className="flex items-center justify-center gap-2">
                <span className="text-secondaryColorDark">✔</span>
                Get Genuine offers from Verified Buyers
              </li>
            </ul>
            <button className="bg-custom-gradient text-white py-2 px-6 rounded-full hover:opacity-90">
              Post Your Ad
            </button>
          </div>

          {/* Separator */}
          <div className="hidden lg:flex flex-col items-center">
            <div className="w-px h-16 bg-gray-300"></div>
            <div className="text-gray-500 font-medium my-2">Or</div>
            <div className="w-px h-16 bg-gray-300"></div>
          </div>

          {/* Right Section */}
          <div className="flex-1 justify-start ml-16">
            <h2 className="text-xl font-bold text-purple-700 mb-4">
              Try GamerGizmo Sell For Me
            </h2>
            <ul className="text-sm space-y-2 mb-6">
              <li className="flex items-center gap-2">
                <span className="text-secondaryColorDark">✔</span>
                We ensure Safe & Secure Transaction
              </li>
              <li className="flex items-center gap-2">
                <span className="text-secondaryColorDark">✔</span>
                We Bargain for and share the Best offer
              </li>
              <li className="flex items-center  gap-2">
                <span className="text-secondaryColorDark">✔</span>
                Dedicated Sales Expert to sell your Component
              </li>
            </ul>
            <button className="bg-custom-gradient text-white py-2 px-6 rounded-full hover:opacity-90">
              Buy For GamerGizmo
            </button>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="max-w-5xl my-6 shadow-xl mx-auto p-6">
        <h2 className="text-xl font-bold pl-10 mb-6">Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {category.map((category, index) => (
            <div
              key={index}
              className="w-full max-w-[15rem] mx-auto border border-gray-200 bg-white p-6 rounded-lg  flex flex-col justify-between whitespace-nowrap"
            >
              <h2 className="text-[0.9rem] font-bold text-center mb-4">
                {category}
              </h2>
            </div>
          ))}
        </div>
      </div>
      {/* Offering Section */}
      <div className="bg-white shadow-lg my-4 rounded-lg p-8 max-w-5xl mx-auto mt-10">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">GamerGizmo Offering</h2>
          <button className="flex items-center gap-2 bg-custom-gradient text-white px-4 py-2 rounded-full shadow-md hover:shadow-lg">
            <span>Explore More</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.25 9V5.25a2.25 2.25 0 00-2.25-2.25h-5.5A2.25 2.25 0 004.25 5.25v13.5a2.25 2.25 0 002.25 2.25h5.5a2.25 2.25 0 002.25-2.25V15m5.784-3.794l-2.586-2.586m0 0a1.5 1.5 0 00-2.122 2.122m2.122-2.122l-2.586 2.586"
              />
            </svg>
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {offeringList.map((item, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 flex flex-col items-center bg-white shadow-md hover:shadow-lg"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-contain mb-4"
              />
              <h3 className="text-sm font-semibold mb-2">{item.name}</h3>
              <p className="text-sm text-gray-500 mb-4">{item.price}</p>
              <button className="bg-custom-gradient w-24 h-8 text-white text-sm px-4 py-2 rounded-full hover:bg-purple-600">
                Buy
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesComponent;
