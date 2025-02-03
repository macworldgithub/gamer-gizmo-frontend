import React from "react";
import FavoritesPage from "./FavoritesPage";
import MainPage from "./MainPage";
import Wrapper from "@/components/Common/Wrapper/Wrapper";
const page = () => {
  return (
    // <Wrapper>
    <div className="flex w-[100%] ">
      <div className="lg:w-[40rem] xl:w-[35rem] max-lg:hidden max-lg:w-0">
        <FavoritesPage />
      </div>
      <div className="lg:w-[55%] max-lg:w-full">
        <MainPage />
      </div>
    </div>
    // </Wrapper>
  );
};

export default page;
