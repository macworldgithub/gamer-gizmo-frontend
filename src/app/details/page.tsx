import PageHeader from "@/components/PageHeader";
import React from "react";
import ProductDetails from "./ProductDetails";
import AuthorSection from "./AuthorSection";
import RelatedNewsSection from "./RelatedNewsSection";

const page = () => {
  return (
    <div className="w-full bg-white">
      <PageHeader pageName="details" title="Details" />
      <div className="w-full h-auto flex mb-10">
        <div className="w-[70%]">
          <ProductDetails />
          <AuthorSection />
          <RelatedNewsSection />
        </div>
        <div className="w-[30%] bg-orange-200">world</div>
      </div>
    </div>
  );
};

export default page;
