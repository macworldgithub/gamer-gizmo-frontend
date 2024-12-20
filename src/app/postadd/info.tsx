"use client";
import React, { useEffect } from "react";
import { Select, MenuItem } from "@mui/material";
import { useState } from "react";

const PartsInfromation = () => {
  const [openStates, setOpenStates] = useState(
    Array(5).fill(false) // Initialize an array for each Select component's state
  );

  const handleOpen = (index: any) => {
    setOpenStates((prev) => prev.map((open, i) => (i === index ? true : open)));
  };

  const handleClose = (index: any) => {
    setOpenStates((prev) =>
      prev.map((open, i) => (i === index ? false : open))
    );
  };

  const selectData = [
    {
      id: 2,
      options: [
        { value: 12, label: "Cat" },
        { value: 13, label: "Dog" },
        { value: 14, label: "Elephant" },
        { value: 15, label: "Fox" },
        { value: 16, label: "Giraffe" },
        { value: 17, label: "Horse" },
        { value: 18, label: "Iguana" },
        { value: 19, label: "Jaguar" },
        { value: 20, label: "Kangaroo" },
        { value: 21, label: "Lion" },
        { value: 22, label: "Monkey" },
      ],
    },
    {
      id: 3,
      options: [
        { value: 23, label: "Earth" },
        { value: 24, label: "Mars" },
        { value: 25, label: "Jupiter" },
        { value: 26, label: "Saturn" },
        { value: 27, label: "Uranus" },
        { value: 28, label: "Neptune" },
        { value: 29, label: "Venus" },
        { value: 30, label: "Mercury" },
        { value: 31, label: "Pluto" },
        { value: 32, label: "Moon" },
        { value: 33, label: "Sun" },
      ],
    },
    {
      id: 4,
      options: [
        { value: 34, label: "Red" },
        { value: 35, label: "Blue" },
        { value: 36, label: "Green" },
        { value: 37, label: "Yellow" },
        { value: 38, label: "Pink" },
        { value: 39, label: "Purple" },
        { value: 40, label: "Orange" },
        { value: 41, label: "Brown" },
        { value: 42, label: "Black" },
        { value: 43, label: "White" },
        { value: 44, label: "Gray" },
      ],
    },
    {
      id: 5,
      options: [
        { value: 45, label: "One" },
        { value: 46, label: "Two" },
        { value: 47, label: "Three" },
        { value: 48, label: "Four" },
        { value: 49, label: "Five" },
        { value: 50, label: "Six" },
        { value: 51, label: "Seven" },
        { value: 52, label: "Eight" },
        { value: 53, label: "Nine" },
        { value: 54, label: "Ten" },
        { value: 55, label: "Eleven" },
      ],
    },
    {
      id: 6,
      options: [
        { value: 56, label: "Morning" },
        { value: 57, label: "Night" },
        { value: 58, label: "Afternoon" },
        { value: 59, label: "Evening" },
        { value: 60, label: "Dawn" },
        { value: 61, label: "Dusk" },
        { value: 62, label: "Midnight" },
        { value: 63, label: "Noon" },
        { value: 64, label: "Sunrise" },
        { value: 65, label: "Sunset" },
        { value: 66, label: "Twilight" },
      ],
    },
  ];

  const [selectedValues, setSelectedValues] = useState<string[]>(
    Array(5).fill("") // Initialize an array to store selected values
  );

  useEffect(() => {
    console.log("check", selectedValues);
  }, [selectedValues]);

  const handleChange = (index: number, value: string) => {
    setSelectedValues((prev) => {
      const updatedValues = [...prev];
      updatedValues[index] = value;
      return updatedValues;
    });
  };

  return (
    <div className="w-[100%] max-sm:w-[50%] py-5 gap-2 h-max flex flex-col">
      {selectData.map((select: any, index: any) => (
        <span className="flex" key={select.id}>
          <Select
            open={openStates[index]}
            onOpen={() => handleOpen(index)}
            onClose={() => handleClose(index)}
            value={selectedValues[index]} // Bind selected value to the state
            onChange={(e) => handleChange(index, e.target.value)}
            fullWidth
            sx={{
              color: "black",
              fontWeight: "600",
              border: "yellow",
              ".MuiOutlinedInput-notchedOutline": {
                borderColor: "#6345ED", // Default border color
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#E14FFB", // Border color on hover
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#6345ED", // Border color when focused
              },
            }}
            MenuProps={{
              PaperProps: {
                onMouseLeave: () => handleClose(index),
                style: {
                  maxHeight: 200, // Set the height of the dropdown
                  overflowY: "auto", // Enable scrolling if options exceed this height
                },
              },
              disableScrollLock: true,
              closeAfterTransition: true,

              autoFocus: false,
            }}
          >
            {select.options.map((option: any) => (
              <MenuItem
                key={option.value}
                value={option.label}
                sx={{
                  fontWeight: "600",
                  height: "50px",
                  "&.Mui-selected": {
                    backgroundColor: "#6345ED !important",
                    color: "white",
                  },
                  "&:hover": {
                    transition: "all 0.5s ease",
                    backgroundColor: "rgba(225, 79, 251, 0.1)",

                    color: "black",
                  },
                }}
              >
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </span>
      ))}
      <span className="">
        <textarea className="p-2 rounded  h-[10rem] dark:bg-black w-[100%] font-bold text-black dark:text-white border border-customPurpleBorder hover:border-[#E14FFB] focus:outline-none" />
      </span>
    </div>
  );
};

export default PartsInfromation;
