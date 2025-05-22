"use client";
import { RootState } from "@/components/Store/Store";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import SpecificationsForm from "./SpecificationsForm";
import UploadImages from "./UploadImages";
import { PlusOutlined } from "@ant-design/icons";

export default function EditAdPage() {
  const { id } = useParams();
  const router = useRouter();
  const token = useSelector((state: RootState) => state.user.token);

  const [adData, setAdData] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [locations, setLocations] = useState<any[]>([]);
  const [brands, setBrands] = useState<any[]>([]);
  const [model, setModels] = useState<any[]>([]);
  const [fileList, setFileList] = useState<any[]>([]);

  useEffect(() => {
    if (!id) return;
    fetchAdDetails();
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
      setAdData({
        ...product,
        category_id: product?.category_id || "",
      });

      const formattedImages = (product?.product_images || []).map(
        (img: any, index: number) => ({
          uid: img.id.toString(),
          name: `image-${img.id}`,
          url: new URL(
            img.image_url.replace(/^\/+/, ""),
            process.env.NEXT_PUBLIC_API_BASE_URL
          ).toString(),
          status: "done",
          id: img.id, // Store image ID for deletion
        })
      );

      setFileList(formattedImages);
    } catch (err) {
      toast.error("Failed to fetch ad details");
    } finally {
      setLoading(false);
    }
  };
  console.log(adData, "heheheh");

  useEffect(() => {
    if (fileList.length === 0 && adData?.product_images?.length > 0) {
      const existingImages = adData?.product_images
        .filter((img: any) => img.image_url)
        .map((img: any) => {
          const cleanedUrl = img.image_url.replace(/^\/+/, "");
          const fullUrl = new URL(
            cleanedUrl,
            process.env.NEXT_PUBLIC_API_BASE_URL
          ).toString();
          return {
            uid: img.id.toString(),
            name: `Image-${img.id}`,
            url: fullUrl,
            status: "done",
            id: img.id, // Store image ID
          };
        });

      setFileList(existingImages);
    }
  }, [adData?.product_images]);

  const fetchBrands = async () => {
    try {
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
          ...prev.personal_computers[0],
          [name]: value,
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
          ...prev.gaming_console?.[0],
          [name]: value,
        },
      ],
    }));
  };

  const specificationsData = () => {
    switch (adData?.category_id) {
      case 1:
        return { laptops: [{ ...adData?.laptops?.[0] }] };
      case 2:
        return { personal_computers: [{ ...adData?.personal_computers?.[0] }] };
      case 3:
        return { components: [{ ...adData?.components?.[0] }] };
      case 4:
        return { gaming_console: [{ ...adData?.gaming_console?.[0] }] };
      default:
        return {};
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Identify images to delete (present in adData.product_images but not in fileList)
      const originalImageIds = (adData?.product_images || []).map((img: any) =>
        img.id.toString()
      );
      const currentImageIds = fileList
        .filter((file: any) => file.id) // Only consider files with an ID (existing images)
        .map((file: any) => file.id.toString());
      const imagesToDelete = originalImageIds.filter(
        (id: string) => !currentImageIds.includes(id)
      );

      // Delete removed images
      if (imagesToDelete.length > 0) {
        await axios.delete(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/deleteProductImage`,
          {
            params: { image_ids: imagesToDelete },
            paramsSerializer: (params) => {
              return Object.entries(params)
                .map(([key, value]) => {
                  if (Array.isArray(value)) {
                    return value.map((val) => `${key}[]=${val}`).join("&");
                  }
                  return `${key}=${value}`;
                })
                .join("&");
            },
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }

      // Prepare form data for product update
      const formData = new FormData();

      // Append new images (files not yet uploaded)
      fileList.forEach((file: any) => {
        if (file.originFileObj) {
          formData.append("images", file.originFileObj);
        }
      });

      // Append base product data
      formData.append("prod_id", adData?.id?.toString() || "");
      formData.append("user_id", adData?.user_id?.toString() || "");
      formData.append("category_id", adData?.category_id?.toString() || "");
      formData.append("name", adData?.name || "");
      formData.append("price", adData?.price?.toString() || "");
      formData.append("condition", adData?.condition?.toString() || "");
      formData.append("description", adData?.description || "");
      formData.append("brand_id", adData?.brand_id?.toString() || "");
      formData.append("location", adData?.location?.toString() || "");
      formData.append("model_id", adData?.model_id?.toString() || "");
      formData.append("stock", adData?.stock?.toString() || "");
      // formData.append("is_published", adData?.is_published?.toString() || "");
      formData.append(
        "is_published",
        adData?.is_published === true ? "true" : "false"
      );

      // Handle category-specific specifications
      const specs = specificationsData();
      Object.entries(specs).forEach(([key, value]) => {
        if (Array.isArray(value) && value.length > 0) {
          Object.entries(value[0]).forEach(([specKey, specValue]) => {
            formData.append(
              `${key}[0][${specKey}]`,
              specValue?.toString() || ""
            );
          });
        }
      });

      // Update product
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/updateProduct`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Ad updated successfully");
      router.push("/my-adds");
    } catch (err: any) {
      console.error("Error during submission:", err);
      toast.error(err.response?.data?.message || "Failed to update ad");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full dark:bg-black">
      <div className="max-w-5xl mx-auto t-10 p-6 border rounded-lg shadow-md bg-white dark:bg-secondaryBlack">
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
                  value={adData.name || ""}
                  onChange={handleChange}
                  placeholder="Ad Name"
                  className="edit-input dark:text-black"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label className="edit-label">Price</label>
                <input
                  type="number"
                  name="price"
                  value={adData.price || ""}
                  onChange={handleChange}
                  placeholder="Price"
                  className="edit-input dark:text-black"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label className="edit-label">Condition</label>
                <select
                  name="condition"
                  value={adData.condition || ""}
                  onChange={handleChange}
                  className="edit-input dark:text-black"
                  required
                >
                  <option value="">Select Condition</option>
                  <option value="1">New</option>
                  <option value="2">Used</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label className="edit-label">Location</label>
                <select
                  name="location"
                  value={adData.location || ""}
                  onChange={handleChange}
                  className="edit-input dark:text-black"
                  required
                >
                  <option value="">Select Location</option>
                  {locations.map((location) => (
                    <option key={location.id} value={location.id}>
                      {location.name}
                    </option>
                  ))}
                </select>
              </div>
              {adData?.category_id !== 3 && (
                <>
                  <div className="flex flex-col">
                    <label className="edit-label">Brand</label>
                    <select
                      name="brand_id"
                      value={adData?.brand_id || ""}
                      onChange={handleChange}
                      className="edit-input dark:text-black"
                      required
                    >
                      <option value="">Select Brand</option>
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
                      value={adData?.model_id || ""}
                      onChange={handleChange}
                      className="edit-input dark:text-black"
                      required
                    >
                      <option value="">Select Model</option>
                      {model.map((mod) => (
                        <option key={mod.id} value={mod.id}>
                          {mod.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </>
              )}
              <div className="flex flex-col">
                <label className="edit-label">Stock</label>
                <input
                  type="number"
                  name="stock"
                  value={adData.stock || ""}
                  onChange={handleChange}
                  placeholder="Stock"
                  className="edit-input dark:text-black"
                  required
                />
              </div>
            </div>
            <div className="flex flex-col">
              <label className="edit-label">Description</label>
              <textarea
                name="description"
                value={adData.description || ""}
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
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Ad"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
