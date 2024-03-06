import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    isAuthenticated: (state) => {
      state.currentUser = false;
    },
  },
});

export const { isAuthenticated } = authSlice.actions;

export default authSlice.reducer;
