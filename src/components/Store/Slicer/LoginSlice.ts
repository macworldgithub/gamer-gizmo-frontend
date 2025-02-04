import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserDataState {
  token: string | null;
  id: number | null;
  username: string | null;
  email: string | null;
  first_name: string | null;
  last_name: string | null;
  is_seller: boolean | null;
  is_email_verified: boolean | null;
  created_at: string | null;
  phone: string | null;
  is_admin_verified: false | null;
  dob: string | null;
  profile: string | null;
  gender: string | null;
  nic_front_image: string | null;
  nic_back_image: string | null;
  address: string | null;
}

const initialState: UserDataState = {
  token: null,
  id: null,
  profile: null,
  username: null,
  email: null,
  first_name: null,
  last_name: null,
  is_seller: null,
  is_email_verified: null,
  created_at: null,
  phone: null,
  is_admin_verified: null,
  dob: null,
  gender: null,
  nic_front_image: null,
  nic_back_image: null,
  address: null,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    InitializeUserData: (state, action: PayloadAction<UserDataState>) => {
      return { ...state, ...action.payload };
    },
    updateUserData: (
      state,
      action: PayloadAction<{ key: keyof UserDataState; value: any }>
    ) => {
      const { key, value } = action.payload;
      state[key] = value;
    },
    clearUserData: () => initialState,
  },
});

export const { InitializeUserData, updateUserData, clearUserData } =
  loginSlice.actions;

export default loginSlice.reducer;
