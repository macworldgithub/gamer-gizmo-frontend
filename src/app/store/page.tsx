import PageHeader from "@/components/PageHeader";
import React from "react";
import StorePage from "./Store";

const page = () => {
  return (
    <>
      <div>
        <PageHeader pageName="Store" title="Gamer Gizmo Store" />
      </div>
      <div>
        <StorePage />
      </div>
    </>
  );
};

export default page;
