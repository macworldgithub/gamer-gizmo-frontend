import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React from 'react'

const MoreSpecification = ({selectCategory,formData,handleFormChange,selectComponentCategory,setSelectedComponentCategory,componentCategories}:any) => {
  return (
    <div className="flex flex-col space-y-4">
    {/* Conditionally render additional fields based on the selected category */}
    {["Laptops", "Desktops"].includes(selectCategory.name) && (
      <>
        <TextField
          label="Processor"
          variant="outlined"
          fullWidth
          value={formData.processor || ""}
          onChange={(e) => handleFormChange("processor", e.target.value)}
        />
        <TextField
          label="Processor_type"
          variant="outlined"
          fullWidth
          value={formData.processor_type || ""}
          onChange={(e) =>
            handleFormChange("processor_type", e.target.value)
          }
        />
        <TextField
          label="RAM"
          variant="outlined"
          fullWidth
          value={formData.ram || ""}
          onChange={(e) => handleFormChange("ram", e.target.value)}
        />
        <TextField
          label="Storage"
          variant="outlined"
          fullWidth
          value={formData.storage || ""}
          onChange={(e) => handleFormChange("storage", e.target.value)}
        />
        <TextField
          label="Screen Size"
          variant="outlined"
          fullWidth
          value={formData.screenSize || ""}
          onChange={(e) => handleFormChange("screenSize", e.target.value)}
        />
        <TextField
          label="Screen Resolution"
          variant="outlined"
          fullWidth
          value={formData.screenResolution || ""}
          onChange={(e) =>
            handleFormChange("screenResolution", e.target.value)
          }
        />
        <TextField
          label="Weight"
          variant="outlined"
          fullWidth
          value={formData.weight || ""}
          onChange={(e) => handleFormChange("weight", e.target.value)}
        />
        <TextField
          label="Graphics"
          variant="outlined"
          fullWidth
          value={formData.graphics || ""}
          onChange={(e) => handleFormChange("graphics", e.target.value)}
        />
        <TextField
          label="Ports"
          variant="outlined"
          fullWidth
          value={formData.ports || ""}
          onChange={(e) => handleFormChange("ports", e.target.value)}
        />
        <TextField
          label="Battery Life"
          variant="outlined"
          fullWidth
          value={formData.batteryLife || ""}
          onChange={(e) =>
            handleFormChange("batteryLife", e.target.value)
          }
        />

        <TextField
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
              <FormControl fullWidth>
                <InputLabel id="cat-select-label">Category</InputLabel>
                <Select
                  labelId="cat-select-label"
                  id="cat-select"
                  value={selectComponentCategory}
                  label="Category"
                  //@ts-ignore
                  onChange={(e) =>
                    setSelectedComponentCategory(e.target.value)
                  }
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
          label="text"
          variant="outlined"
          fullWidth
          value={formData.component_text || ""}
          onChange={(e) =>
            handleFormChange("component_text", e.target.value)
          }
        />
      </>
    )}
  </div>
  )
}

export default MoreSpecification