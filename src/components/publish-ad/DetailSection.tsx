import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../Store/Store";

interface Model {
  id: number;
  name: string;
}

interface Brand {
  id: number;
  name: string;
}

const DetailSection = ({
  selectModel,
  formData,
  handleFormChange,
  setSelectedModel,
  selectBrand,
  selectCategory,
  setSelectedBrand,
  setSelectedLocation,
  selectedLocation,
  setComponentCategories,
  setSelectedCondition,
  conditioneData,
  selectedCondition,
}: any) => {
  const [models, setModels] = useState<Model[]>([]);
  const token = useSelector((state: RootState) => state.user.token);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [locationData, setLocationData] = useState<Brand[]>([]);

  const fetchBrands = async () => {
    if (!selectCategory) {
      console.log("No category selected. Skipping brand fetch.");
      return;
    }
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/brands/getAll?category=${selectCategory.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data && response.data.data) {
        setBrands(response.data.data);
        console.log(response.data.data, "lol");
      } else {
        console.log("No brands found in the response data.");
        setBrands([]);
      }
    } catch (err: any) {
      console.error(
        "Error fetching brands:",
        err.response?.data || err.message
      );
    }
  };

  const fetchComponentCategories = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/component-category/getAll`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response?.data) {
        setComponentCategories(response?.data?.data);
        console.log(response?.data?.data, "here is my data");
      } else {
        console.error("Unexpected API response structure:", response);
        throw new Error("Unexpected API response");
      }
    } catch (error) {
      console.error("Error occurred while fetching categories:", error);
    } finally {
      console.log("Fetch operation completed.");
    }
  };

  useEffect(() => {
    fetchBrands();
    fetchComponentCategories();
  }, [selectCategory, token]);

  const fetchModels = async () => {
    if (!selectBrand.id) {
      return;
    }
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/models/getAll?brand=${selectBrand.id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setModels(response?.data?.data || []);
    } catch (err) {
      console.error("Failed to fetch models.");
    }
  };

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
  useEffect(() => {
    fetchModels();
    fetchLocations();
  }, [selectBrand, token]);

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
    <div className="flex text-black flex-col space-y-4">
      <TextField
        sx={inputStyles}
        label="Title"
        variant="outlined"
        fullWidth
        value={formData.title || ""}
        onChange={(e) => handleFormChange("title", e.target.value)}
        className="sm:w-full max-sm:w-full" // Responsive width (full width for small screens)
      />
      <TextField
        sx={inputStyles}
        label="Description"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        value={formData.description || ""}
        onChange={(e) => handleFormChange("description", e.target.value)}
        className="sm:w-full max-sm:w-full" // Responsive width (full width for small screens)
      />
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth sx={inputStyles}>
          <InputLabel id="brand-select-label">Brand</InputLabel>
          <Select
            sx={inputStyles}
            labelId="brand-select-label"
            id="brand-select"
            value={selectBrand}
            label="Brand"
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="sm:w-full max-sm:w-full" // Responsive width
          >
            {brands.map((brand: any) => (
              <MenuItem key={brand.id} value={brand} style={{ color: "black" }}>
                {brand.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      {selectBrand.name && selectBrand.name == "Others" ? (
        <TextField
          sx={inputStyles}
          label="Other Brand Name"
          variant="outlined"
          fullWidth
          value={formData.otherBrandName || ""}
          onChange={(e) => handleFormChange("otherBrandName", e.target.value)}
          className="sm:w-full max-sm:w-full"
        />
      ) : (
        <Box sx={{ minWidth: 120 }}>
          <FormControl
            disabled={
              selectBrand.name && selectBrand.name != "Others" ? false : true
            }
            fullWidth
            sx={{
              ...inputStyles,
              "& .MuiInputLabel-root": {
                color: "#dc39fc" ,
              },
            }}
          >
            <InputLabel id="model-select-label"  shrink>Model</InputLabel>
            <Select
              labelId="model-select-label"
              id="model-select"
              label="Model"
              value={selectModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="sm:w-full max-sm:w-full" 
            >
              {models.map((model: any) => (
                <MenuItem
                  key={model.id}
                  value={model}
                  style={{ color: "black" }}
                >
                  {model.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      )}
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth sx={inputStyles}>
          <InputLabel id="condition-select-label">Condition</InputLabel>
          <Select
            labelId="condition-select-label"
            id="condition-select"
            value={selectedCondition}
            label="Condition"
            sx={inputStyles}
            onChange={(e) => setSelectedCondition(e.target.value)}
            className="sm:w-full max-sm:w-full" // Responsive width
          >
            {conditioneData.map((loc: any) => (
              <MenuItem key={loc.id} value={loc} style={{ color: "black" }}>
                {loc.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth sx={inputStyles}>
          <InputLabel id="location-select-label">Location</InputLabel>
          <Select
            labelId="location-select-label"
            id="location-select"
            value={selectedLocation}
            label="location"
            sx={inputStyles}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="sm:w-full max-sm:w-full"
          >
            {locationData
              .sort((a: any, b: any) => a.name.localeCompare(b.name))
              .map((loc: any) => (
                <MenuItem key={loc.id} value={loc} style={{ color: "black" }}>
                  {loc.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Box>
    </div>
  );
};

export default DetailSection;
