"use client";
import { RootState } from "@/components/Store/Store";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import SpecificationsForm from "./SpecificationsForm";
import UploadImages from "./UploadImages";

export default function EditAdPage() {
  const { id } = useParams();
  const router = useRouter();
  const token = useSelector((state: RootState) => state.user.token);

  const [adData, setAdData] = useState<any>({});

  const [loading, setLoading] = useState(true);
  const [locations, setLocations] = useState<any[]>([]);
  const [brands, setBrands] = useState<any[]>([]);
  const [model, setModels] = useState<any[]>([]);
  const [componentCategories, setComponentCategories] = useState<any[]>([]);
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    if (!id) return;
    fetchAdDetails();
    fetchComponentCategories();
    fetchLocations();
  }, [id]);
  useEffect(() => {
    fetchBrands();
  }, [adData]);

  const fetchAdDetails = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/getProductById?id=${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const product = response.data.data;
      console.log("api response", product);

      setAdData({
        ...product,
        category_id: product?.category_id || "",
      });
    } catch (err) {
      toast.error("Failed to fetch ad details");
    } finally {
      setLoading(false);
    }
  };

  const fetchBrands = async () => {
    try {
      console.log(adData, "ad data");
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/brands/getAll?category=${adData.category_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setBrands(response.data.data || []);
    } catch (err: any) {
      console.error(
        "Error fetching brands:",
        err.response?.data || err.message
      );
    }
  };

  useEffect(() => {
    const fetchModels = async () => {
      try {
        console.log(adData, "ad data");
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/models/getAll?brand=${adData?.brand_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setModels(response.data.data || []);
      } catch (err: any) {
        console.error(
          "Error fetching models:",
          err.response?.data || err.message
        );
      }
    };

    if (adData?.brand_id) {
      fetchModels();
    }
  }, [adData?.brand_id]);

  const fetchComponentCategories = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/component-category/getAll`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setComponentCategories(response?.data?.data || []);
    } catch (error) {
      console.error("Error occurred while fetching categories:", error);
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

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setAdData({ ...adData, [e.target.name]: e.target.value });
  };

  const handleLaptopChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setAdData((prev: any) => ({
      ...prev,
      laptops: [
        {
          ...prev.laptops[0],
          [name]: value,
        },
      ],
    }));
  };

  const handlePersonalComputerChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setAdData((prev: any) => ({
      ...prev,
      personal_computers: [
        {
          ...prev.personal_computers[0], // Keep existing data
          [name]: value, // Update specific field
        },
      ],
    }));
  };

  const handleGamingConsoleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setAdData((prev: any) => ({
      ...prev,
      gaming_console: [
        {
          ...prev.gaming_console?.[0], // Keep existing data
          [name]: value, // Update specific field
        },
      ],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("adData:", adData);

      // const specificationsData = () => {
      //   let specs = {};

      //   if (adData.laptops?.[0]) {
      //     specs = { ...specs, ...adData.laptops[0] };
      //   }
      //   if (adData.personal_computers?.[0]) {
      //     specs = { ...specs, ...adData.personal_computers[0] };
      //   }
      //   if (adData.components?.[0]) {
      //     specs = { ...specs, ...adData.components[0] };
      //   }
      //   if (adData.gaming_console?.[0]) {
      //     specs = { ...specs, ...adData.gaming_console[0] };
      //   }
      const specificationsData = () => {
        switch (adData?.category_id) {
          case 1:
            return { laptops: [{ ...adData.laptops?.[0] }] };
          case 2:
            return {
              personal_computers: [{ ...adData.personal_computers?.[0] }],
            };
          case 3:
            return { components: [{ ...adData.components?.[0] }] };
          case 4:
            return { gaming_console: [{ ...adData.gaming_console?.[0] }] };
          default:
            return {};
        }
      };

      const payload = {
        prod_id: adData?.id?.toString() || "",
        user_id: adData?.user_id?.toString() || "",
        category_id: adData?.category_id?.toString() || "",
        name: adData?.name || "",
        price: adData?.price?.toString() || "",
        condition: adData?.condition?.toString() || "",
        description: adData?.description || "",
        brand_id: adData?.brand_id?.toString() || "",
        location: adData?.location?.toString() || "",
        model_id: adData?.model_id?.toString() || "",
        stock: adData?.stock?.toString() || "",
        ...specificationsData(),
      };
      console.log("Final payload:", payload);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/updateProduct`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("API Response:", response?.data);

      toast.success("Ad updated successfully");
      router.push("/my-adds");
    } catch (err) {
      console.error("Error during submission:", err);
      toast.error("Failed to update ad");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full dark:bg-black">
      <div className="max-w-5xl mx-auto t-10  p-6 border rounded-lg shadow-md bg-white dark:bg-secondaryBlack ">
        <h1 className="text-3xl text-start font-bold mb-4 text-secondaryColorLight dark:text-white">
          Edit Ad
        </h1>

        {loading ? (
          <p className="text-center">Loading ad details...</p>
        ) : (
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="edit-label">Product Name</label>
                <input
                  type="text"
                  name="name"
                  value={adData.name}
                  onChange={handleChange}
                  placeholder="Ad Name"
                  className="edit-input dark:text-black"
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
                  className="edit-input dark:text-black"
                  required
                />
              </div>

              {/* Condition (Hardcoded options) */}
              <div className="flex flex-col">
                <label className="edit-label">Condition</label>
                <select
                  name="condition"
                  value={adData.condition}
                  onChange={handleChange}
                  className="edit-input dark:text-black"
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
                  className="edit-input dark:text-black"
                  required
                >
                  {locations.map((location) => (
                    <option key={location.id} value={location.name}>
                      {location.name}
                    </option>
                  ))}
                </select>
              </div>
              {/* Brand Dropdown */}
              <div className="flex flex-col">
                <label className="edit-label">Brand</label>
                <select
                  name="brand_id"
                  value={adData?.brand_id}
                  onChange={handleChange}
                  className="edit-input dark:text-black"
                  required
                >
                  {brands.map((brand) => (
                    <option key={brand.id} value={brand.id}>
                      {brand.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col">
                <label className="edit-label">Model</label>
                <select
                  name="model_id"
                  value={adData?.model_id}
                  onChange={handleChange}
                  className="edit-input dark:text-black"
                  required
                >
                  {model.map((mod) => (
                    <option key={mod.id} value={mod.id}>
                      {mod.name}
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
                  className="edit-input dark:text-black"
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
                className="edit-input min-h-[100px] dark:text-black"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <SpecificationsForm
                //@ts-ignore
                token={token}
                setAdData={setAdData}
                categoryId={adData?.categories?.id}
                adData={adData}
                handleChange={handleChange}
                handleLaptopChange={handleLaptopChange}
                handlePersonalComputerChange={handlePersonalComputerChange}
                consoleChange={handleGamingConsoleChange}
              />
            </div>
            <UploadImages
              fileList={fileList}
              setFileList={setFileList}
              adData={adData}
            />
            <button
              className="bg-custom-gradient w-36 text-white rounded-md mx-auto p-1 text-lg"
              type="submit"
            >
              Update Ad
            </button>

            {/* </div> */}
          </form>
        )}
      </div>
    </div>
  );
}
