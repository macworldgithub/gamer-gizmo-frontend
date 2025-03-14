import Image from "next/image";
import React, { useEffect, useState } from "react";
import SelectLabels from "./SelectLabels";
import axios from "axios";
import { useRouter } from "next/navigation";

const SearchBar = ({ categoryId }: any) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [productResults, setProductResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const fetchProducts = async () => {
      if (searchQuery.length > 2) {
        setLoading(true);
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/getAll?title=${searchQuery}&category_id=${categoryId}&pageNo=1`
          );
          setProductResults(response.data.data);
        } catch (error) {
          console.error("Error fetching products:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setProductResults([]);
      }
    };

    const debounceFetch = setTimeout(fetchProducts, 500);
    return () => clearTimeout(debounceFetch);
  }, [searchQuery, categoryId]);


  return (
    <div className="w-full h-auto bg-cover dark:bg-black bg-black bg-[url('/images/curve.png') md:hidden">
   
       
        <div className="relative flex justify-center">
            <div className="flex items-center bg-transparent rounded-full py-2 border border-gray-300 shadow-md p-2 w-80 mt-2  h-[57px] mb-4">
              <i className="fas fa-search text-gray-500 mr-2"></i>
              <input
                type="text"
                placeholder="Find what you want"
                className="flex-1 outline-none bg-transparent text-white placeholder-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

          {searchQuery && productResults.length === 0 && !loading && (
            <div className="bg-white border border-gray-300 shadow-md max-h-60 overflow-auto absolute z-50 w-[600px] top-0 mt-[57px] rounded-lg transition-all duration-300 ease-in-out">
              <div className="p-4 text-center text-gray-500">
                No products found
              </div>
            </div>
          )}

          {searchQuery && productResults.length > 0 && (
            <div className="bg-white border border-gray-300 shadow-md max-h-60 overflow-auto absolute z-50 w-80 top-0 mt-[57px] rounded-lg transition-all duration-300 ease-in-out">
              {loading ? (
                <div className="p-4 flex justify-center items-center">
                  <div className="loader"></div> {/* Custom Loader */}
                </div>
              ) : (
                productResults.map((product, ind) => (
                  <>
                    <div
                      onClick={() => {
                        // @ts-expect-error kuhn mhj
                        router.push(`/product-details/${product.id}`);
                      }}
                      key={ind}
                      className="p-4 hover:bg-gray-200 cursor-pointer transition-all duration-200 ease-in-out rounded-md"
                    >
                      <div className="flex items-center">
                        <Image
                          // @ts-expect-error kuhn mhj
                          src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${product?.images[0]?.image_url}`}
                          // @ts-expect-error kuhn mhj
                          alt={product.name}
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                        {/* @ts-expect-error jkh h */}
                        <p className="ml-4">{product.name}</p>
                      </div>
                    </div>
                    <div
                      onClick={() =>
                        router.push(`/products?title=${searchQuery}&category_id=${categoryId}`)
                      } // Navigates to a page showing all products
                      className="p-2 bg-custom-gradient text-white text-center cursor-pointer rounded-b-md  transition-all duration-200"
                    >
                      View All
                    </div>
                  </>
                ))
              )}
            </div>
          )}
        </div>
    </div>
  );
};

export default SearchBar;
