"use client";

import { useState, useEffect } from "react";
import axios from "axios";

const PcInspectionForm = () => {
  const [agreed, setAgreed] = useState(false);
  const [locations, setLocations] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/location/getAll`);
        setLocations(response.data.data.map((loc: { name: string }) => loc.name));
      } catch (error) {
        console.error("Failed to fetch locations", error);
      }
    };

    fetchLocations();
  }, []);
  const handleLocationClick = (locationName: string) => {
    setSelectedLocation(locationName);
  };
  return (
    <div className="w-full mt-2 mx-auto p-6 bg-white dark:bg-gray-900 shadow-lg rounded-lg">
      {/* User Details */}
      <div className="space-y-2">
        <label className="block text-gray-700 dark:text-gray-300">Your Details</label>
        <div className="flex space-x-2">
          <input type="text" placeholder="Your Name" className="w-1/2 p-2 border rounded-md dark:bg-gray-800 dark:text-white" />
          <input type="text" placeholder="+971 5XXXXXXXX" className="w-1/2 p-2 border rounded-md dark:bg-gray-800 dark:text-white" />
        </div>
      </div>

      {/* PC Details */}
      <div className="space-y-2 mt-4">
        <label className="block text-gray-700 dark:text-gray-300">PC Details (Optional)</label>
        <input type="text" placeholder="Enter PC Model, Brand, or Specs" className="w-full p-2 border rounded-md dark:bg-gray-800 dark:text-white" />
        <div className="flex space-x-2">
          <input type="text" placeholder="Seller Name" className="w-1/2 p-2 border rounded-md dark:bg-gray-800 dark:text-white" />
          <input type="text" placeholder="+971 5XXXXXXXX" className="w-1/2 p-2 border rounded-md dark:bg-gray-800 dark:text-white" />
        </div>
      </div>

      {/* Inspection Location */}
      <div className="space-y-2 mt-4">
      <label className="block text-gray-700 dark:text-gray-300">Inspection Location (Optional)</label>
      <div className="flex flex-wrap gap-2">
        {locations.length > 0 ? (
          locations.map((city) => (
            <button
              key={city}
              onClick={() => handleLocationClick(city)}
              className={`px-4 py-2 border rounded-md ${
                selectedLocation === city
                  ? "bg-secondaryColorDark text-white"
                  : "text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {city}
            </button>
          ))
        ) : (
          <p className="text-gray-500 dark:text-gray-400">Loading locations...</p>
        )}
      </div>
    </div>
      {/* Terms Agreement */}
      <div className="flex items-center mt-4">
        <input type="checkbox" id="agree" className="w-4 h-4" checked={agreed} onChange={() => setAgreed(!agreed)} />
        <label htmlFor="agree" className="ml-2 text-gray-700 dark:text-gray-300 text-sm">
          I agree to the PC inspection <a href="#" className="text-blue-600 dark:text-blue-400">terms of service</a>
        </label>
      </div>

      {/* Buttons */}
      <div className="mt-4">
        <button className="w-full bg-secondaryColorLight text-white py-2 rounded-md hover:bg-gray-2-">Book Inspection</button>
      
      </div>
    </div>
  );
};

export default PcInspectionForm;