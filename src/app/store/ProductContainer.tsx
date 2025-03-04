// import React from "react";
// import ProductGrid from "./ProductGrid";

// const ProductContainer = () => {
//   const fakeProducts = [
//     {
//       id: 1,
//       name: "Acer Predator Orion 5000",
//       description: "A powerful gaming desktop...",
//       price: "650000 AED",
//       image: "https://via.placeholder.com/150",
//     },
//     {
//       id: 2,
//       name: "ASUS ROG Strix G15",
//       description: "A premium gaming desktop...",
//       price: "420000 AED",
//       image: "https://via.placeholder.com/150",
//     },
//     {
//       id: 3,
//       name: "MSI Trident X",
//       description: "Compact and powerful...",
//       price: "350000 AED",
//       image: "https://via.placeholder.com/150",
//     },
//     {
//       id: 4,
//       name: "Alienware Aurora R12",
//       description: "High-end gaming experience...",
//       price: "700000 AED",
//       image: "https://via.placeholder.com/150",
//     },
//     {
//       id: 5,
//       name: "HP Omen 30L",
//       description: "Sleek design, powerful specs...",
//       price: "500000 AED",
//       image: "https://via.placeholder.com/150",
//     },
//     {
//       id: 6,
//       name: "Acer Predator Orion 5000",
//       description: "A powerful gaming desktop...",
//       price: "650000 AED",
//       image: "https://via.placeholder.com/150",
//     },
//     {
//       id: 7,
//       name: "ASUS ROG Strix G15",
//       description: "A premium gaming desktop...",
//       price: "420000 AED",
//       image: "https://via.placeholder.com/150",
//     },
//     {
//       id: 8,
//       name: "MSI Trident X",
//       description: "Compact and powerful...",
//       price: "350000 AED",
//       image: "https://via.placeholder.com/150",
//     },
//     {
//       id: 9,
//       name: "Alienware Aurora R12",
//       description: "High-end gaming experience...",
//       price: "700000 AED",
//       image: "https://via.placeholder.com/150",
//     },
//     {
//       id: 10,
//       name: "HP Omen 30L",
//       description: "Sleek design, powerful specs...",
//       price: "500000 AED",
//       image: "https://via.placeholder.com/150",
//     },
//   ];
//   return (
//     <div>
//       <h1 className="text-3xl font-bold text-center mb-6">Gaming Desktops</h1>
//       <ProductGrid products={fakeProducts} />
//     </div>
//   );
// };

// export default ProductContainer;
"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductGrid from "./ProductGrid";

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
}

const ProductContainer = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/getAll`,
          {
            params: { is_store_product: "true" },
          }
        );

        console.log("API Response:", response?.data);

        setProducts(response.data?.data || response.data || []);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p className="text-center text-white">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="">
      <h1 className="text-3xl max-md:text-lg font-bold text-center mt-2 dark:text-white">
        Gamer Gizmo offers
      </h1>

      <ProductGrid products={products} />
    </div>
  );
};

export default ProductContainer;
