"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function NotFoundPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [productResults, setProductResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      if (searchQuery.length > 2) {
        setLoading(true);
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/search`,
            {
              params: { query: searchQuery, limit: 10, pageNo: 1 },
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

  return (
    <div className=" min-h-screen py-20 text-center   dark:bg-black">
      <div className="w-full max-w-5xl mx-auto">
        {/* Heading */}
        <div className="flex items-center justify-center gap-3 mb-2">
          <img
            src="/images/not-found.png"
            className="w-16 h-16"
            alt="Not Found"
          />

          <h1 className="text-5xl md:text-6xl font-extrabold  text-secondaryColorLight">
            404
          </h1>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3">
          Page not found
        </h2>

        {/* Description */}
        <p className="mx-auto max-w-2xl text-base md:text-lg text-gray-600 dark:text-gray-400 mb-6">
          We’re sorry, we can not find the page you were looking for. If you
          typed in a URL, check it for errors.
        </p>

        {/* Search (FilterSection-like) */}
        <div className="flex justify-center mb-8">
          <div className="relative flex justify-center w-full max-w-[600px] px-4">
            <div className="flex items-center bg-transparent rounded-full py-2 border border-gray-300 shadow-md p-2 w-full h-[57px]">
              <i className="fas fa-search text-gray-500 mr-2"></i>
              <input
                type="text"
                placeholder="Find what you want"
                className="flex-1 outline-none bg-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {searchQuery && Array.isArray(productResults) && productResults.length === 0 && !loading && (
              <div className="bg-white border border-gray-300 shadow-md max-h-60 overflow-auto absolute z-50 w-full top-0 mt-[57px] rounded-lg transition-all duration-300 ease-in-out">
                <div className="p-4 text-center text-gray-500">No products found</div>
              </div>
            )}

            {searchQuery && Array.isArray(productResults) && productResults.length > 0 && (
              <div className="bg-white border border-gray-300 shadow-md max-h-60 overflow-auto absolute z-50 w-full top-0 mt-[57px] rounded-lg transition-all duration-300 ease-in-out">
                {loading ? (
                  <div className="p-4 flex justify-center items-center">
                    <div className="loader"></div>
                  </div>
                ) : (
                  productResults.map((product: any, ind: number) => (
                    <React.Fragment key={ind}>
                      <div
                        onClick={() => {
                          router.push(
                            `/products/${encodeURIComponent(
                              (product.name || "").replace(/\s+/g, "-").toLowerCase()
                            )}/${product.id}`
                          );
                        }}
                        className="p-4 hover:bg-gray-200 cursor-pointer transition-all duration-200 ease-in-out rounded-md"
                      >
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full overflow-hidden">
                            <Image
                              src={product?.images?.[0]?.image_url || "/images/placeholder.png"}
                              alt={product?.name || "Product"}
                              width={40}
                              height={40}
                              className="object-cover w-full h-full"
                            />
                          </div>
                          <p className="ml-4 text-black">
                            {(product.name || "").length > 40
                              ? `${product.name.slice(0, 40)}...`
                              : product.name}
                          </p>
                        </div>
                      </div>
                      <div
                        onClick={() => {
                          router.push(
                            `/products/${encodeURIComponent(
                              (product.name || "").replace(/\s+/g, "-").toLowerCase()
                            )}/${product.id}`
                          );
                        }}
                        className="p-2 bg-custom-gradient text-white text-center cursor-pointer rounded-b-md transition-all duration-200"
                      >
                        View
                      </div>
                    </React.Fragment>
                  ))
                )}
              </div>
            )}
          </div>
        </div>

        {/* Suggestions */}
        <p className="mb-3 text-base md:text-lg font-medium text-gray-800 dark:text-gray-200">
          Please try one of the following:
        </p>


        {/* CTAs */}
        <div className="mb-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-secondaryColorLight px-5 py-2.5 text-white shadow-sm transition hover:opacity-90"
          >
            Go to Home
          </Link>
          <Link
            href="/store"
            className="inline-flex items-center justify-center rounded-full border border-gray-300 px-5 py-2.5 text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-900"
          >
            Explore Store
          </Link>
        </div>

        <hr className="mx-auto w-full max-w-4xl border-gray-200 dark:border-gray-800 mb-8" />

        <div className="w-full max-w-5xl mx-auto">
          <h3 className="mb-4 text-center text-lg font-semibold text-gray-900 dark:text-gray-100">
            Shop by category
          </h3>

          {/* Category Buttons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { name: "Laptops", link: "/laptops" },
              { name: "Desktops", link: "/desktops" },
              { name: "Components", link: "/components" },
              { name: "Consoles", link: "/console" },
            ].map((cat) => (
              <Link
                key={cat.name}
                href={cat.link}
                className="flex items-center justify-center rounded-xl border border-gray-200 bg-white px-4 py-6 text-gray-900 dark:bg-transparent dark:border-gray-800 dark:text-gray-100 shadow-sm transition hover:shadow-md hover:scale-[1.02]"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
