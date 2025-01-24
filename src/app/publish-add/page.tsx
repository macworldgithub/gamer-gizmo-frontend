"use client";

import { RootState } from "@/components/Store/Store";
import { Button, Step, StepLabel, Stepper, TextField } from "@mui/material";
import axios from "axios";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface Category {
  id: number;
  name: string;
  icon?: string;
}

interface Brand {
  id: number;
  name: string;
}

const PublishAdd: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loadingCategories, setLoadingCategories] = useState<boolean>(true);
  const [loadingBrands, setLoadingBrands] = useState<boolean>(false);
  const [categoryError, setCategoryError] = useState<string | null>(null);
  const [brandError, setBrandError] = useState<string | null>(null);

  const categoryIconMapping: Record<string, string> = {
    Desktops: "/images/desktopImage.jpg",
    Laptops: "/images/LaptopImage.png",
    Components: "/images/components.jpg",
    Accessories: "/images/accessories.jpg",
    Default: "/images/default.jpg",
  };

  const steps = [
    {
      label: "Category Selection",
      content: (
        <div className="w-full text-center">
          <h2 className="text-lg font-bold">Select Category</h2>
          {loadingCategories ? (
            <p>Loading categories...</p>
          ) : categoryError ? (
            <p className="text-red-500">{categoryError}</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
              {categories.map((category) => (
                <div
                  key={category.id}
                  onClick={() => handleFormChange("category", category.name)}
                  className={clsx(
                    "p-4 border rounded-lg cursor-pointer text-center",
                    formData.category === category.name
                      ? "bg-blue-500 text-white"
                      : "hover:bg-gray-200 dark:hover:bg-gray-400"
                  )}
                >
                  <div className="relative w-16 h-16 mx-auto mb-4">
                    <img
                      src={
                        category.icon ||
                        categoryIconMapping[category.name] ||
                        categoryIconMapping["Default"]
                      }
                      alt={category.name}
                      className="rounded-lg object-contain w-full h-full"
                    />
                  </div>
                  {category.name}
                </div>
              ))}
            </div>
          )}
        </div>
      ),
    },
    {
      label: "Brand Selection",
      content: (
        <div className="w-full text-center">
          <h2 className="text-lg font-bold">Select Brand</h2>
          {loadingBrands ? (
            <p>Loading brands...</p>
          ) : brandError ? (
            <p className="text-red-500">{brandError}</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
              {brands.map((brand) => (
                <div
                  key={brand.id}
                  onClick={() => handleFormChange("brand", brand.name)}
                  className={clsx(
                    "p-4 border rounded-lg cursor-pointer text-center",
                    formData.brand === brand.name
                      ? "bg-green-500 text-white"
                      : "hover:bg-gray-200 dark:hover:bg-gray-400"
                  )}
                >
                  {brand.name}
                </div>
              ))}
            </div>
          )}
        </div>
      ),
    },
    {
      label: "Add Details",
      content: (
        <div className="flex flex-col space-y-4">
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
        </div>
      ),
    },
    {
      label: "Set Price",
      content: (
        <div className="flex flex-col space-y-4">
          <TextField
            label="Price (USD)"
            variant="outlined"
            type="number"
            fullWidth
            value={formData.price || ""}
            onChange={(e) => handleFormChange("price", e.target.value)}
          />
        </div>
      ),
    },
    {
      label: "Publish",
      content: (
        <div className="text-center">
          <h2 className="text-lg font-bold">Ready to Publish</h2>
          <p className="text-gray-500 dark:text-white">
            Review your details and confirm your ad.
          </p>
        </div>
      ),
    },
  ];

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4001/categories/getAll"
        );
        if (response.data && response.data.data) {
          setCategories(response.data.data);
        } else {
          setCategories([]);
        }
      } catch (err) {
        setCategoryError("Failed to fetch categories.");
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchBrands = async () => {
      if (!formData.category) return;

      setLoadingBrands(true);

      try {
        // Get token from Redux state
        const token = useSelector((state: RootState) => state.user.token);

        // Perform API call
        const response = await axios.get(
          `http://localhost:4001/brands/getAll?category=${formData.category}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data && response.data.data) {
          setBrands(response.data.data);
        } else {
          setBrands([]);
        }
      } catch (err) {
        setBrandError("Failed to fetch brands.");
      } finally {
        setLoadingBrands(false);
      }
    };

    fetchBrands();
  }, [formData.category]);

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleFormChange = (field: string, value: any) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  return (
    <div className="container mx-auto p-6">
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((step, index) => (
          <Step key={index}>
            <StepLabel>{step.label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div className="mt-8">{steps[activeStep].content}</div>
      <div className="flex justify-between mt-6">
        <Button disabled={activeStep === 0} onClick={handleBack}>
          Back
        </Button>
        {activeStep === steps.length - 1 ? (
          <Button variant="contained" color="primary">
            Publish
          </Button>
        ) : (
          <Button variant="contained" color="primary" onClick={handleNext}>
            Next
          </Button>
        )}
      </div>
    </div>
  );
};

export default PublishAdd;
