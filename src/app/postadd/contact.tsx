"use client";
import React, { useEffect } from "react";
import { Select, MenuItem, Input, OutlinedInput, Box } from "@mui/material";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../Store/Store";
import { setAdField } from "../Redux/AddSlice";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

const ContactInformation = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark" ? true : false
  );

  useEffect(() => {
    const handleStorageChange = () => {
      if (localStorage.getItem("theme") === "dark") {
        setDarkMode(true);
      } else {
        setDarkMode(false);
      }
    };

    window.addEventListener("storage", handleStorageChange);
  }, []);

  const dispatch = useDispatch();
  const { city, mobileNumber, secondaryNumber } = useSelector(
    (state: RootState) => state.Ad
  );

  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setAdField({ field: "city", value: event.target.value }));
  };

  const digitOnlyRegex = /^\d*$/;

  const handleMobileNumberChange = (value: string | undefined) => {
    if (value) {
      dispatch(setAdField({ field: "mobileNumber", value }));
    } else {
      console.log("Invalid phone number");
    }
  };

  const handleSecondaryMobileNumberChange = (value: string | undefined) => {
    if (value) {
      dispatch(setAdField({ field: "secondaryNumber", value }));
    } else {
      console.log("Invalid phone number");
    }
  };

  const cities = [
    "New York",
    "London",
    "Tokyo",
    "Paris",
    "Berlin",
    "Dubai",
    "Sydney",
    "Mumbai",
  ];

  useEffect(() => {
    console.log(city, mobileNumber, secondaryNumber, "hehe");
  }, [city, mobileNumber, secondaryNumber]);

  return (
    <div className="w-[65%] h-max shadow-combinedNight border rounded py-5 px-[5%] box-border my-10 flex flex-col ">
      <h1 className="text-[1.5rem] font-semibold mb-2">Upload Photos </h1>
      <div className="flex">
        <div className="py-5  h-max w-max text-nowrap flex flex-col items-end gap-4 max-sm:w-[32%] max-sm:text-wrap  mt-1 pr-1 max-sm:items-start">
          <p className="h-[50px] ">City *</p>
          <p className="h-[50px]">Mobile Number *</p>
          <p className="h-[50px] ">Secondary Number</p>
        </div>
        <div className="w-[100%] max-sm:w-[100%] py-5 gap-2 max-sm:gap-4 h-max flex flex-col px-3">
          <Select
            value={city}
            //@ts-ignore
            onChange={(e) => handleCityChange(e)}
            fullWidth
            className=" dark:text-white"
            sx={{
              color: "black",
              fontWeight: "600",
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
            {cities.map((city, index) => (
              <MenuItem
                key={index}
                value={city}
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
                {city}
              </MenuItem>
            ))}
          </Select>

          <Box
            sx={{
              // Target PhoneInput's internal input with the class "PhoneInputInput"
              "& .PhoneInputInput": {
                // Basic text styles
                color: darkMode ? "white" : "black",
                fontWeight: 600,

                // Outlined border style
                border: "1px solid #6345ED",
                borderRadius: "4px",
                padding: "10px",
                width: "100%",
                background: darkMode ? "#000" : "#fff",

                // Remove default outline
                outline: "none",

                // Hover
                "&:hover": {
                  borderColor: "#E14FFB",
                },

                // Focus
                "&:focus": {
                  borderColor: "#6345ED",
                },
              },

              "& .PhoneInputCountrySelect": {
                display: "none",
              },

              "& .PhoneInputCountrySelectArrow": {
                display: "none",
              },

              // Optionally style the country select dropdown or its icons
              "& .PhoneInputCountry": {
                marginRight: "8px",
              },
            }}
          >
            <PhoneInput
              placeholder="Enter phone number"
              value={mobileNumber}
              onChange={handleMobileNumberChange}
            />
          </Box>

          <Box
            sx={{
              // Target PhoneInput's internal input with the class "PhoneInputInput"
              "& .PhoneInputInput": {
                // Basic text styles
                color: darkMode ? "white" : "black",
                fontWeight: 600,

                // Outlined border style
                border: "1px solid #6345ED",
                borderRadius: "4px",
                padding: "10px",
                width: "100%",
                background: darkMode ? "#000" : "#fff",

                // Remove default outline
                outline: "none",

                // Hover
                "&:hover": {
                  borderColor: "#E14FFB",
                },

                // Focus
                "&:focus": {
                  borderColor: "#6345ED",
                },
              },

              "& .PhoneInputCountrySelect": {
                display: "none",
              },

              "& .PhoneInputCountrySelectArrow": {
                display: "none",
              },

              // Optionally style the country select dropdown or its icons
              "& .PhoneInputCountry": {
                marginRight: "8px",
              },
            }}
          >
            <PhoneInput
              placeholder="Enter phone number"
              value={secondaryNumber}
              onChange={handleSecondaryMobileNumberChange}
              className="my-phone-input"
            />
          </Box>
        </div>
      </div>
    </div>
  );
};

export default ContactInformation;
