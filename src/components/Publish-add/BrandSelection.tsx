import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../Store/Store";
import clsx from "clsx";

const BrandSelection = ({
  selectCategory,
  setSelectedBrand,
  selectBrand,
  setComponentCategories,
}: any) => {
  return (
    <div className="w-full text-black  text-center">
      <h2 className="text-lg font-bold">Select Brand</h2>
      {loadingBrands ? (
        <p>Loading brands...</p>
      ) : brandError ? (
        <p className="text-red-500">{brandError}</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
          {brands?.map((brand) => (
            <div
              //@ts-ignore
              key={brand?.id}
              onClick={() => setSelectedBrand(brand)}
              className={clsx(
                "p-4 border rounded-lg cursor-pointer text-center",
                selectBrand.id === brand?.id
                  ? "bg-green-500 text-white"
                  : "hover:bg-gray-200 dark:hover:bg-gray-400"
              )}
            >
              {" "}
              <img
                //@ts-ignore
                src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${brand?.logo}`}
                alt={brand.name}
                className="mx-auto mb-2 w-16 h-16 object-contain"
              />
              <div>{brand.name}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BrandSelection;
