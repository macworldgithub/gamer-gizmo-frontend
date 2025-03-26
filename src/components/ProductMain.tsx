import React, { useEffect, useState } from "react";
import ProductSection from "./ProductSection";
import { useSelector } from "react-redux";
import { RootState } from "./Store/Store";
import axios from "axios";
import CustomLoader from "./CustomLoader";
import ProductCard from "./ProductCard";
import LiveAdSection from "./LiveAd";
import GetStartedBadge from "./GetStartedBadge";
import InspectionBadge from "./InspectionBadge";

interface ProductMainProps {
  categoryId: number;
}

const categoryNames = {
  0: "Products",
  1: "Laptops",
  2: "Gaming PCs",
  3: "Components",
  4: "Gaming Consoles",
};
const ProductMain = ({ categoryId, query }: any) => {
  const token = useSelector((state: RootState) => state.user.token);
  const [newData, setNewData] = useState([]);
  const [usedData, setUsedData] = useState([]);
  const [fetcher, seReftech] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filteredData, setFilteredData] = useState([]);



  // Function to fetch products based on category and condition
  const fetchProducts = async (categoryId: number, condition: number) => {
    try {
      // If categoryId is not 0, add categoryId to the URL
      let url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/getAll`;
      if (categoryId == 0) {
        url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/getAll`;
      } else {
        url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/getAll?condition=${condition}&category_id=${categoryId}`;
      }

      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response?.data?.data || [];
    } catch (err) {
      console.error("Failed to fetch models.");
      return [];
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const filteredValues = Object.fromEntries(
        Object.entries(query).filter(([key, value]) => value !== "")
      );
      // @ts-expect-error

      const queryParams = new URLSearchParams(filteredValues).toString();
      console.log(filteredValues, "queryParams");
      if (!(Object.keys(filteredValues).length > 0)) {
        setFilteredData([]);
        console.log(query, "queryParams23424234");
        const newProducts = await fetchProducts(categoryId, 1);
        const usedProducts = await fetchProducts(categoryId, 2); // Used products
        setNewData(newProducts);
        setUsedData(usedProducts);
      } else {
        let url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/getAll?category_id=${categoryId}&${queryParams}`;
        if (categoryId == 0) {
          url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/getAll?${queryParams}`;
        } else {
          url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/getAll?category_id=${categoryId}&${queryParams}`;
        }
        const response = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFilteredData(response?.data?.data || []);
      }

      setLoading(false);
    };
    fetchData();
  }, [categoryId, fetcher, token, query]);
  console.log("lolll", filteredData);
  const filteredValues = Object.fromEntries(
    Object.entries(query).filter(([key, value]) => value !== "")
  );
  //@ts-ignore
  const categoryName = categoryNames[categoryId] || "Unknown Category";
  return (
    <div className="h-auto w-full">
      {/* For Used Products */}
      {Object.keys(filteredValues).length > 0 ? (
        <>
          <div className="mt-4 mb-2">
            {/* <GetStartedBadge /> */}
            <LiveAdSection className="h-52" />
          </div>
          <h1 className="font-bold text-2xl mb-4 dark:text-white">
            {Object.keys(filteredValues).length > 0
              ? ` ${Object.values(filteredValues)
                .map(value => value === "1" ? "New" : value === "2" ? "Used" : value)
                .join(", ")} ${categoryName}`
              : `Popular in ${categoryName}`}
          </h1>
          <div className="flex w-full">

            <div className="flex items-start gap-2 w-[70%]  relative">
              <div className="flex-col flex flex-wrap gap-4 w-[50%] justify-center max-sm:gap-[0.5rem] ">
                {filteredData && filteredData.length > 0 ? (
                  filteredData.map((product, index) => (
                    <ProductCard
                      isColumn={true}
                      fetcher={fetcher}
                      refetch={fetcher}
                      seReftech={seReftech}
                      product={product}
                    />
                  ))
                ) : (
                  <div className="text-red-600">No Product To display</div>
                )}
              </div>


            </div>
            <div className="w-[50%]">
              <LiveAdSection className="w-[90%] ml-6 h-[30rem] " />
              <LiveAdSection className="w-[90%] ml-6 my-4 h-[30rem] " />

            </div>
          </div>
          <InspectionBadge />

          <LiveAdSection className="w-[100%] h-[10rem] my-2" />
        </>
      ) : (
        <>
          <ProductSection
            title={`Popular in Used   ${categoryName}`}
            subtitle="Choose your necessary parts from this category."
            products={usedData}
            seReftech={seReftech}
            refetch={fetcher}
            explorePath={`/${categoryId == 1
              ? "laptops"
              : categoryId == 2
                ? "desktop"
                : categoryId == 3
                  ? "components"
                  : "console"
              }?condition=2`}
            //@ts-ignore
            // explorePath={`/${
            //   categoryNames[categoryId]?.toLowerCase() || "default"
            // }?condition=2`}
            onExplore={() => console.log("Explore Used Products")}
          />

          <ProductSection
            title={`Popular in New  ${categoryName}`}
            subtitle="Choose your necessary parts from this category."
            products={newData}
            seReftech={seReftech}
            refetch={fetcher}
            explorePath={`/${categoryId == 1
              ? "laptops"
              : categoryId == 2
                ? "desktop"
                : categoryId == 3
                  ? "components"
                  : "console"
              }?condition=1`}
            onExplore={() => console.log("Explore New Products")}
          />
        </>
      )}

      {loading && <CustomLoader />}
    </div>
  );
};

export default ProductMain;
