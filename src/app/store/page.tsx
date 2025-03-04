"use client";
import PageHeader from "@/components/PageHeader";
import ProductContainer from "./ProductContainer";

const page = () => {
  return (
    <div className="dark:bg-secondaryBlack">
      <div className="">
        <PageHeader pageName="Store" title="Gamer Gizmo Store" />
      </div>
      <div>
        <ProductContainer />
      </div>
    </div>
  );
};

export default page;
