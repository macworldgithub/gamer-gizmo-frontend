"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SellForMe {
  pcInfo: string;
  graphicCard: string;
  ram: string;
  storage: string;
  motherboard: string;
  city: string;
  mobileNumber: string;
  name: string;
  address: string;
  country: string;
}

const initialState = {
  pcInfo: "",
  graphicCard: "",
  ram: "",
  storage: "",
  motherboard: "",
  city: "",
  mobileNumber: "",
  name: "",
  address: "",
  country: "",
};

const sellForMeSlice = createSlice({
  name: "sellForMe",
  initialState,
  reducers: {
    // Dynamic reducer to update any field
    setAdField: (
      state,
      action: PayloadAction<{ field: keyof SellForMe | string; value: string }>
    ) => {
      //@ts-ignore
      state[action.payload.field] = action.payload.value;
    },
  },
});

export const { setAdField } = sellForMeSlice.actions;
export default sellForMeSlice;
