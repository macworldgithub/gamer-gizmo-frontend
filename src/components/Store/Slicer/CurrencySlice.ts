"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currencyRate: 3.67,
  currency: "AED",
  defaultCurrency: "USD",
  defaultCurrencyRate: 1,
};

const currencySlice = createSlice({
  name: "Currency",
  initialState,
  reducers: {
    changeCurrencyTo: (state, action) => {
      const { currency, rate } = action.payload;

      state.currency = currency;
      state.currencyRate = rate;
    },
  },
});

export const { changeCurrencyTo } = currencySlice.actions;
export default currencySlice;
