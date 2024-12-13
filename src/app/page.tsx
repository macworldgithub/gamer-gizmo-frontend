"use client";

import CategoriesComponent from "@/components/CategoriesComponent";
import DrawerComponent from "@/components/DrawerComponent";
import FilterSection from "@/components/FilterSection";
import Section from "@/components/PopularItemSection";
import PopularMainSection from "@/components/PopularMainSection";

export default function HomePage() {



  return (
    <>
      <FilterSection />
      <CategoriesComponent />
      <CategoriesComponent />
      <PopularMainSection />
    </>

  );
}
