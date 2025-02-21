"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../components/Store/Store";

const SubmissionButton = () => {
  const [disable, setDisable] = useState<boolean>(true);
  const adInformation = useSelector((state: RootState) => state.SellForMe);

  // 🔹 List of required fields
  const requiredFields = [
    "processorVariant", "processor", "ram", "storageType", "storage", "gpu",
    "brand", "model", "location", "screenSize", "screenResolution", "weight",
    "graphics", "ports", "batteryLife", "color", "price", "quantity"
  ];

  function checkAdInformation(adInfo: Record<string, string>) {
    // 🔹 Check if all required fields are filled
    const emptyFields = requiredFields.filter(
      (field) => !adInfo[field] || adInfo[field].trim() === ""
    );

    if (emptyFields.length > 0) {
      console.log("Empty fields:", emptyFields);
      return false;
    }
    return true;
  }

  useEffect(() => {
    if (adInformation) {
      const valid = checkAdInformation(adInformation);
      setDisable(!valid);
    }
  }, [adInformation]);

  return (
    <div className="w-[65%] h-max rounded py-5 flex flex-col items-end max-sm:items-center">
      <button
        disabled={disable}
        className={`w-max h-[50px] hover:bg-custom-gradient ${
          disable ? "bg-disabled-button" : "bg-custom-gradient"
        } p-5 text-center flex justify-center items-center text-white rounded-[50px]`}
      >
        <p className="dark:text-black">CONTINUE</p>
      </button>
    </div>
  );
};

export default SubmissionButton;
