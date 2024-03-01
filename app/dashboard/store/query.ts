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
  endpoints: (builder) => ({
    getTodoByName: builder.query<TodoType, string>({
      query: (id) => ({ url: `/${id}` }),
    }),
  }),
});

export const { useGetTodoByNameQuery } = todoApi;
