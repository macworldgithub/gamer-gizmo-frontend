import React from "react";
// import UsBlogs from "./UsBlogs";
import PageHeader from "@/components/PageHeader";
import ItemCard from "./ItemCard";

const page = () => {
  return (
    <div className="w-full bg-white dark:bg-black">
      <PageHeader pageName={"Blogs"} title="Blogs" />
      {/* <UsBlogs /> */}
      <ItemCard />
    </div>
  );
};

export default page;
