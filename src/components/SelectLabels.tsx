"use client";

import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useEffect, useState } from "react";
import Wrapper from "./Common/Wrapper/Wrapper";
import axios from "axios";

export default function SelectLabels() {
  const [locationData, setLocationData] = useState<any[]>([]);
  const [processorData, setProcessorData] = useState<any[]>([]);
  const [gpuData, setgpuData] = useState<any[]>([]);
  const [ramData, setRamData] = useState<any[]>([]);
  const [storageTypeData, setStorageTypeData] = useState<any[]>([]);
  const [conditioneData, setConditioneData] = useState<any[]>([]);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  useEffect(() => {
    fetchProcessors();
    fetchLocations();
    fetchGPU()
    fetchRam()
    fetchStorgaeType()
    fetchConditions()
  }, []);

  const fetchLocations = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/location/getAll`
      );
      setLocationData(response?.data?.data || []);
    } catch (err) {
      console.error("Failed to fetch locations.");
    }
  };
  const fetchGPU = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/gpu/getAll`
      );
      setgpuData(response?.data?.data || []);
    } catch (err) {
      console.error("Failed to fetch locations.");
    }
  };
  const fetchRam = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/ram/getAll`
      );
      setRamData(response?.data?.data || []);
    } catch (err) {
      console.error("Failed to fetch locations.");
    }
  };
  const fetchConditions = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/conditions/getAll`
      );
      setConditioneData(response?.data?.data || []);
    } catch (err) {
      console.error("Failed to fetch locations.");
    }
  };
  const fetchStorgaeType = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/storage/getStorageType`
      );
      setStorageTypeData(response?.data?.data || []);
    } catch (err) {
      console.error("Failed to fetch locations.");
    }
  };

  const fetchProcessors = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/processor/getProcessor`
      );
      setProcessorData(response?.data?.data || []);
    } catch (err) {
      console.error("Failed to fetch processors.");
    }
  };

  const dropdownOptions = [
    {
      label: "Processor",
      options:
        processorData.length > 0
          ? processorData.map((e) => e.name)
          : ["Intel", "AMD"],
    },
    {
      label: "Gpu",
      options: 
      gpuData.length > 0
      ? gpuData.map((e) => e.name)
      : ["NVIDIA", "AMD",],
    },
    {
      label: "RAM",
      options:  ramData.length > 0
      ? ramData.map((e) => e.name)
      : ["4GB", "8GB", "16G"],
    },
    {
      label: "Storage",
      options: storageTypeData.length > 0
      ? storageTypeData.map((e) => e.name)
      :["SSD", "HDD"],
    },
    {
      label: "Price Range",
      options: [
        "Below 500 AED",
        "500 - 1000 AED",
        "1000 - 3000 AED",
        "3000 - 5000 AED",
        "5000+ AED",
      ],
    },
    {
      label: "Condition",
      options: conditioneData.length > 0
      ? conditioneData.map((e) => e.name)
      :["New", "Used",],
    },
    {
      label: "Location",
      options:
        locationData.length > 0
          ? locationData.map((e) => e.name).sort((a, b) => a.localeCompare(b))
          : ["All UAE"],
    },
    {
      label: "Sort By",
      options: ["Newest", "Price (Low to High)", "Most Popular"],
    },
  ];

  useEffect(() => {
    setSelectedValues(dropdownOptions.map(() => ""));
  }, [processorData, locationData]);

  const handleChange = (index: number, event: any) => {
    const updatedValues = [...selectedValues];
    updatedValues[index] = event.target.value;
    setSelectedValues(updatedValues);
  };

  const handleReset = () => {
    setSelectedValues(dropdownOptions.map(() => ""));
  };

  return (
    <Wrapper>
      <div className="flex max-sm:flex-col w-[100%] bg-white h-max p-1 rounded bg-w justify-center items-center">
        <div className="flex flex-wrap max-sm:flex-col max-sm:mb-2 justify-center  lg:justify-around xl:justify-around mb-1 max-lg:gap-4 lg:gap-4 w-[100%] h-max items-center">
          {dropdownOptions.map((dropdown, index) => (
            <div key={index} className="flex items-center  gap-2">
              <Select
                value={selectedValues[index] || ""}
                onChange={(event) => handleChange(index, event)}
                displayEmpty
                inputProps={{ "aria-label": dropdown.label }}
                // className="lg:w-[105px] h-12 mt-2 max-sm:w-[360px] sm:w-[102px] md:w-[65px] border border-searchFilterBorder"
                className="w-[105px]"
                sx={{
                  borderRadius: "50px",
                  fontFamily: "Urbanist",
                  fontWeight: "600",
                  fontSize: "13px",
                  ".MuiSelect-icon": { color: "#6345ed" },
                }}
              >
                <MenuItem value="" disabled>
                  {dropdown.label}
                </MenuItem>
                {dropdown.options.map((option, id) => (
                  <MenuItem key={id} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </div>
          ))}
        </div>

        {/* Reset Filters Button */}
        <button
          className="bg-gray-300 lg:w-[100=px] md:w-[80px] max-sm:w-40 sm:w-[80px] h-[40px] lg:h-12 rounded-full flex justify-center items-center md:text-base font-medium text-black"
          onClick={handleReset}
        >
          Reset
        </button>

        {/* Filter Button */}
        <div className="bg-custom-gradient lg:w-[150px] md:w-[100px] md:ml-2 max-sm:w-60 sm:w-[80px] h-[40px] lg:h-12 rounded-full flex justify-center items-center md:text-base font-medium text-white">
          🔍 Filter
        </div>
      </div>
    </Wrapper>
  );
}
