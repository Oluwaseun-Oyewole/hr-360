import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: false,
};

const authSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers(builder) {},
});

export const assessmentActions = authSlice.actions;

export default authSlice.reducer;
