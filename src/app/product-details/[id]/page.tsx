"use client";
import PageHeader from "@/components/PageHeader";
import React, { useEffect, useState } from "react";
import ProductDetails from "./ProductDetails";
import AuthorSection from "./AuthorSection";
import RelatedNewsSection from "./RelatedNewsSection";
import Rightsection from "./Rightsection";
import CommentsSection from "./CommentsSection";
import { useParams } from "next/navigation";
import ContactForm from "./ContactForm";
import PopularItemSection from "@/components/PopularItemSection";
import Wrapper from "@/components/Common/Wrapper/Wrapper";
import { toast } from "react-toastify";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/components/Store/Store";

// --- Interfaces ---
interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  imageUrl: string;
  category_id: number;  // Assuming category_id is part of the product
  [key: string]: any;
}

interface SimilarItem {
  id: number;
  name: string;
  description: string;
  price: string;
  imageUrl: string;
  [key: string]: any;
}

const page: React.FC = () => {
  const params = useParams();
  const token = useSelector((state: RootState) => state.user.token);
  const [data, setData] = useState<Product | null>(null);
  const [fetcher, seReftech] = useState(false);
  const [similarItems, setSimilarItems] = useState<SimilarItem[]>([]);

  const getCategoryPath = (categoryId: number) => {
    switch (categoryId) {
      case 1:
        return "desktop";
      case 2:
        return "laptop";
      case 3:
        return "gaming-console";
      default:
        return "explore";
    }
  };

  const explorePath =
    data && data.category_id && data.condition !== undefined
      ? `/${getCategoryPath(data.category_id)}?category_id=${data.category_id}&condition=${data.condition}`
      : "/explore";


  // --- Function to Fetch Similar Items Based on Category ID ---
  const fetchSimilarItems = async (categoryId: number) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/getAll?category_id=${categoryId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSimilarItems(response?.data?.data || []);
    } catch (err) {
      console.error("Failed to fetch similar items.");
    }
  };

  // --- Function to Fetch Product Data ---
  const fetch = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/getProductById?id=${params.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setData(response.data.data);
        // Fetch similar items based on the product's category_id
        fetchSimilarItems(response.data.data.category_id);
      }
    } catch (err) {
      toast.error("Error");
    }
  };

  console.log(data, "product data");


  useEffect(() => {
    fetch();
  }, [fetcher]);

  return (
    <div className="w-full h-auto bg-white dark:bg-[#14161B]">
      <PageHeader pageName="details" title="Details" />
      <div className="w-full flex mb-2">
        <div className="w-[65%] max-md:w-[100%] max-md:flex max-md:flex-col max-md:justify-center max-md:mx-auto">
          {data && (
            <ProductDetails seReftech={seReftech} refetch={fetcher} data={data} />
          )}
          {/* <AuthorSection /> */}
          {/* <RelatedNewsSection /> */}
          <Wrapper className="mt-4 mx-6">
            {data && (
              <CommentsSection
                seReftech={seReftech}
                fetcher={fetcher}
                data={data}
              />
            )}
          </Wrapper>
          {/* <ContactForm /> */}
        </div>
        <div className="md:w-[35%] max-md:w-0">
          {data && <Rightsection data={data} />}
        </div>
      </div>

      <div className="w-full h-auto">
        <PopularItemSection
          title="Similar Ads"
          seReftech={seReftech}
          refetch={fetcher}
          subtitle="Choose your necessary gaming items from this category."
          products={similarItems}
          onExplore={() => console.log("Explore Similar Ads")}
          // explorePath=""
          explorePath={explorePath}
        />
      </div>
    </div>
  );
};

export default page;
