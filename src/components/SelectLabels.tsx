"use client";

import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useEffect, useState } from "react";
import Wrapper from "./Common/Wrapper/Wrapper";
import axios from "axios";

export default function SelectLabels() {
    const [locationData, setLocationData] = useState<any[]>([]);
        const [processorData, setProcessorData] = useState<any>([]);
  
  const fetchLocations = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/location/getAll`
      );

      setLocationData(response?.data?.data || []);
    } catch (err) {
      console.error("Failed to fetch models.");
    }
  };
  // const fetchCategories = async () => {
  //   try {
  //     const response = await axios.get(
  //       `${process.env.NEXT_PUBLIC_API_BASE_URL}/location/getAll`
  //     );

  //     setLocationData(response?.data?.data || []);
  //   } catch (err) {
  //     console.error("Failed to fetch models.");
  //   }
  // };
  const fetchProcessors = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/processor/getProcessor`
      );

      setProcessorData(response?.data?.data || []);
    } catch (err) {
      console.error("Failed to fetch models.");
    }
  };
  useEffect(() => {
    fetchProcessors()
    fetchLocations();
    // fetchCategories()
  }, []);

  const dropdownOptions = [
    {
      label: "Processor",
      // @ts-expect-error
      options: processorData&&processorData.length>0?processorData.map(e=>e.name) : ["Core i3"],
    },
    { label: "Condition", options: ["New", "Used"] },
    // { label: "Model", options: ["Gaming", "Electronics"] },
    {
      label: "Price Range",
      options: ["Below 500 AED", "AED 500-AED 1000", "AED 1000-AED 1500"],
    },
    {
      label: "Location",
      options: locationData&&locationData.length>0?locationData.map(e=>e.name).sort((a, b) => a.localeCompare(b)): ["Sharjah"],
    },
  ];
  console.log(locationData.map(e=>e.name),"pak")

  const [selectedValues, setSelectedValues] = useState(
    dropdownOptions.map((dropdown) => dropdown.options[0])
  );

  const [dropdownStates, setDropdownStates] = useState(
    dropdownOptions.map(() => false)
  );

  useEffect(() => {
    const handleScroll = () => {
      if (dropdownStates.some((isOpen) => isOpen)) {
        setDropdownStates(dropdownStates.map(() => false));
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [dropdownStates]);

  //@ts-ignore
  const handleChange = (index, event) => {
    const updatedValues = selectedValues.map((value, i) =>
      i === index ? event.target.value : value
    );
    setSelectedValues(updatedValues);
  };

  const handleOpen = (index: any) => {
    setDropdownStates(dropdownStates.map((state, i) => i === index));
  };

  const handleClose = () => {
    setDropdownStates(dropdownStates.map(() => false));
  };

  return (
    <Wrapper>
      <div className="flex max-sm:flex-col w-[100%] bg-white h-max p-1 rounded bg-w justify-center items-center">
        <div className="flex max-sm:flex-col max-sm:mb-2 justify-center lg:justify-around xl:justify-around  mb-1 max-lg:gap-4 lg:gap-4 w-[100%]  h-max items-center ">
          {dropdownOptions.map((dropdown, index) => (
            <div key={index} className="flex justify-center items-center">
              <Select
                value={selectedValues[index]}
                onChange={(event) => handleChange(index, event)}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                open={dropdownStates[index]}
                onOpen={() => handleOpen(index)}
                onClose={handleClose}
                MenuProps={{
                  disableScrollLock: true,
                  PaperProps: {
                    sx: {
                      position: "absolute",
                      top: "100%",
                      marginTop: "17.5px",
                      borderLeftRadius: "25px",
                      borderBottomLeftRadius: "25px",
                      padding: "1px",
                      boxShadow: "none",
                      maxHeight: "200px",
                      overflowY: "auto",
                      "&::-webkit-scrollbar": {
                        width: "8px",
                      },
                      "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "purple",
                        borderRadius: "50px",
                      },
                      "&::-webkit-scrollbar-thumb:hover": {
                        backgroundColor: "#6a0dad",
                      },
                      "&::-webkit-scrollbar-track": {
                        backgroundColor: "#f0f0f0",
                      },
                    },
                  },
                }}
                className="lg:w-[150px] h-12 mt-2  max-sm:w-[360px] sm:w-[102px]  md:w-[120px] border border-searchFilterBorder"
                sx={{
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {},
                  borderRadius: "50px",
                  fontFamily: "Urbanist",
                  fontWeight: "600",
                  ".MuiSelect-icon": {
                    color: "#6345ed",
                  },
                }}
              >
                {/* @ts-expect-error */}
                {dropdown.options.map((option, id) => (
                  <MenuItem
                    key={id}
                    value={option}
                    sx={{
                      height: "50px",
                      "&.Mui-selected": {
                        backgroundColor: "white !important",
                      },
                      "&:hover": {
                        transition: "all 0.5s ease",
                        color: "#7d7d7d",
                      },
                    }}
                  >
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </div>
          ))}
        </div>

        <div className="bg-custom-gradient  lg:w-[150px] md:w-[100px] md:ml-2 max-sm:w-60 sm:w-[80px] h-[40px] lg:h-12  rounded-full  flex justify-center items-center md:text-base font-medium text-white">
          Filter
        </div>
      </div>
    </Wrapper>
  );
}
