import React, { useEffect, useState } from "react";
import ProductSection from "./ProductSection";
import { useSelector } from "react-redux";
import { RootState } from "./Store/Store";
import axios from "axios";

interface ProductMainProps {
  categoryId: number;
}

const categoryNames = {
  1: "Laptops",
  2: "Desktops",
  3: "Consoles",
  4: "Components",
};
const ProductMain: React.FC<ProductMainProps> = ({ categoryId }) => {
  const token = useSelector((state: RootState) => state.user.token);
  const [newData, setNewData] = useState([]);
  const [usedData, setUsedData] = useState([]);
  const [fetcher, seReftech] = useState(false);

  // Function to fetch products based on category and condition
  const fetchProducts = async (categoryId: number, condition: number) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/getAll?category_id=${categoryId}&condition=${condition}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response?.data?.data || [];
    } catch (err) {
      console.error("Failed to fetch models.");
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const newProducts = await fetchProducts(categoryId, 1); // New products
      const usedProducts = await fetchProducts(categoryId, 2); // Used products
      setNewData(newProducts);
      setUsedData(usedProducts);
    };

    fetchData();
  }, [categoryId, fetcher, token]);
  //@ts-ignore
  const categoryName = categoryNames[categoryId] || "Unknown Category";
  return (
    <div className="h-auto w-full">
      {/* For Used Products */}
      <ProductSection
        title={`Popular in Used   ${categoryName}`}
        subtitle="Choose your necessary parts from this category."
        products={usedData}
        seReftech={seReftech}
        refetch={fetcher}
        explorePath="/"
        onExplore={() => console.log("Explore Used Products")}
      />

      {/* For New Products */}
      <ProductSection
        title={`Popular in New  ${categoryName}`}
        subtitle="Choose your necessary parts from this category."
        products={newData}
        seReftech={seReftech}
        refetch={fetcher}
        explorePath="/"
        onExplore={() => console.log("Explore New Products")}
      />
    </div>
  );
};

export default ProductMain;
