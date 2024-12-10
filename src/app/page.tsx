"use client";

import CategoriesComponent from "@/components/CategoriesComponent";
import DrawerComponent from "@/components/DrawerComponent";
import FilterSection from "@/components/FilterSection";

export default function HomePage() {



  return (
    <>
      <FilterSection />
      <CategoriesComponent/>
      {/* <DrawerComponent /> */}
    </>

  );
}
