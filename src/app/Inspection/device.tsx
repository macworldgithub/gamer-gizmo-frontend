import React, { useState } from "react";

const Device = ({
  onDeviceSelect,
}: {
  onDeviceSelect: (device: string) => void;
}) => {
  const [selectedDevice, setSelectedDevice] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedDevice(value);
    onDeviceSelect(value);
  };

  return (
    <div className="w-fit px-[5%] py-3">
      <label
        htmlFor="deviceType"
        className="block text-md font-semibold mb-2 dark:text-white"
      >
        Select Device Type
      </label>
      <select
        id="deviceType"
        value={selectedDevice}
        onChange={handleChange}
        className="w-full p-2 border rounded-md bg-white text-gray-800 
          focus:outline-none focus:ring-2 focus:ring-[#6345ED] 
          hover:ring-2 hover:ring-[#E14FFB] 
          transition-all duration-300 ease-in-out"
      >
        <option value="" disabled>
          Choose an option
        </option>
        <option value="Laptop">Laptop</option>
        <option value="Desktop">Desktop</option>
      </select>
    </div>
  );
};

export default Device;
