"use client";
import React, { useEffect } from "react";
import { Select, MenuItem, Input, OutlinedInput } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { setAdField } from "../../components/Store/Slicer/SellForMeSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../components/Store/Store";

const PartsInfromation = () => {
  const Ad = useSelector((state: RootState) => state.SellForMe);
  const dispatch = useDispatch();
  const [openStates, setOpenStates] = useState(
    Array(7).fill(false) // Initialize an array for each Select component's state
  );

  const handleOpen = (index: any) => {
    setOpenStates((prev) => prev.map((open, i) => (i === index ? true : open)));
  };

  const handleClose = (index: any) => {
    setOpenStates((prev) =>
      prev.map((open, i) => (i === index ? false : open))
    );
  };

  useEffect(() => {
    console.log(Ad, "holdon");
  }, [Ad]);

  const selectData = [
    {
      id: 2,
      name: "pcInfo",
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
      name: "graphicCard",

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
      name: "ram",

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
      name: "storage",

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
      id: 7,
      name: "motherboard",

      options: [
        { value: 67, label: "Morning" },
        { value: 68, label: "Night" },
        { value: 69, label: "Afternoon" },
        { value: 70, label: "Evening" },
        { value: 71, label: "Dawn" },
        { value: 72, label: "Dusk" },
        { value: 73, label: "Midnight" },
        { value: 74, label: "Noon" },
        { value: 75, label: "Sunrise" },
        { value: 76, label: "Sunset" },
        { value: 77, label: "Twilight" },
      ],
    },

    {
      id: 8,
      name: "country",

      options: [
        { value: 77, label: "Germany" },
        { value: 78, label: "Canada" },
        { value: 79, label: "France" },
        { value: 80, label: "Japan" },
        { value: 81, label: "China" },
        { value: 82, label: "Italy" },
        { value: 83, label: "Spain" },
        { value: 84, label: "Brazil" },
        { value: 85, label: "India" },
        { value: 86, label: "Australia" },
        { value: 87, label: "Nigeria" },
      ],
    },

    {
      id: 9,
      name: "city",

      options: [
        { value: 87, label: "Paris" },
        { value: 88, label: "Tokyo" },
        { value: 89, label: "Berlin" },
        { value: 90, label: "New York" },
        { value: 91, label: "Los Angeles" },
        { value: 92, label: "London" },
        { value: 93, label: "Sydney" },
        { value: 94, label: "Toronto" },
        { value: 95, label: "Rio de Janeiro" },
        { value: 96, label: "Mumbai" },
        { value: 97, label: "Dubai" },
      ],
    },
  ];

  const handleChange = (value: string, name: string) => {
    dispatch(setAdField({ field: name, value: value }));
  };

  return (
    <div className="w-[100%] max-sm:w-[50%] py-5 gap-2 h-max flex flex-col ">
      {selectData.map((select: any, index: any) => (
        <span className="flex " key={select.id}>
          <Select
            open={openStates[index]}
            onOpen={() => handleOpen(index)}
            onClose={() => handleClose(index)}
            disabled={
              select.name === "city"
                ? Ad.country.length > 0
                  ? false
                  : true
                : false
            }
            //@ts-ignore
            value={Ad[`${select.name}`]} // Bind selected value to the state
            onChange={(e) => handleChange(e.target.value, select.name)}
            fullWidth
            className=" dark:text-white"
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
      <span className="flex flex-col gap-2">
        <input
          value={Ad.address}
          onChange={(e) => handleChange(e.target.value, "address")}
          className="p-4 rounded dark:bg-black w-full font-bold text-black dark:text-white border border-customPurpleBorder hover:border-[#E14FFB] focus:outline-none"
        />
        <input
          value={Ad.name}
          onChange={(e) => handleChange(e.target.value, "name")}
          className="p-4 rounded  dark:bg-black w-[100%] font-bold text-black dark:text-white border border-customPurpleBorder hover:border-[#E14FFB] focus:outline-none"
        />
        <input
          value={Ad.mobileNumber}
          onChange={(e) => handleChange(e.target.value, "mobileNumber")}
          className="p-4 rounded  dark:bg-black w-[100%] font-bold text-black dark:text-white border border-customPurpleBorder hover:border-[#E14FFB] focus:outline-none"
        />
      </span>
    </div>
  );
};

export default PartsInfromation;
