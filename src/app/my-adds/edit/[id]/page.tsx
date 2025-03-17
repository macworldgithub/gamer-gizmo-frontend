"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { RootState } from "@/components/Store/Store";
import { useParams, useRouter } from "next/navigation";
import SpecificationsForm from "./SpecificationsForm";

export default function EditAdPage() {
  const { id } = useParams();
  const router = useRouter();
  const token = useSelector((state: RootState) => state.user.token);
  const userId = useSelector((state: RootState) => state.user.id);

  const [adData, setAdData] = useState<any>({});

  const [loading, setLoading] = useState(true);
  const [locations, setLocations] = useState<any[]>([]);
  const [brands, setBrands] = useState<any[]>([]);
  const [componentCategories, setComponentCategories] = useState<any[]>([]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Prepare specifications data based on category_id
      const specificationsData = () => {
        const specs = {
          ...adData.laptops?.[0], // Default for laptops (if any)
          ...adData.personal_computers?.[0], // or personal computers
          ...adData.components?.[0], // or components
          ...adData.gaming_console?.[0], // or gaming console
        };

        switch (adData.category_id) {
          case 1: // Laptops
            return { laptops: [specs] };
          case 2: // Personal Computers
            return { personal_computers: [specs] };
          case 3: // Components
            return { components: [specs] };
          case 4: // Gaming Console
            return { gaming_console: [specs] };
          default:
            return {};
        }
      };

      // Prepare final payload
      const payload = {
        product_id: id,
        user_id: userId,
        name: adData.name,
        price: adData.price,
        condition: adData.condition,
        description: adData.description,
        brand: adData.brand,
        location: adData.location,
        stock: adData.stock,
        ...specificationsData(),
      };

      // API Call
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/updateProduct`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Ad updated successfully");
      router.push("/my-adds");
    } catch (err) {
      console.error(err);
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
                  className="edit-input"
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
                  className="edit-input"
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
                  className="edit-input"
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
                  className="edit-input"
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
                  name="brand"
                  value={adData?.brand}
                  onChange={handleChange}
                  className="edit-input"
                  required
                >
                  {brands.map((brand) => (
                    <option key={brand.id} value={brand.id}>
                      {brand.name}
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
                  className="edit-input"
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
                className="edit-input min-h-[100px]"
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
              />
            </div>

            {/* </div> */}
          </form>
        )}
      </div>
      <button>Update Ad</button>
    </div>
  );
}
