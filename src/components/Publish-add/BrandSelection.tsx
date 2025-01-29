import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../Store/Store";
import clsx from "clsx";

interface Brand {
  id: number;
  name: string;
}
const BrandSelection = ({
  selectCategory,
  setSelectedBrand,
  selectBrand,
  setComponentCategories,
}: any) => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loadingBrands, setLoadingBrands] = useState<boolean>(false);
  const [brandError, setBrandError] = useState<string | null>(null);
  const token = useSelector((state: RootState) => state.user.token);
  const fetchBrands = async () => {
    if (!selectCategory) {
      console.log("No category selected. Skipping brand fetch.");
      return;
    }

    setLoadingBrands(true);

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/brands/getAll?category=${selectCategory.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data && response.data.data) {
        setBrands(response.data.data);
      } else {
        console.log("No brands found in the response data.");
        setBrands([]);
      }
    } catch (err: any) {
      console.error(
        "Error fetching brands:",
        err.response?.data || err.message
      );
      setBrandError("Failed to fetch brands.");
    } finally {
      console.log("Finished fetching brands.");
      setLoadingBrands(false);
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
        setComponentCategories(response.data.data);
      } else {
        console.error("Unexpected API response structure:", response);
        throw new Error("Unexpected API response");
      }
    } catch (error) {
      console.error("Error occurred while fetching categories:", error);
    } finally {
      console.log("Fetch operation completed.");
    }
  };

  useEffect(() => {
    fetchBrands();
    fetchComponentCategories();
  }, [selectCategory, token]);
  return (
    <div className="w-full text-black  text-center">
      <h2 className="text-lg font-bold">Select Brand</h2>
      {loadingBrands ? (
        <p>Loading brands...</p>
      ) : brandError ? (
        <p className="text-red-500">{brandError}</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 max-sm:w-[70%] sm:w-[60%]  md:w-full lg:w-[80%] xl:w-[60%] max-sm:gap-3 gap-14 mt-6 mx-auto">
          {brands?.map((brand) => (
            <div
              //@ts-ignore
              key={brand?.id}
              onClick={() => setSelectedBrand(brand)}
              className={clsx(
                "p-4 border rounded-lg cursor-pointer text-center",
                selectBrand.id === brand?.id
                  ? "bg-custom-gradient text-white"
                  : "hover:bg-gray-200 dark:hover:bg-gray-400"
              )}
            >
              {" "}
              <img
                //@ts-ignore
                src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${brand?.logo}`}
                alt={brand.name}
                className="relative w-36 h-36 max-md:w-28 max-md:h-28
               max-sm:h-16 max-sm:w-16 mx-auto mb-4"
              />
              <div>{brand.name}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BrandSelection;
