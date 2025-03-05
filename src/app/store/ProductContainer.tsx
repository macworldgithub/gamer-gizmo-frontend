// "use client";

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import ProductGrid from "./ProductGrid";

// interface Product {
//   id: number;
//   name: string;
//   description: string;
//   price: string;
//   image: string;
// }

// const ProductContainer = () => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get(
//           `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/getAll`,
//           {
//             params: { is_store_product: "true" },
//           }
//         );

//         console.log("API Response:", response?.data);

//         setProducts(response.data?.data || response.data || []);
//       } catch (err) {
//         console.error("Error fetching products:", err);
//         setError("Failed to fetch products");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   if (loading) return <p className="text-center text-red-500">Loading...</p>;
//   if (error) return <p className="text-center text-red-500">{error}</p>;

//   return (
//     <div className="">
//       <h1 className="text-3xl max-md:text-lg font-bold text-center mt-2 dark:text-white">
//         Gamer Gizmo offers
//       </h1>
//       <ProductGrid products={products} />
//     </div>
//   );
// };

// export default ProductContainer;

"use client";

import React from "react";
import CategoryProductGrid from "./CategoryProductGrid";

const ProductContainer = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-center mt-2 dark:text-white">
        Gamer Gizmo Offers
      </h1>

      {/* Display products category-wise */}
      <CategoryProductGrid categoryId={1} categoryName="Laptops" />
      <CategoryProductGrid categoryId={2} categoryName="Desktops" />
      <CategoryProductGrid categoryId={3} categoryName="Components" />
      <CategoryProductGrid categoryId={4} categoryName="Consoles" />
    </div>
  );
};

export default ProductContainer;
