"use client";

import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useEffect, useState } from "react";
import Wrapper from "./Common/Wrapper/Wrapper";

export default function SelectLabels() {
  const dropdownOptions = [
    { label: "Processor", options: ["lorem", "lorem"] },
    { label: "New Items", options: ["lorem", "lorem"] },
    { label: "Model", options: ["Gaming", "Electronics"] },
    { label: "Price Range", options: ["Low to High", "High to Low"] },
    { label: "Location", options: ["lorem", "lorem"] },
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
      <div className="flex flex-wrap bg-white py-5 justify-center md:justify-around rounded-md px-4 mt-5 gap-4 md:gap-6">
        {dropdownOptions.map((dropdown, index) => (
          <div
            key={index}
            className="w-28 max-md:w-60 h-10 text-xs max-md:mx-5 max-md:my-[0.3rem] bg-white rounded-full flex justify-center items-center relative"
          >
            <FormControl
              sx={{
                m: 1,
                minWidth: 120,
                width: "100%",
              }}
            >
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
                sx={{
                  width: "100%",
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "black",
                    border: "1px solid grey",
                  },
                  borderRadius: "50px",
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
            </FormControl>
          </div>
        ))}
        <div className="bg-custom-gradient w-28 max-md:w-60 h-10 lg:h-12 max-md:mx-5 rounded-full md:p-1.5 flex justify-center items-center md:text-base font-medium text-white">
          Filter
        </div>
      </div>
    </Wrapper>
  );
}
