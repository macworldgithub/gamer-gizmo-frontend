// "use client";
// import PageHeader from "@/components/PageHeader";
// import React from "react";
// import HeroSection from "./HeroSection";
// import { useSearchParams } from "next/navigation";
// const page = () => {
//   const params = useSearchParams();

//   // Define an object with the possible query parameters
//   const queryParams = [
//     "processor",
//     "storage",
//     "location",
//     "condition",
//     "gpu",
//     "ram",
//     "price",
//     "title",
//   ];

//   // Initialize an object to store the parameters
//   const queryObject = {};

//   // Loop through the queryParams array and extract each one from URL search params
//   queryParams.forEach((param) => {
//     const value = params.get(param);
//     // @ts-expect-error
//     queryObject[param] = value ? value : "";
//   });

//   return (
//     <div className="w-full">
//       <PageHeader
//         pageName="products"
//         title={`Serached Product : ${params.get("title")}`}
//       />
//       <HeroSection query={queryObject} />
//     </div>
//   );
// };

// export default page;
"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";

const ProductsSearchPage = () => {
  const params = useSearchParams();
  const title = params.get("title") || "";
  const categoryId = params.get("category_id") || "";
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/getAll?pageNo=1`;
        if (categoryId) url += `&category_id=${categoryId}`;
        if (title) url += `&title=${title}`;
        const res = await fetch(url);
        const data = await res.json();
        setProducts(data.data || []);
      } catch (err) {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [title, categoryId]);

  return (
    <div className="w-full p-4">
      <h2 className="text-xl font-bold mb-4">
        {title ? `Search Results for "${title}"` : "All Products"}
      </h2>
      {loading ? (
        <div>Loading...</div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div>No products found.</div>
      )}
    </div>
  );
};

export default ProductsSearchPage;
