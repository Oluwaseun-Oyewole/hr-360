import { DashboardSlice } from "@/app/dashboard/store/query";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./root.reducers";

export const store = () => {
  return configureStore({
    reducer: {
      rootReducer,
      [DashboardSlice.reducerPath]: DashboardSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({}).concat([DashboardSlice.middleware]),
    devTools: process.env.NODE_ENV !== "production",
  });
};

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
