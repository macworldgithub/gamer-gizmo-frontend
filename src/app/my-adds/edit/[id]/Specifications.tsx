import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

interface Specification {
  label: string;
  value: string | number;
}

interface Category {
  id: string;
  name: string;
}

interface SpecificationsProps {
  categoryId: string;
  specifications: Specification[];
  setSpecifications: (specs: Specification[]) => void;
  setCategoryId: (id: string) => void;
  token: string;
}

const Specifications: React.FC<SpecificationsProps> = ({
  categoryId,
  specifications,
  setSpecifications,
  setCategoryId,
  token,
}) => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<string[]>(["Dell", "HP", "Asus"]);
  const [processors, setProcessors] = useState<string[]>(["AMD", "Intel"]);
  const [gpuOptions, setGpuOptions] = useState<string[]>(["NVIDIA", "AMD"]);
  const [storageTypes, setStorageTypes] = useState<string[]>([
    "SSD",
    "HDD",
    "Hybrid",
  ]);

  const dropdownFields = [
    "Category Name",
    "Brand",
    "Model",
    "Processor Variant",
    "Storage",
    "Storage Type",
    "GPU",
  ];

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (categoryId) {
      fetchSpecifications();
    }
  }, [categoryId]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/categories`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCategories(response.data?.data || []);
    } catch (err) {
      toast.error("Failed to fetch categories");
    }
  };

  const fetchSpecifications = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/categories/getAll=${categoryId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const specsData = response.data?.data || [];
      const formattedSpecs = specsData.map((spec: any) => ({
        label: spec.label,
        value: spec.value || "",
      }));

      setSpecifications(formattedSpecs);
    } catch (err) {
      toast.error("Failed to fetch specifications");
    } finally {
      setLoading(false);
    }
  };

  const handleSpecChange = (value: string, index: number) => {
    const updatedSpecs = [...specifications];
    updatedSpecs[index].value = value;
    setSpecifications(updatedSpecs);
  };

  const getDropdownOptions = (label: string) => {
    switch (label) {
      case "Category Name":
        return categories.map((cat) => ({ label: cat.name, value: cat.name }));
      case "Brand":
        return brands.map((brand) => ({ label: brand, value: brand }));
      case "Processor Variant":
        return processors.map((proc) => ({ label: proc, value: proc }));
      case "GPU":
        return gpuOptions.map((gpu) => ({ label: gpu, value: gpu }));
      case "Storage Type":
        return storageTypes.map((type) => ({ label: type, value: type }));
      default:
        return [];
    }
  };

  return (
    <div>
      <h3 className="text-2xl font-bold text-secondaryColorLight dark:text-white mt-2 mb-1">
        Specifications
      </h3>

      <div className="grid grid-cols-2 gap-4">
        {specifications.map((spec, index) => (
          <div key={index} className="flex flex-col">
            <label className="font-medium edit-label">{spec.label}</label>

            {dropdownFields.includes(spec.label) ? (
              <select
                value={spec.value}
                onChange={(e) => handleSpecChange(e.target.value, index)}
                className="edit-input dark:text-white dark:bg-secondaryBlack"
              >
                <option value="">Select {spec.label}</option>
                {getDropdownOptions(spec.label).map((option, idx) => (
                  <option key={idx} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                value={spec.value}
                onChange={(e) => handleSpecChange(e.target.value, index)}
                placeholder={spec.label}
                className="edit-input dark:text-white dark:bg-secondaryBlack"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Specifications;
