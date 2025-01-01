import Image from "next/image";
import React from "react";

const Inspection = () => {
  return (
    <div className="py-10 bg-[#F9F9F9] mb-20">
      <div className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-4 space-y-8 md:space-y-0">
        {/* Text Content */}
        <div className="max-w-lg text-center md:text-left">
          <h2 className="text-sm md:text-3xl font-bold text-gray-800">
            Never buy a used laptop without
            <span className="text-purple-500"> GamerGizmo</span> PCs Inspection
          </h2>

          <div className="flex flex-wrap gap-4 mt-6">
            {/* Checkboxes with Labels */}
            {[
              "CPU",
              "GPU",
              "Motherboard",
              "Temperatures",
              "Cooler",
              "RAM",
              "USB Slots",
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <Image
                  src="/images/checkbox.png"
                  alt="Checkbox"
                  width={20}
                  height={20}
                />
                <span className="text-purple-500 font-medium">{item}</span>
              </div>
            ))}
          </div>
          <button className="mt-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full text-sm font-medium hover:from-purple-600 hover:to-pink-600">
            Schedule Inspection
          </button>
        </div>

        {/* Image Section */}
        <div className="relative">
          <Image
            src="/images/condition.png"
            alt="Inspection Graphic"
            width={600}
            height={400}
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Inspection;
