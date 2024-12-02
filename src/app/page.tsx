"use client";

import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "./Store/Store";

import { useState } from "react";
import { changeCurrencyTo } from "./Redux/CurrencySlice";

export default function Home() {
  const dispatch = useDispatch();
  const { currency, currencyRate } = useSelector(
    (state: RootState) => state?.Currency
  );
  const [value, setValue] = useState<string>("");

  return (
    <div className="w-full h-max flex justify-center">
      {currencyRate}
      {currency}
      <input value={value} onChange={(e) => setValue(e.target.value)} />
      <button
        onClick={() =>
          dispatch(changeCurrencyTo({ currency: "PKR", rate: 589 }))
        }
      >
        Click me
      </button>
    </div>
  );
}
