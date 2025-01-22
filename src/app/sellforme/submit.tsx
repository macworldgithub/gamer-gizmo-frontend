"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector, UseSelector } from "react-redux";
import { RootState } from "../../components/Store/Store";

const SubmissionButton = () => {
  const [disable, setDisable] = useState<boolean>(true);
  const adInformation = useSelector((state: RootState) => state.SellForMe);

  function checkAdInformation(adInformation: any) {
    const emptyFields = Object.keys(adInformation).filter(
      (key) => !adInformation[key]
    );

    if (emptyFields.length > 0) {
      console.log("Empty fields:", emptyFields);
      return false;
    }
    return true;
  }

  // Then inside your component:
  useEffect(() => {
    const valid = checkAdInformation(adInformation);

    valid ? setDisable(false) : setDisable(true);
    // do something with `valid`
  }, [adInformation]);

  return (
    <div className="w-[65%] h-max   rounded py-5  box-border  flex flex-col items-end max-sm:items-center">
      <button
        disabled={disable}
        className={`w-max text-nowrap h-[50px] ${
          disable ? "bg-disabled-button" : "bg-custom-gradient"
        }  p-5 text-center flex justify-center items-center text-white rounded-[50px]`}
      >
        <p>CONTINUE</p>
      </button>
    </div>
  );
};

export default SubmissionButton;
