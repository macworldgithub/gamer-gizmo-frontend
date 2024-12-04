"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    theme: "day",

};

const ThemeSlice = createSlice({
    name: "Theme",
    initialState,
    reducers: {
        changeTheme: (state) => {
            if (state.theme === "day") {
                state.theme = "night";
            } else {
                state.theme = "day";
            }
        },
    },
});

export const { changeTheme } = ThemeSlice.actions;
export default ThemeSlice;
