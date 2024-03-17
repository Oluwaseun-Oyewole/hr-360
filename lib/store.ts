import { registerSlice } from "@/app/auth/(auth)/register/query";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./root.reducers";

export const store = () => {
  return configureStore({
    reducer: {
      rootReducer,
      // [todoApi.reducerPath]: todoApi.reducer,
      [registerSlice.reducerPath]: registerSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({}).concat([registerSlice.middleware]),
    devTools: process.env.NODE_ENV !== "production",
  });
};

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
