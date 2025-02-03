import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";

const PriceComponent = ({ price, setPrice, quantity, setQuantity }: any) => {
  const inputStyles = {
    "& .MuiOutlinedInput-root": {
      "& fieldset": { borderColor: "#ccc" }, // Default border
      "&:hover fieldset": { borderColor: "#dc39fc" }, // Hover effect
      "&.Mui-focused fieldset": { borderColor: "#dc39fc" }, // Focus effect
    },

    "& .MuiInputLabel-root": {
      color: "#dc39fc", // Label color when focused
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#dc39fc", // Label color when focused (purple)
    },
  };

  return (
    <div className="flex flex-col space-y-4">
      <TextField
        sx={inputStyles}
        label="Price (AED)"
        variant="outlined"
        type="number"
        fullWidth
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <TextField
        sx={inputStyles}
        label="Quantity"
        variant="outlined"
        type="number"
        fullWidth
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
    </div>
  );
};

export default PriceComponent;
