"use client";
import React, { useLayoutEffect } from "react";
import FavoritesPage from "./FavoritesPage";
import MainPage from "./MainPage";
import Wrapper from "@/components/Common/Wrapper/Wrapper";
import { RootState } from "@/components/Store/Store";
import { useSelector } from "react-redux";

import { redirect } from "next/navigation";
const page = () => {
  const token = useSelector((state: RootState) => state.user.token);

  useLayoutEffect(() => {
    if (!token) {
      return redirect("/auth/login");
    }
  }, []);
  return (
    // <Wrapper>
    <div className="flex w-[100%]  min-h-screen dark:bg-black">
      {/* <div className="lg:w-[40rem] xl:w-[35rem] max-lg:hidden max-lg:w-0">
        <FavoritesPage />
      </div> */}
      <div className="w-full">
        <MainPage />
      </div>
    </div>
    // </Wrapper>
  );    
};

export default page;
