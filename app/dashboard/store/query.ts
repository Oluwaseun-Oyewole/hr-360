import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type TodoType = {
  completed: boolean;
  id: number;
  title: string;
  userId: number;
};
export const todoApi = createApi({
  reducerPath: "todo",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com/todos/",
  }),
  tagTypes: ["Post"],
  endpoints: (builder) => ({
    getTodoByName: builder.query({
      query: (id) => ({ url: `/${id}` }),
    }),
    addNewPost: builder.mutation({
      query: (payload) => ({
        url: "/posts",
        method: "POST",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["Post"],
    }),
  }),
});

export const { useGetTodoByNameQuery, useAddNewPostMutation } = todoApi;
