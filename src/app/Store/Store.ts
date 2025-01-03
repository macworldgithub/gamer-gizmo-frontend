"use client";
import { configureStore } from "@reduxjs/toolkit";
import currencySlice from "../Redux/CurrencySlice";
import ThemeSlice from "../Redux/ThemeSlice";
import adSlice from "../Redux/AddSlice";
import sellForMeSlice from "../Redux/SellForMeSlice";
import Login from "../Auth/login/page";
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
