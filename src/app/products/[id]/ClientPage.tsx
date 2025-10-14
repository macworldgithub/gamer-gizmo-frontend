"use client";
import PageHeader from "@/components/PageHeader";
import React, { useEffect, useState } from "react";
import ProductDetails from "./ProductDetails";
import AuthorSection from "./AuthorSection";
import RelatedNewsSection from "./RelatedNewsSection";
import Rightsection from "./Rightsection";
import CommentsSection from "./CommentsSection";
import ContactForm from "./ContactForm";
import PopularItemSection from "@/components/PopularItemSection";
import Wrapper from "@/components/Common/Wrapper/Wrapper";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/components/Store/Store";

// --- Interfaces ---
interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  imageUrl?: string;
  category_id?: number; // Assuming category_id is part of the product
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

const ClientPage: React.FC<{ initialProduct: Product }> = ({
  initialProduct,
}) => {
  const token = useSelector((state: RootState) => state.user.token);
  const [data, setData] = useState<Product | null>(initialProduct);
  const [loading, setLoading] = useState<boolean>(false);
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
      ? `/${getCategoryPath(data.category_id)}?category_id=${
          data.category_id
        }&condition=${data.condition}`
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

  // When initial product is available, fetch similar items
  useEffect(() => {
    if (initialProduct?.category_id) {
      fetchSimilarItems(initialProduct.category_id);
    }
    // keep state in sync in case we ever re-mount with a different product
    setData(initialProduct);
  }, [initialProduct?.id]);

  // keep a way to refetch similar items if child triggers seReftech
  useEffect(() => {
    if (data?.category_id) fetchSimilarItems(data.category_id);
  }, [fetcher]);

  return (
    <div className="w-full h-auto bg-white dark:bg-[#14161B]">
      <PageHeader pageName="details" title="Details" />
      <div className="w-full flex mb-2">
        <div className="w-[65%]  max-md:flex max-md:flex-col max-md:justify-center max-md:mx-auto">
          {loading && (
            <div className="p-6">
              <div className="animate-pulse space-y-4">
                <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-1/3" />
                <div className="h-64 bg-gray-200 dark:bg-gray-800 rounded" />
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-2/3" />
              </div>
            </div>
          )}

          {data && !loading && (
            <ProductDetails
              seReftech={seReftech}
              refetch={fetcher}
              data={data}
            />
          )}
          {/* <AuthorSection /> */}
          {/* <RelatedNewsSection /> */}
          <Wrapper className="mt-4 mx-6">
            {data && !loading && (
              <CommentsSection
                seReftech={seReftech}
                fetcher={fetcher}
                data={data}
              />
            )}
          </Wrapper>
          {/* <ContactForm /> */}
        </div>
        <div className="md:w-[35%] ">
          {data && !loading && <Rightsection data={data} />}
        </div>
      </div>

      {data && !loading && similarItems.length > 0 && (
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
      )}
    </div>
  );
};

export default ClientPage;
