import PageHeader from "@/components/PageHeader";
import React from "react";
import ProductDetails from "./ProductDetails";
import AuthorSection from "./AuthorSection";
import RelatedNewsSection from "./RelatedNewsSection";
import Rightsection from "./Rightsection";
import CommentsSection from "./CommentsSection";

const page = () => {
  return (
    <div className="w-full h-auto bg-white">
      <PageHeader pageName="details" title="Details" />
      <div className="w-full  flex mb-10">
        <div className="w-[70%] ">
          <ProductDetails />
          <AuthorSection />
          <RelatedNewsSection />
          <CommentsSection />
        </div>
        <div className="w-[30%] ">
          <Rightsection />
        </div>
      </div>
    </div>
  );
};

export default page;
