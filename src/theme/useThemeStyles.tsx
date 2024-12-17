// useThemeStyles.ts

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export const useThemeStyles = () => {
  const theme = useSelector((state: any) => state.Theme.theme);

  const [themeStyles, setThemeStyles] = useState({
    headingTextColor: "text-black",
    borderColor: "shadow-combinedDay",
    inputTextColor: "text-black",
    inputBorderColor: "",
    inputBackgroundColor: "bg-customPurple",
    backgroundColor: "bg-white",
    loginBackgroundColor: "bg-white",
  });

  useEffect(() => {
    if (theme === "day") {
      setThemeStyles({
        headingTextColor: "text-black",
        borderColor: "shadow-combinedDay",
        inputTextColor: "text-black",
        inputBorderColor: "",
        inputBackgroundColor: "bg-customPurple",
        backgroundColor: "bg-white",
        loginBackgroundColor: "bg-white",
      });
    } else {
      setThemeStyles({
        headingTextColor: "text-white",
        borderColor: "shadow-combinedNight",
        inputTextColor: "text-white",
        inputBorderColor: "border-customPurpleBorder",
        inputBackgroundColor: "bg-black",
        backgroundColor: "bg-customBg",
        loginBackgroundColor: "bg-black",
      });
    }
  }, [theme]);

  return themeStyles;
};
