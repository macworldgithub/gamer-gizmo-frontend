import Image from "next/image";
import React, { useEffect, useState } from "react";
import SelectLabels from "./SelectLabels";
import axios from "axios";
import { useRouter } from "next/navigation";
interface ProductImage {
  id: number;
  image_url: string;
}

interface Product {
  id: number;
  name: string;
  price: string;
  category: string;
  category_id: number;
  brand: string;
  brand_id: number;
  model?: string;
  model_id?: number;
  images: ProductImage[];
}
interface Props {
  productResults: Product[];
}


const FilterSection = () => {
  const [isVisible, setIsVisible] = useState(window.innerWidth > 768);
  const [searchQuery, setSearchQuery] = useState("");
  // const [productResults, setProductResults] = useState([]);
  const [productResults, setProductResults] = useState<Product[]>([]);

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     if (searchQuery.length > 2) {
  //       setLoading(true);
  //       try {
  //         const response = await axios.get(
  //           `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/getAll?title=${searchQuery}&pageNo=1`
  //         );
  //         setProductResults(response.data.data);
  //       } catch (error) {
  //         console.error("Error fetching products:", error);
  //       } finally {
  //         setLoading(false);
  //       }
  //     } else {
  //       setProductResults([]);
  //     }
  //   };

  //   const debounceFetch = setTimeout(fetchProducts, 500);
  //   return () => clearTimeout(debounceFetch);
  // }, [searchQuery]);

  // useEffect(() => {
  //   const handleResize = () => {
  //     setIsVisible(window.innerWidth > 768);
  //   };
  //   window.addEventListener("resize", handleResize);
  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);
  useEffect(() => {
    const fetchProducts = async () => {
      if (searchQuery.length > 2) {
        setLoading(true);
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/search`,
            {
              params: {
                query: searchQuery,
                limit: 10,
                pageNo: 1,
              },
            }
          );

          if (response.data?.products) {
            setProductResults(response.data.products);
          } else {
            setProductResults([]);
          }
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
  }, [searchQuery]);

  useEffect(() => {
    const handleResize = () => {
      setIsVisible(window.innerWidth > 768);
    };

    // Call it once on mount to initialize
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  return (
    <div className="w-full h-auto bg-cover dark:bg-black bg-black bg-[url('/images/curve.webp')] max-md:hidden">
      <div className="max-lg:min-h-[50%] sm:h-auto w-full max-md:h-[50rem] max-xl:max-h-[75%] pt-7 pb-4 bg-curve-light dark:bg-curve-dark relative flex flex-col justify-center items-center bg-cover bg-center bg-no-repeat ">
        <p className="text-white font-bold max-md:text-[1.4rem] md:text-[2.5rem] max-sm:whitespace-nowrap">
          A Premier Marketplace for Gamers
        </p>
        <p className="text-white font-bold max-md:text-[1.4rem] md:text-[2.5rem] mb-2">
          where Gamers gear up
        </p>
        <p className="text-white max-md:font-light md:font-medium md:text-lg max-md:text-xs mb-2">
          Shop a Wide Range of Accessories for Every Device
        </p>

        <div className="relative flex justify-center">
          {isVisible && (
            <div className="flex items-center bg-transparent rounded-full py-2 border border-gray-300 shadow-md p-2 w-[600px] h-[57px] mb-4">
              <i className="fas fa-search text-gray-500 mr-2"></i>
              <input
                type="text"
                placeholder="Find what you want"
                className="flex-1 outline-none bg-transparent text-white placeholder-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          )}

          {/* {searchQuery && productResults.length === 0 && !loading && ( */}
          {searchQuery && Array.isArray(productResults) && productResults.length === 0 && !loading && (


            <div className="bg-white border border-gray-300 shadow-md max-h-60 overflow-auto absolute z-50 w-[600px] top-0 mt-[57px] rounded-lg transition-all duration-300 ease-in-out">
              <div className="p-4 text-center text-gray-500">
                No products found
              </div>
            </div>
          )}

          {/* {searchQuery && productResults.length > 0 && ( */}
          {searchQuery && Array.isArray(productResults) && productResults.length > 0 && (

            <div className="bg-white border border-gray-300 shadow-md max-h-60 overflow-auto absolute z-50 w-[600px] top-0 mt-[57px] rounded-lg transition-all duration-300 ease-in-out">
              {loading ? (
                <div className="p-4 flex justify-center items-center">
                  <div className="loader"></div> {/* Custom Loader */}
                </div>
              ) : (

                productResults.map((product, ind) => (
                  <>
                    <div
                      onClick={() => {
                        router.push(`/product-details/${product.id}`);
                      }}
                      key={ind}
                      className="p-4 hover:bg-gray-200 cursor-pointer transition-all duration-200 ease-in-out rounded-md"
                    >
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full overflow-hidden">
                          <Image
                            src={product?.images[0]?.image_url}
                            alt={product.name}
                            width={40}
                            height={40}
                            className="object-cover w-full h-full"
                          />
                        </div>


                        <p className="ml-4 text-black">

                          {product.name?.length > 30 ? product.name.slice(0, 40) + '...' : product.name}
                        </p>

                      </div>
                    </div>
                    <div
                      onClick={() =>
                        router.push(`/products?title=${searchQuery}`)
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

        <SelectLabels route="search-product" />
      </div>
    </div>
  );
};

export default FilterSection;
