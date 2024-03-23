import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const registerSlice = createApi({
  reducerPath: "todo",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3002/api/",
  }),
  tagTypes: ["Post"],
  endpoints: (builder) => ({
    addNewUser: builder.mutation({
      query: (payload) => ({
        url: "register",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Post"],
    }),
  }),
});

export const { useAddNewUserMutation } = registerSlice;
