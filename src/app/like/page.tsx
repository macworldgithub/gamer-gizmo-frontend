import React from "react";
import FavoritesPage from "./FavoritesPage";
import MainPage from "./MainPage";
import Wrapper from "@/components/Common/Wrapper/Wrapper";
const page = () => {
  return (
    <Wrapper>
    <div className="flex">
      <FavoritesPage />
      <div className="">
        <MainPage />
      </div>
    </div>
    </Wrapper>
  );
};

export default page;
