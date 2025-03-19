import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

const MoreSpecification = ({
  selectCategory,
  formData,
  handleFormChange,
  selectComponentCategory,
  setSelectedComponentCategory,
  componentCategories,
  setSelectedProcessorVariant,
  selectProcessorVariant,
  setSelectedProcessor,
  selectProcessor,
  gpuData,
  storageTypeData,
  ramData,
  storageData,
  selectGpu,
  setSelectedGpu,
  setSelectedRam,
  selectRam,
  selectStoarge,
  setSelectedStoarge,
  selectStorageType,
  setSelectedStorageType,
  handleSkip,
}: any) => {
  const [processorVariantData, setProcessorVariantData] = useState<any>([]);
  const [processorData, setProcessorData] = useState<any>([]);
  const hasShownToast = useRef(false);

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
      // Move label upward
    },
  };
  const fetchProcessorVariants = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/processor/getProcessorVariant`
      );

      setProcessorVariantData(response?.data?.data || []);
    } catch (err) {
      console.error("Failed to fetch models.");
    }
  };
  const fetchProcessor = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/processor/getProcessor?variant=${selectProcessorVariant.id}`
      );

      setProcessorData(response?.data?.data || []);
    } catch (err) {
      console.error("Failed to fetch models.");
    }
  };
  useEffect(() => {
    if (!hasShownToast.current) {
      toast.info(
        "You may skip the specifications by selecting the 'Skip Specifications' option if preferred."
      );
      hasShownToast.current = true;
    }

    fetchProcessorVariants();
  }, []);

  useEffect(() => {
    fetchProcessor();
  }, [selectProcessorVariant]);

  return (
    <div className="flex flex-col space-y-3">
      <div className="flex justify-end items-center ">
        <button
          type="button"
          onClick={handleSkip}
          className="bg-custom-gradient w-42 text-sm font-bold text-white px-4 py-2 rounded hover:bg-gray-300 "
        >
          Skip Specifications
        </button>
      </div>

      {/* Conditionally render additional fields based on the selected category */}
      {["Desktops", "Gaming PCs"].includes(selectCategory.name) && (
        <>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth sx={inputStyles}>
              <InputLabel id="pro-var-select-label">
                Processor Variant
              </InputLabel>
              <Select
                labelId="pro-var-select-label"
                id="pro-var-select"
                value={selectProcessorVariant}
                label="Processor Variant"
                sx={inputStyles}
                onChange={(e) => setSelectedProcessorVariant(e.target.value)}
                className="sm:w-full max-sm:w-full dark:text-white"
              >
                {processorVariantData.map((loc: any) => (
                  <MenuItem key={loc.id} value={loc} style={{ color: "black" }}>
                    {loc.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth sx={inputStyles}>
              <InputLabel id="pro-select-label">Processor</InputLabel>
              <Select
                labelId="pro-select-label"
                id="pro-select"
                value={selectProcessor}
                label="Processor"
                sx={inputStyles}
                onChange={(e) => setSelectedProcessor(e.target.value)}
                className="sm:w-full max-sm:w-full dark:text-white"
              >
                {processorData.map((loc: any) => (
                  <MenuItem key={loc.id} value={loc} style={{ color: "black" }}>
                    {loc.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth sx={inputStyles}>
              <InputLabel id="ram-select-label">RAM</InputLabel>
              <Select
                labelId="ram-select-label"
                id="ram-select"
                value={selectRam}
                label="RAM"
                sx={inputStyles}
                onChange={(e) => setSelectedRam(e.target.value)}
                className="sm:w-full max-sm:w-full dark:text-white"
              >
                {ramData.map((loc: any) => (
                  <MenuItem key={loc.id} value={loc} style={{ color: "black" }}>
                    {loc.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth sx={inputStyles}>
              <InputLabel id="st-select-label">Storage Type</InputLabel>
              <Select
                labelId="st-select-label"
                id="st-select"
                value={selectStorageType}
                label="Storage Type"
                sx={inputStyles}
                onChange={(e) => setSelectedStorageType(e.target.value)}
                className="sm:w-full max-sm:w-full dark:text-white"
              >
                {storageTypeData.map((loc: any) => (
                  <MenuItem key={loc.id} value={loc} style={{ color: "black" }}>
                    {loc.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth sx={inputStyles}>
              <InputLabel id="s-select-label">Storage</InputLabel>
              <Select
                labelId="s-select-label"
                id="s-select"
                value={selectStoarge}
                label="Storage"
                sx={inputStyles}
                onChange={(e) => setSelectedStoarge(e.target.value)}
                className="sm:w-full max-sm:w-full dark:text-white"
              >
                {storageData.map((loc: any) => (
                  <MenuItem key={loc.id} value={loc} style={{ color: "black" }}>
                    {loc.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth sx={inputStyles}>
              <InputLabel id="G-select-label">GPU</InputLabel>
              <Select
                labelId="G-select-label"
                id="G-select"
                value={selectGpu}
                label="GPU"
                sx={inputStyles}
                onChange={(e) => setSelectedGpu(e.target.value)}
                className="sm:w-full max-sm:w-full dark:text-white"
              >
                {gpuData.map((loc: any) => (
                  <MenuItem key={loc.id} value={loc} style={{ color: "black" }}>
                    {loc.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <TextField
            sx={inputStyles}
            label="Graphics"
            variant="outlined"
            fullWidth
            value={formData.graphics || ""}
            onChange={(e) => handleFormChange("graphics", e.target.value)}
          />
          <TextField
            sx={inputStyles}
            label="Ports"
            variant="outlined"
            fullWidth
            value={formData.ports || ""}
            onChange={(e) => handleFormChange("ports", e.target.value)}
          />
        </>
      )}
      {["Laptops"].includes(selectCategory.name) && (
        <>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth sx={inputStyles}>
              <InputLabel id="pro-var-select-label">
                Processor Variant
              </InputLabel>
              <Select
                labelId="pro-var-select-label"
                id="pro-var-select"
                value={selectProcessorVariant}
                label="Processor Variant"
                sx={inputStyles}
                onChange={(e) => setSelectedProcessorVariant(e.target.value)}
                className="sm:w-full max-sm:w-full dark:text-white"
              >
                {processorVariantData.map((loc: any) => (
                  <MenuItem key={loc.id} value={loc} style={{ color: "black" }}>
                    {loc.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth sx={inputStyles}>
              <InputLabel id="pro-select-label">Processor</InputLabel>
              <Select
                labelId="pro-select-label"
                id="pro-select"
                value={selectProcessor}
                label="Processor"
                sx={inputStyles}
                onChange={(e) => setSelectedProcessor(e.target.value)}
                className="sm:w-full max-sm:w-full dark:text-white"
              >
                {processorData.map((loc: any) => (
                  <MenuItem key={loc.id} value={loc} style={{ color: "black" }}>
                    {loc.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth sx={inputStyles}>
              <InputLabel id="ram-select-label">RAM</InputLabel>
              <Select
                labelId="ram-select-label"
                id="ram-select"
                value={selectRam}
                label="RAM"
                sx={inputStyles}
                onChange={(e) => setSelectedRam(e.target.value)}
                className="sm:w-full max-sm:w-full dark:text-white"
              >
                {ramData.map((loc: any) => (
                  <MenuItem key={loc.id} value={loc} style={{ color: "black" }}>
                    {loc.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth sx={inputStyles}>
              <InputLabel id="st-select-label">Storage Type</InputLabel>
              <Select
                labelId="st-select-label"
                id="st-select"
                value={selectStorageType}
                label="Storage Type"
                sx={inputStyles}
                onChange={(e) => setSelectedStorageType(e.target.value)}
                className="sm:w-full max-sm:w-full dark:text-white"
              >
                {storageTypeData.map((loc: any) => (
                  <MenuItem key={loc.id} value={loc} style={{ color: "black" }}>
                    {loc.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth sx={inputStyles}>
              <InputLabel id="s-select-label">Storage</InputLabel>
              <Select
                labelId="s-select-label"
                id="s-select"
                value={selectStoarge}
                label="Storage"
                sx={inputStyles}
                onChange={(e) => setSelectedStoarge(e.target.value)}
                className="sm:w-full max-sm:w-full dark:text-white"
              >
                {storageData.map((loc: any) => (
                  <MenuItem key={loc.id} value={loc} style={{ color: "black" }}>
                    {loc.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth sx={inputStyles}>
              <InputLabel id="G-select-label">GPU</InputLabel>
              <Select
                labelId="G-select-label"
                id="G-select"
                value={selectGpu}
                label="GPU"
                sx={inputStyles}
                onChange={(e) => setSelectedGpu(e.target.value)}
                className="sm:w-full max-sm:w-full dark:text-white"
              >
                {gpuData.map((loc: any) => (
                  <MenuItem key={loc.id} value={loc} style={{ color: "black" }}>
                    {loc.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <TextField
            sx={inputStyles}
            label="Screen Size"
            variant="outlined"
            fullWidth
            value={formData.screenSize || ""}
            onChange={(e) => handleFormChange("screenSize", e.target.value)}
          />
          <TextField
            sx={inputStyles}
            label="Screen Resolution"
            variant="outlined"
            fullWidth
            value={formData.screenResolution || ""}
            onChange={(e) =>
              handleFormChange("screenResolution", e.target.value)
            }
          />
          <TextField
            sx={inputStyles}
            label="Weight"
            variant="outlined"
            fullWidth
            value={formData.weight || ""}
            onChange={(e) => handleFormChange("weight", e.target.value)}
          />
          <TextField
            sx={inputStyles}
            label="Graphics"
            variant="outlined"
            fullWidth
            value={formData.graphics || ""}
            onChange={(e) => handleFormChange("graphics", e.target.value)}
          />
          <TextField
            sx={inputStyles}
            label="Ports"
            variant="outlined"
            fullWidth
            value={formData.ports || ""}
            onChange={(e) => handleFormChange("ports", e.target.value)}
          />
          <TextField
            sx={inputStyles}
            className="inputField"
            label="Battery Life"
            variant="outlined"
            fullWidth
            value={formData.batteryLife || ""}
            onChange={(e) => handleFormChange("batteryLife", e.target.value)}
          />

          <TextField
            sx={inputStyles}
            className="inputField"
            label="Color"
            variant="outlined"
            fullWidth
            value={formData.color || ""}
            onChange={(e) => handleFormChange("color", e.target.value)}
          />
        </>
      )}

      {selectCategory?.name === "Gaming Consoles" && (
        <>
          <TextField
            sx={inputStyles}
            label="accessories"
            variant="outlined"
            fullWidth
            value={formData.accessories || ""}
            onChange={(e) => handleFormChange("accessories", e.target.value)}
          />
          <TextField
            sx={inputStyles}
            label="Connectivity"
            variant="outlined"
            fullWidth
            value={formData.connectivity || ""}
            onChange={(e) => handleFormChange("connectivity", e.target.value)}
          />
          <TextField
            sx={inputStyles}
            label="Warrant Status"
            variant="outlined"
            fullWidth
            value={formData.warranty_status || ""}
            onChange={(e) =>
              handleFormChange("warranty_status", e.target.value)
            }
          />
          <TextField
            sx={inputStyles}
            className="inputField"
            label="Battery Life"
            variant="outlined"
            fullWidth
            value={formData.batteryLife || ""}
            onChange={(e) => handleFormChange("batteryLife", e.target.value)}
          />

          <TextField
            sx={inputStyles}
            className="inputField"
            label="Color"
            variant="outlined"
            fullWidth
            value={formData.color || ""}
            onChange={(e) => handleFormChange("color", e.target.value)}
          />
        </>
      )}

      {selectCategory?.name === "Components" && (
        <>
          <div className="w-full text-center">
            <h2 className="text-lg font-bold">Select Component Type</h2>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth sx={inputStyles}>
                <InputLabel id="cat-select-label">Category</InputLabel>
                <Select
                  labelId="cat-select-label"
                  id="cat-select"
                  name="component_type"
                  value={selectComponentCategory}
                  label="Category"
                  //@ts-ignore
                  onChange={(e) => setSelectedComponentCategory(e.target.value)}
                  // onChange={(e) =>
                  //   setSelectedComponentCategory((prev: any) => ({
                  //     ...prev,
                  //     id: e.target.value,
                  //     name: e.target.name,
                  //   }))
                  // }
                  sx={{ color: "#000000" }}
                >
                  {componentCategories &&
                    componentCategories.length > 0 &&
                    componentCategories.map((e: any) => (
                      <MenuItem value={e.id}>{e.name}</MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Box>
          </div>
          <TextField
            sx={inputStyles}
            label="text"
            variant="outlined"
            fullWidth
            value={formData.component_text || ""}
            onChange={(e) => handleFormChange("component_text", e.target.value)}
          />
        </>
      )}
    </div>
  );
};

export default MoreSpecification;
