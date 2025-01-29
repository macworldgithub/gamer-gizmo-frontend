import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../Store/Store';

interface Model {
    id: number;
    name: string;
  }
const DetailSection = ({selectModel,formData,handleFormChange,setSelectedModel,selectBrand}:any) => {
  const [models, setModels] = useState<Model[]>([]);
  const token = useSelector((state: RootState) => state.user.token);
     const fetchModels = async () => {
        if (!selectBrand) {
          console.log("No brand selected, skipping API call.");
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
      
      useEffect(() => {
        fetchModels();
      }, [selectBrand, token]);
    
  return (
    <div className="flex text-black  flex-col space-y-4">
              <TextField
                label="Title"
                variant="outlined"
                fullWidth
                value={formData.title || ""}
                onChange={(e) => handleFormChange("title", e.target.value)}
              />
              <TextField
                label="Description"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                value={formData.description || ""}
                onChange={(e) => handleFormChange("description", e.target.value)}
              />
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="condition-select-label">Condition</InputLabel>
                  <Select
                    labelId="condition-select-label"
                    id="condition-select"
                    value={formData.condition }
                    label="Condition"
                    //@ts-ignore
                    onChange={(e) => handleFormChange("condition",e.target.value)}
                  >
                    <MenuItem value="new">New</MenuItem>
                    <MenuItem value="used">Used</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="model-select-label">Select Model</InputLabel>
                  <Select
                    labelId="model-select-label"
                    id="model-select"
                    label="Model"

                    value={selectModel}
                    // @ts-ignore
                    onChange={(e) => setSelectedModel(e.target.value)}
                  >
                    {models.map((model:any) => (
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
            </div>
  )
}

export default DetailSection