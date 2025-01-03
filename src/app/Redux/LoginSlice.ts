// // Redux/LoginSlice.ts
// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface LoginState {
//   isLoggedIn: boolean;
// }

// const initialState: LoginState = {
//   isLoggedIn: false, // Initially, the user is not logged in
// };

// const loginSlice = createSlice({
//   name: "login",
//   initialState,
//   reducers: {
//     setLogin: (state, action: PayloadAction<boolean>) => {
//       state.isLoggedIn = action.payload;
//     },
//   },
// });

// export const { setLogin } = loginSlice.actions;

// export default loginSlice;

// Redux/LoginSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LoginState {
  isLoggedIn: boolean;
}

const initialState: LoginState = {
  isLoggedIn: false, 
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setLogin: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export const { setLogin } = loginSlice.actions;

export default loginSlice.reducer; 
