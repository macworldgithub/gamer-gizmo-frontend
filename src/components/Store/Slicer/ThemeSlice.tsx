"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme:
    typeof window !== "undefined" ? localStorage.getItem("theme") : "light",
};

const ThemeSlice = createSlice({
  name: "Theme",
  initialState,
  reducers: {
    changeTheme: (state) => {
      if (state.theme === "dark") {
        state.theme = "light";
      } else {
        state.theme = "dark";
      }
    },
  },
});

export const { changeTheme } = ThemeSlice.actions;
export default ThemeSlice;
