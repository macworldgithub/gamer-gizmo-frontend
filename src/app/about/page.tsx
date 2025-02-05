import React from "react";
import UsAbout from "./UsAbout";
import PageHeader from "@/components/PageHeader";
const page = () => {
  return (
    <div className="w-full bg-white dark:bg-black">
      <PageHeader pageName={"About Us"} title="About Us" />
      <UsAbout />
    </div>
  );
};

export default page;
