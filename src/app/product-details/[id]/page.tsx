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
const page = () => {
  const params = useParams();
  const token = useSelector((state: RootState) => state.user.token);
  const [data, setData] = useState([]);
  const [similarItems, setSimilarItems] = useState([]);
  const cardContent = {
    title: "Similar Ads",
    description:
      "Choose your necessary Parts from this Used Gaming Pc categories",
    note: "",
  };
  const fetchSimilarItems = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/getAll?category_id=1`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setSimilarItems(response?.data?.data || []);
    } catch (err) {
      console.error("Failed to fetch models.");
    }
  };
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
      if ((response.status = 200)) {
        setData(response.data.data);
      }
    } catch (err) {
      toast.error("Error");
    }
  };
  useEffect(() => {
    fetch();
    fetchSimilarItems();
  }, []);
  const usedConsoles = [
    {
      id: 1,
      name: "Radeon RX 580 OC...",
      description: "Powerful graphics card for gaming...",
      price: "AED 551.00",
      imageUrl: "/images/gpu.png",
    },
    {
      id: 2,
      name: "Asus ROG Hyperion...",
      description:
        "ROG Hyperion GR701 E-ATX computer case, 420 mm dual radiator support,....",
      price: "AED 1914.95",
      imageUrl: "/images/NewGPU1.png",
    },
    {
      id: 3,
      name: "MSI PRO B760M-E...",
      description:
        "The PRO Series is tailored to professionals from all walks of life. The lineup features...  ",
      price: "AED 422.64",
      imageUrl: "/images/NewGPU2.png",
    },
    {
      id: 4,
      name: "Bloody W95 Max RGB",
      description:
        "The A4Tech W95 Max Bloody mouse is the optimal solution for those looking for a high-quality and productive mouse",
      price: "AED 77.92",
      imageUrl: "/images/NewGPU3.png",
    },
    {
      id: 5,
      name: "Corsair VENGEANCE",
      description:
        "CORSAIR VENGEANCE RGB PRO Series DDR4 overclocked memory lights up your PC with mesmerizing ...",
      price: "AED 244.34",
      imageUrl: "/images/Newgpu4.png",
    },
  ];
  return (
    <div className="w-full h-auto bg-white dark:bg-[#14161B]">
      <PageHeader pageName="details" title="Details" />
      <div className="w-full  flex mb-10">
        <div className="w-[65%] max-md:w-[100%] max-md:flex max-md:flex-col max-md:justify-center max-md:mx-auto">
          <ProductDetails data={data} />
          <AuthorSection />
          <RelatedNewsSection />
          <CommentsSection />
          <ContactForm />
        </div>
        <div className="md:w-[35%] max-md:w-0">
          <Rightsection data={data} />
        </div>
      </div>

      <div>
        {/* <Wrapper> */}
        <div className="w-full h-auto">
          {/* Product Grid */}
          <PopularItemSection
            title="Similar Ads"
            subtitle="Choose your necessary gaming items from this category."
            products={similarItems}
            onExplore={() => console.log("Explore Used Consoles")}
            explorePath=""
          />
        </div>
        {/* </Wrapper> */}
      </div>
    </div>
  );
};

export default page;
