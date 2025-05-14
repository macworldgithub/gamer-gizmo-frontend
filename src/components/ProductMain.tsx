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
import Wrapper from "@/components/Common/Wrapper/Wrapper";
import { sortByCreatedAt } from "@/app/utils/sort";

interface ProductMainProps {
  categoryId: number;
}

const categoryNames = {
  0: "Products",
  1: "Laptops",
  2: "Gaming PCS",
  3: "Components and Accessories",
  4: "Gaming Consoles",
};
const ProductMain = ({ categoryId, query }: any) => {
  const token = useSelector((state: RootState) => state.user.token);
  const [newData, setNewData] = useState([]);
  const [usedData, setUsedData] = useState([]);
  const [fetcher, seReftech] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const fetchProducts = async (
    categoryId: number,
    condition: number,
    pageNo = 1
  ) => {
    try {
      let url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/getAll?pageNo=${pageNo}`;
      if (categoryId !== 0) {
        url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/getAll?condition=${condition}&category_id=${categoryId}&pageNo=${pageNo}`;
      }

      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTotalCount(response?.data?.totalCount || 0);
      setTotalPages(Math.ceil(response?.data?.totalCount / 10) || 1);
      return sortByCreatedAt(response?.data?.data || []);
    } catch (err) {
      console.error("Failed to fetch products.");
      return [];
    }
  };

  const fetchFilteredProducts = async (pageNo = 1) => {
    try {
      const filteredValues = Object.fromEntries(
        Object.entries(query).filter(([key, value]) => value !== "")
      );

      let url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/getAll?pageNo=${pageNo}`;
      if (categoryId !== 0) {
        url += `&category_id=${categoryId}`;
      }

      // Add other query parameters
      const queryParams = new URLSearchParams(
        filteredValues as Record<string, string>
      ).toString();
      if (queryParams) {
        url += `&${queryParams}`;
      }

      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTotalCount(response?.data?.totalCount || 0);
      setTotalPages(Math.ceil(response?.data?.totalCount / 10) || 1);
      return sortByCreatedAt(response?.data?.data || []);
    } catch (err) {
      console.error("Failed to fetch filtered products.");
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const filteredValues = Object.fromEntries(
        Object.entries(query).filter(([key, value]) => value !== "")
      );

      if (!(Object.keys(filteredValues).length > 0)) {
        setFilteredData([]);
        const newProducts = await fetchProducts(categoryId, 1, currentPage);
        const usedProducts = await fetchProducts(categoryId, 2, currentPage);
        //@ts-ignore
        setNewData(newProducts);
        //@ts-ignore

        setUsedData(usedProducts);
      } else {
        const filteredProducts = await fetchFilteredProducts(currentPage);
        //@ts-ignore

        setFilteredData(filteredProducts);
      }
      setLoading(false);
    };
    fetchData();
  }, [categoryId, fetcher, token, query, currentPage]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filteredValues = Object.fromEntries(
    Object.entries(query).filter(([key, value]) => value !== "")
  );
  const categoryName =
    categoryNames[categoryId as keyof typeof categoryNames] ||
    "Unknown Category";

  return (
    <div className="h-auto w-full">
      {Object.keys(filteredValues).length > 0 ? (
        <>
          <div className="mt-4 md:mb-2 max-md:mb-4">
            <LiveAdSection
              category={`Popular ${categoryName}`}
              className="md:h-52 max-md:h-40"
              adId={1}
            />
          </div>
          <h1 className="font-bold text-2xl mb-4 dark:text-white">
            {Object.keys(filteredValues).length > 0
              ? ` ${Object.values(filteredValues)
                  .map((value) =>
                    value === "1" ? "New" : value === "2" ? "Used" : value
                  )
                  .join(", ")} ${categoryName}`
              : `Popular in ${categoryName}`}
          </h1>
          <div className="flex w-[100%]">
            <div className="flex items-start gap-2 max-md:w-full md:w-[70%] relative">
              <div className="flex-col flex flex-wrap gap-4 w-full justify-center max-sm:gap-[0.5rem]">
                {loading ? (
                  <div>Loading...</div>
                ) : filteredData && filteredData.length > 0 ? (
                  filteredData.map((product, index) => (
                    <>
                      <ProductCard
                        //@ts-ignore
                        key={product.id || index}
                        isColumn={true}
                        fetcher={fetcher}
                        refetch={fetcher}
                        seReftech={seReftech}
                        product={product}
                      />
                      <div className="h-[3px] w-full bg-bluishBorder"></div>
                      {index === 2 && <InspectionBadge />}
                      {index === 6 && (
                        <div className="w-[70%]">
                          <GetStartedBadge />
                        </div>
                      )}
                      {(index + 1) % 5 === 0 && (
                        <LiveAdSection
                          className="md:w-[100%] h-52 my-4"
                          category={`Popular ${categoryName}`}
                          adId={5 + Math.floor((index + 1) / 5) - 1}
                          // adId={2}
                        />
                      )}
                    </>
                  ))
                ) : (
                  <div className="text-red-600">No Product To display</div>
                )}
              </div>
            </div>
            <div className="w-[30%] max-md:w-0 max-md:hidden">
              <LiveAdSection
                category={`Popular ${categoryName}`}
                adId={2}
                className="w-[100%] ml-6 h-[36rem]"
              />
              <LiveAdSection
                category={`Popular ${categoryName}`}
                adId={3}
                className="w-[100%] ml-6 my-4 h-[36rem]"
              />
            </div>
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center items-center gap-4 my-6">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 bg-gray-800 text-white rounded ${
                currentPage === 1
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-700"
              }`}
            >
              Prev
            </button>
            <span className="text-lg font-semibold text-gray-700 dark:text-white">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage >= totalPages}
              className={`px-4 py-2 bg-gray-800 text-white rounded ${
                currentPage >= totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-700"
              }`}
            >
              Next
            </button>
          </div>

          <LiveAdSection
            category={`Popular ${categoryName}`}
            adId={4}
            className="w-[100%] h-[10rem] my-2"
          />
        </>
      ) : (
        <>
          <Wrapper className="flex w-full mt-4 gap-3">
            <LiveAdSection
              className="w-1/2 md:h-52 max-md:h-40 hidden sm:block"
              category={categoryName}
              adId={1}
            />
            <LiveAdSection
              category={categoryName}
              adId={2}
              className="w-1/2 md:h-52 max-md:h-40 hidden sm:block"
            />
          </Wrapper>
          <ProductSection
            title={`Popular in Used   ${categoryName}`}
            subtitle="Choose your necessary parts from this category."
            products={usedData}
            seReftech={seReftech}
            refetch={fetcher}
            explorePath={`/${
              categoryId == 1
                ? "laptops"
                : categoryId == 2
                ? "desktop"
                : categoryId == 3
                ? "components"
                : "console"
            }?condition=2`}
            onExplore={() => console.log("Explore Used Products")}
          />

          <ProductSection
            title={`Popular in New  ${categoryName}`}
            subtitle="Choose your necessary parts from this category."
            products={newData}
            seReftech={seReftech}
            refetch={fetcher}
            explorePath={`/${
              categoryId == 1
                ? "laptops"
                : categoryId == 2
                ? "desktop"
                : categoryId == 3
                ? "components"
                : "console"
            }?condition=1`}
            onExplore={() => console.log("Explore New Products")}
          />
          <div className="flex mx-6 w-full gap-3">
            <LiveAdSection
              category={categoryName}
              adId={3}
              className="w-[46%] md:h-52 max-md:h-40 hidden sm:block"
            />
            <LiveAdSection
              category={categoryName}
              adId={4}
              className="w-[48%] md:h-52 max-md:h-40 hidden sm:block"
            />
          </div>
        </>
      )}
      {loading && <CustomLoader />}
    </div>
  );
};

export default ProductMain;
