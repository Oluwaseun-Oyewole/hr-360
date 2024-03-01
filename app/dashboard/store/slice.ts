import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers(builder) {},
});

export const {} = dashboardSlice.actions;

export default dashboardSlice.reducer;
