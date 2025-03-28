"use client";

import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useEffect, useState } from "react";
import Wrapper from "./Common/Wrapper/Wrapper";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function SelectLabels({ query, route }: any) {
  const [locationData, setLocationData] = useState<any[]>([]);
  const [processorData, setProcessorData] = useState<any[]>([]);
  const [gpuData, setgpuData] = useState<any[]>([]);
  const [ramData, setRamData] = useState<any[]>([]);
  const [storageTypeData, setStorageTypeData] = useState<any[]>([]);
  const [conditioneData, setConditioneData] = useState<any[]>([]);
  const [selectedValues, setSelectedValues] = useState(
    query
      ? query
      : {
          processor: "",
          storage: "",
          location: "",
          condition: "",
          gpu: "",
          ram: "",
          price: "",
        }
  );
  const router = useRouter();
  useEffect(() => {
    setSelectedValues((prev: any) => ({ ...prev, ...query }));
  }, [query]);
  useEffect(() => {
    fetchProcessors();
    fetchLocations();
    fetchGPU();
    fetchRam();
    fetchStorgaeType();
    fetchConditions();
  }, []);
  console.log(selectedValues, "queryParams22");
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
      label: "PROCESSOR",
      key: "processor",
      options: processorData.length > 0 ? processorData : ["Intel", "AMD"],
    },
    {
      label: "GPU",
      key: "gpu",
      options: gpuData.length > 0 ? gpuData : ["NVIDIA", "AMD"],
    },
    {
      label: "RAM",
      key: "ram",
      options: ramData.length > 0 ? ramData : ["4GB", "8GB", "16G"],
    },
    {
      label: "STORAGE",
      key: "storage",
      options: storageTypeData.length > 0 ? storageTypeData : ["SSD", "HDD"],
    },

    {
      label: "CONDITION",
      key: "condition",
      options: conditioneData.length > 0 ? conditioneData : ["New", "Used"],
    },
    {
      label: "LOCATION",
      key: "location",
      options: locationData.length > 0 ? locationData : ["All UAE"],
    },
    {
      label: "PRICE RANGE",
      key: "price",
      options: [
        { id: 1, name: "Below 500 AED" },
        { id: 2, name: "500 - 1000 AED" },
        { id: 3, name: "1000 - 3000 AED" },
        { id: 4, name: "3000 - 5000 AED" },
        { id: 5, name: "5000+ AED" },
      ],
    },
    // {
    //   label: "Sort By",
    //   key: "sort",
    //   options: ["Newest", "Price (Low to High)", "Most Popular"],
    // },
  ];
  const handleClick = () => {
    // Convert the selectedValues object to query parameters
    const filteredValues = Object.fromEntries(
      Object.entries(selectedValues).filter(([key, value]) => value !== "")
    );
    // @ts-expect-error
    const queryParams = new URLSearchParams(filteredValues).toString();
    router.push(`/${route}?${queryParams}`);
  };

  // useEffect(() => {
  //   setSelectedValues(dropdownOptions.map(() => ""));
  // }, [processorData, locationData]);

  const handleChange = (field: string, value: any) => {
    // @ts-expect-error
    setSelectedValues((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleReset = () => {
    setSelectedValues(dropdownOptions.map(() => ""));
  };

  return (
    <Wrapper>
      <div className="max-md:hidden flex max-sm:flex-col w-[100%] bg-white  h-max p-1 rounded bg-w justify-center items-center">
        <div className="flex flex-wrap max-sm:mb-2 justify-center  lg:justify-around xl:justify-around mb-1 max-lg:gap-4 lg:gap-4 w-[100%] h-max items-center">
          {dropdownOptions.map((dropdown, index) => (
            <div key={index} className="flex items-center  gap-2">
              <Select
                value={selectedValues[dropdown.key] || ""}
                onChange={(event) =>
                  handleChange(dropdown.key, event.target.value)
                }
                displayEmpty
                inputProps={{ "aria-label": dropdown.label }}
                // className="lg:w-[105px] h-12 mt-2 max-sm:w-[360px] sm:w-[102px] md:w-[65px] border border-searchFilterBorder"
                className="w-[105px]"
                sx={{
                  overflow: "hidden",
                  borderRadius: "50px",
                  fontFamily: "Urbanist",
                  fontWeight: "600",
                  fontSize: "12px",
                  ".MuiSelect-icon": { color: "#6345ed" },
                }}
                MenuProps={{
                  autoFocus: false,
                  disablePortal: true,
                  disableAutoFocus: true,
                  disableScrollLock: true,
                }}
              >
                <MenuItem value="" disabled>
                  {dropdown.label}
                </MenuItem>
                {dropdown.options.map((option, id) => (
                  <MenuItem key={id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </Select>
            </div>
          ))}
          <button
            className="bg-gray-300 lg:w-[100px] md:w-[80px] max-sm:w-[100px] sm:w-[100px] h-[40px] lg:h-12 rounded-full flex justify-center items-center md:text-base font-medium text-black"
            onClick={handleReset}
          >
            Reset
          </button>
          <div
            onClick={() => handleClick()}
            className="bg-custom-gradient cursor-pointer lg:w-[150px] md:w-[100px]  max-sm:w-[100px] sm:w-[100px] h-[40px] lg:h-12 rounded-full flex justify-center items-center md:text-base font-medium text-white"
          >
            🔍 Filter
          </div>
        </div>

        {/* Reset Filters Button */}

        {/* Filter Button */}
      </div>
    </Wrapper>
  );
}
