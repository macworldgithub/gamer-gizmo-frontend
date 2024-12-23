"use client";
import React from "react";
import { useState } from "react";
import { useSelector, UseSelector } from "react-redux";
import { RootState } from "../Store/Store";

const SubmissionButton = () => {
  const [disable, setDisable] = useState<boolean>(true);
  const adInformation = useSelector((state: RootState) => state.Ad);
  return (
    <div className="w-[65%] h-max   rounded py-5  box-border my-10 flex flex-col items-end max-sm:items-center">
      <button
        disabled={disable}
        className={`w-max text-nowrap h-[50px] ${
          disable ? "bg-disabled-button" : "bg-custom-gradient"
        }  p-5 text-center flex justify-center items-center text-white rounded-[50px]`}
      >
        <p>SUBMIT AND CONTINUE</p>
      </button>
    </div>
  );
};

export default SubmissionButton;
