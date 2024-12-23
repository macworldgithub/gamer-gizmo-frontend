"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AdState {
  pcInfo: string;
  graphicCard: string;
  ram: string;
  storage: string;
  lcdSize: string;
  adDescription: string;
  city: string;
  mobileNumber: string;
  secondaryNumber: string;
}

const initialState = {
  pcInfo: "",
  graphicCard: "",
  ram: "",
  storage: "",
  lcdSize: "",
  adDescription: "",
  city: "",
  mobileNumber: "",
  secondaryNumber: "",
};

const adSlice = createSlice({
  name: "adInformation",
  initialState,
  reducers: {
    // Dynamic reducer to update any field
    setAdField: (
      state,
      action: PayloadAction<{ field: keyof AdState; value: string }>
    ) => {
      state[action.payload.field] = action.payload.value;
    },
  },
});

export const { setAdField } = adSlice.actions;
export default adSlice;
