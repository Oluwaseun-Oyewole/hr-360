import { createSlice } from "@reduxjs/toolkit";
import { DashboardSlice as api } from "./query";

const initialState = {
  data: [],
  isLoading: false,
  isFilter: false,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    stopFilter(state) {
      state.isFilter = false;
    },
    startFilter(state) {
      state.isFilter = true;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(api.endpoints.getAllEmployees.matchPending, (state) => {
      state.isLoading = true;
    });
    builder.addMatcher(
      api.endpoints.getAllEmployees.matchFulfilled,
      (state, action) => {
        state.isLoading = false;
        state.isFilter = false;
        state.data = action.payload?.data;
      }
    );
    builder.addMatcher(
      api.endpoints.getSearchEmployees.matchPending,
      (state) => {
        state.isLoading = true;
      }
    );
    builder.addMatcher(
      api.endpoints.getSearchEmployees.matchFulfilled,
      (state, { payload }) => {
        state.isLoading = false;
        state.isFilter = true;
        state.data = payload?.data;
      }
    );
    builder.addMatcher(
      api.endpoints.getFilterEmployees.matchPending,
      (state) => {
        state.isLoading = true;
      }
    );
    builder.addMatcher(
      api.endpoints.getFilterEmployees.matchFulfilled,
      (state, { payload }) => {
        state.isLoading = false;
        state.isFilter = true;
        state.data = payload?.data;
      }
    );
  },
});

export const { stopFilter, startFilter } = dashboardSlice.actions;

export default dashboardSlice.reducer;
