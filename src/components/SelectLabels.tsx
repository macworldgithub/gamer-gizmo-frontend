"use client";

import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useEffect, useState } from "react";
import Wrapper from "./Common/Wrapper/Wrapper";

export default function SelectLabels() {
  const dropdownOptions = [
    { label: "Processor", options: ["mouse", "keyboard"] },
    { label: "New Items", options: ["lorem", "used items"] },
    { label: "Model", options: ["Gaming", "Electronics"] },
    { label: "Price Range", options: ["Low to High", "High to Low"] },
    { label: "Location", options: ["lahore", "karachi"] },
  ];

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
      <div className="flex max-md:flex-col w-[100%]  max-md:flex-wrap max-xl:flex-wrap h-max p-2 rounded bg-white justify-center items-center">
        <div className="flex max-lg:flex-col max-sm:mb-2  justify-center mb-1 gap-8 max-md:gap-5 w-[100%]  h-max flex-wrap  items-center ">
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
                className="w-[180px] h-12 mt-2 max-sm:w-[245px] max-md:w-[360px] max-lg:w-[550px]  border border-searchFilterBorder"
                sx={{
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {},
                  borderRadius: "50px",
                  fontFamily: "Urbanist",
                  fontWeight: "600",
                  ".MuiSelect-icon": {
                    color: "#6345ed", // Change the arrow color here
                  },
                }}
              >
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

        <div className="bg-custom-gradient  w-[180px] max-md:w-60 h-[40px] lg:h-12  rounded-full  flex justify-center items-center md:text-base font-medium text-white">
          Filter
        </div>
      </div>
    </Wrapper>
  );
}
