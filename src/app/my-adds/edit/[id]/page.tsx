"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { RootState } from "@/components/Store/Store";
import { useParams, useRouter } from "next/navigation";
import { getSpecifications } from "@/app/utils/getSpecifications";
import Specifications from "./Specifications";

export default function EditAdPage() {
  const { id } = useParams(); // Get dynamic ad ID
  console.log(id, "kkkkkkkkkk");
  const router = useRouter();
  const token = useSelector((state: RootState) => state.user.token);
  const userId = useSelector((state: RootState) => state.user.id);

  const [adData, setAdData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    condition: "New",
    location: "",
    stock: "",
    brand: "",
    processorVariant: "",
  });
  // const [specifications, setSpecifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [locations, setLocations] = useState<any[]>([]);
  const [brands, setBrands] = useState<any[]>([]);
  const [componentCategories, setComponentCategories] = useState<any[]>([]);
  const [processorVariantData, setProcessorVariantData] = useState<any[]>([]);
  const [category, setCategory] = useState<any[]>([]);
  const [specifications, setSpecifications] = useState<any[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");

  // Fetching all necessary data
  useEffect(() => {
    if (!id) return;
    fetchAdDetails();
    fetchBrands();
    fetchComponentCategories();
    fetchProcessorVariants();
    fetchLocations();
    fetchCategories();
  }, [id]);

  const fetchAdDetails = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/getProductById?id=${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const product = response.data.data;
      console.log("Product Response:", product);

      if (product) {
        setAdData({
          name: product.name || "",
          description: product.description || "",
          price: product.price || "",
          category: product.categories?.name || "",
          condition:
            product.condition_product_conditionTocondition?.name || "New",
          location: product.location_product_locationTolocation?.name || "",
          stock: product.stock || "",
          brand: product.brand || "",
          processorVariant: product.processor_variant || "",
        });

        const specs = getSpecifications(product);
        console.log("Specifications Generated:", specs);
        setSpecifications(specs);
      }
    } catch (err) {
      toast.error("Failed to fetch ad details");
    } finally {
      setLoading(false);
    }
  };

  const fetchBrands = async () => {
    //@ts-ignore
    if (!selectCategory) {
      console.log("No category selected. Skipping brand fetch.");
      return;
    }
    try {
      const response = await axios.get(
        //@ts-ignore
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/brands/getAll?category=${selectCategory.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data && response.data.data) {
        setBrands(response.data.data);
        console.log(response.data.data, "lolllll");
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
    }
  };

  const fetchProcessorVariants = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/processor/getProcessorVariant`
      );
      setProcessorVariantData(response?.data?.data || []);
    } catch (err) {
      console.error("Failed to fetch processor variants.");
    }
  };

  const fetchLocations = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/location/getAll`
      );
      setLocations(response?.data?.data || []);
    } catch (err) {
      console.error("Failed to fetch locations.");
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/categories/getAll`
      );
      setCategory(response?.data?.data || []);
    } catch (err) {
      console.error("Failed to fetch categories.");
    }
  };

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setAdData({ ...adData, [e.target.name]: e.target.value });
  };

  // Handle specification input change
  const handleSpecChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const updatedSpecs = [...specifications];
    updatedSpecs[index].value = e.target.value;
    setSpecifications(updatedSpecs);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    console.log("Form submission started");

    try {
      const payload = {
        prod_id: id,
        user_id: userId,
        name: adData.name,
        description: adData.description,
        location: adData.location,
        price: adData.price,
        stock: adData.stock,
        brand_id: adData.brand, // Ensure it's the brand ID
        //@ts-ignore
        model_id: adData?.model_id || "", // Replace with actual model id logic
        category_id: adData?.category, // Ensure it's the category ID

        // Optional fields (only add if they have values)
        condition: adData.condition || undefined,
        processorVariant: adData.processorVariant || undefined,
        specifications: specifications.length > 0 ? specifications : undefined,
      };

      console.log("Payload to be sent:", payload);

      const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/updateProduct`;
      console.log("API URL:", apiUrl);

      const response = await axios.post(apiUrl, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("API response:", response.data);

      toast.success("Ad updated successfully");
      router.push("/my-adds");
    } catch (err: any) {
      console.error("Error response:", err.response?.data || err.message);
      toast.error("Failed to update ad");
    } finally {
      setLoading(false);
      console.log("Form submission ended");
    }
  };

  return (
    <div className="w-full dark:bg-black">
      <div className="max-w-5xl mx-auto   p-6 border rounded-lg shadow-md bg-white dark:bg-secondaryBlack ">
        <h1 className="text-3xl text-start font-bold mb-4 text-secondaryColorLight dark:text-white">
          Edit Ad
        </h1>

        {loading ? (
          <p className="text-center">Loading ad details...</p>
        ) : (
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              {/* Product Name */}
              <div className="flex flex-col">
                <label className="edit-label">Product Name</label>
                <input
                  type="text"
                  name="name"
                  value={adData.name}
                  onChange={handleChange}
                  placeholder="Ad Name"
                  className="edit-input dark:text-white dark:bg-secondaryBlack"
                  required
                />
              </div>

              {/* Price */}
              <div className="flex flex-col">
                <label className="edit-label">Price</label>
                <input
                  type="number"
                  name="price"
                  value={adData.price}
                  onChange={handleChange}
                  placeholder="Price"
                  className="edit-input dark:text-white dark:bg-secondaryBlack"
                  required
                />
              </div>

              {/* Category */}
              <div className="flex flex-col">
                <label className="edit-label">Category</label>
                <select
                  name="category"
                  value={adData.category}
                  onChange={handleChange}
                  className="edit-input dark:text-white dark:bg-secondaryBlack"
                  required
                >
                  {category.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category?.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Condition (Hardcoded options) */}
              <div className="flex flex-col">
                <label className="edit-label">Condition</label>
                <select
                  name="condition"
                  value={adData.condition}
                  onChange={handleChange}
                  className="edit-input dark:text-white dark:bg-secondaryBlack"
                  required
                >
                  <option value="New">New</option>
                  <option value="Used">Used</option>
                </select>
              </div>

              {/* Location Dropdown */}
              <div className="flex flex-col">
                <label className="edit-label">Location</label>
                <select
                  name="location"
                  value={adData.location}
                  onChange={handleChange}
                  className="edit-input dark:text-white dark:bg-secondaryBlack"
                  required
                >
                  {locations.map((location) => (
                    <option key={location.id} value={location.name}>
                      {location.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Processor Variant Dropdown */}
              <div className="flex flex-col">
                <label className="edit-label">Processor Variant</label>
                <select
                  name="processorVariant"
                  value={adData.processorVariant}
                  onChange={handleChange}
                  className="edit-input dark:text-white dark:bg-secondaryBlack"
                  required
                >
                  {processorVariantData.map((variant) => (
                    <option key={variant.id} value={variant.name}>
                      {variant.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Stock */}
              <div className="flex flex-col">
                <label className="edit-label">Stock</label>
                <input
                  type="number"
                  name="stock"
                  value={adData.stock}
                  onChange={handleChange}
                  placeholder="Stock"
                  className="edit-input dark:text-white dark:bg-secondaryBlack"
                  required
                />
              </div>
            </div>

            {/* Description - Full Width */}
            <div className="flex flex-col">
              <label className="edit-label">Description</label>
              <textarea
                name="description"
                value={adData.description}
                onChange={handleChange}
                placeholder="Description"
                className="edit-input min-h-[100px] dark:text-white dark:bg-secondaryBlack"
                required
              />
            </div>

            {/* Dynamic Specifications */}
            {/* {specifications.length > 0 && (
              <div>
                <h3 className="text-2xl font-bold text-secondaryColorLight dark:text-white mt-2 mb-1">
                  Specifications
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {specifications.map((spec, index) => (
                    <div key={index} className="flex flex-col">
                      <label className="font-medium edit-label">
                        {spec.label}
                      </label>
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
              </div>
            )} */}

            <Specifications
              categoryId={selectedCategoryId}
              setCategoryId={setSelectedCategoryId}
              specifications={specifications}
              setSpecifications={setSpecifications}
              //@ts-ignore
              token={token}
            />

            <div className="flex justify-center mt-4">
              <button
                type="submit"
                className="bg-custom-gradient text-white py-2 px-4 rounded-lg shadow-md"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
