"use client";
import React, { useState } from "react";
import { Select, MenuItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../components/Store/Store";
import { setAdField } from "../../components/Store/Slicer/SellForMeSlice";

const PartsInformation = () => {
  const Ad = useSelector((state: RootState) => state.SellForMe);
  const dispatch = useDispatch();

  const attributes = [
    { name: "processorVariant", label: "Processor Variant", options: ["i3", "i5", "i7", "i9", "Ryzen 5", "Ryzen 7"] },
    { name: "processor", label: "Processor", options: ["Intel", "AMD"] },
    { name: "ram", label: "RAM", options: ["4GB", "8GB", "16GB", "32GB"] },
    { name: "storageType", label: "Storage Type", options: ["HDD", "SSD", "NVMe"] },
    { name: "storage", label: "Storage", options: ["128GB", "256GB", "512GB", "1TB"] },
    { name: "gpu", label: "GPU", options: ["NVIDIA", "AMD", "Integrated"] },
    { name: "brand", label: "Brand", options: ["Dell", "HP", "Lenovo", "Asus", "Acer"] },
    { name: "model", label: "Model", options: ["Inspiron", "Pavilion", "ThinkPad", "ROG", "Aspire"] },
    { name: "location", label: "Location", options: ["Karachi", "Lahore", "Islamabad", "Peshawar"] },
    { name: "screenSize", label: "Screen Size", options: ["13 inch", "15 inch", "17 inch"] },
    { name: "screenResolution", label: "Screen Resolution", options: ["HD", "Full HD", "4K"] },
    { name: "weight", label: "Weight", options: ["1kg", "1.5kg", "2kg"] },
    { name: "graphics", label: "Graphics", options: ["Integrated", "Dedicated"] },
    { name: "ports", label: "Ports", options: ["USB-C", "HDMI", "Ethernet"] },
    { name: "batteryLife", label: "Battery Life", options: ["4 hours", "6 hours", "8 hours"] },
    { name: "color", label: "Color", options: ["Black", "Silver", "Blue"] },
    { name: "price", label: "Price", options: ["$500", "$1000", "$1500", "$2000"] },
    { name: "quantity", label: "Quantity", options: ["1", "2", "3", "4", "5"] },
  ];

  const handleChange = (value: string, name: string) => {
    dispatch(setAdField({ field: name, value }));
  };

  return (
    <div className="w-full py-5 grid grid-cols-1 lg:grid-cols-2 gap-4">
      {attributes.map((attr) => (
        <div key={attr.name} className="w-full">
          <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
            {attr.label}
          </label>
          <Select
            value={Ad[attr.name] || ""}
            onChange={(e) => handleChange(e.target.value, attr.name)}
            fullWidth
            className="dark:text-white bg-white dark:bg-black"
            sx={{
              ".MuiOutlinedInput-notchedOutline": { borderColor: "#6345ED" },
              "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#E14FFB" },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#6345ED" },
            }}
            MenuProps={{
              PaperProps: {
                style: { maxHeight: 200, overflowY: "auto" },
              },
            }}
          >
            {attr.options.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </div>
      ))}
    </div>
  );
};

export default PartsInformation;
