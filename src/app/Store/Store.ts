"use client";
import { configureStore } from "@reduxjs/toolkit";
import adSlice from "../Redux/AddSlice";
import currencySlice from "../Redux/CurrencySlice";
import sellForMeSlice from "../Redux/SellForMeSlice";
import ThemeSlice from "../Redux/ThemeSlice";
import loginSlice from "../Redux/LoginSlice";

const Store = configureStore({
  reducer: {
    SellForMe: sellForMeSlice.reducer,
    Ad: adSlice.reducer,
    Currency: currencySlice.reducer, // Add more reducers here as needed
    Theme: ThemeSlice.reducer,
    login: loginSlice
  },
});

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;

export default Store;
