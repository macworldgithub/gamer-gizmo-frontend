import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

interface Specification {
  label: string;
  value: string;
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

  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  // Fetch specifications when category changes
  useEffect(() => {
    if (categoryId) {
      fetchSpecifications();
    }
  }, [categoryId]);

  // Fetch categories
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

  // Fetch specifications based on selected category
  const fetchSpecifications = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/specifications/getByCategory?category=${categoryId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const specsData = response.data?.data || [];

      const formattedSpecs = specsData.map((spec: any) => ({
        label: spec.label,
        value: "",
      }));

      setSpecifications(formattedSpecs);
    } catch (err) {
      toast.error("Failed to fetch specifications");
    } finally {
      setLoading(false);
    }
  };

  // Handle change for specifications
  const handleSpecChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const updatedSpecs = [...specifications];
    updatedSpecs[index].value = e.target.value;
    setSpecifications(updatedSpecs);
  };

  return (
    <div>
      <h3 className="text-2xl font-bold text-secondaryColorLight dark:text-white mt-2 mb-1">
        Specifications
      </h3>

      {/* Category Dropdown */}
      <div className="mb-4">
        <label className="font-medium edit-label">Select Category</label>
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="edit-input dark:text-white dark:bg-secondaryBlack"
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Specifications Inputs */}
      {loading ? (
        <p>Loading specifications...</p>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {specifications.map((spec, index) => (
            <div key={index} className="flex flex-col">
              <label className="font-medium edit-label">{spec.label}</label>
              <input
                type="text"
                value={spec.value}
                onChange={(e) => handleSpecChange(e, index)}
                placeholder={spec.label}
                className="edit-input dark:text-white dark:bg-secondaryBlack"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Specifications;
