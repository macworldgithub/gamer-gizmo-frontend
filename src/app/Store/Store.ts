"use client";
import { configureStore } from "@reduxjs/toolkit";
import currencySlice from "../Redux/CurrencySlice";
import ThemeSlice from "../Redux/ThemeSlice";
import adSlice from "../Redux/AddSlice";

const Store = configureStore({
  reducer: {
    Ad: adSlice.reducer,
    Currency: currencySlice.reducer, // Add more reducers here as needed
    Theme: ThemeSlice.reducer,
  },
});

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;

export default Store;
