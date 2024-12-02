"use client";
import { configureStore } from "@reduxjs/toolkit";
import currencySlice from "../Redux/CurrencySlice";

const Store = configureStore({
  reducer: {
    Currency: currencySlice.reducer, // Add more reducers here as needed
  },
});

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;

export default Store;
