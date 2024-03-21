import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const DashboardSlice = createApi({
  reducerPath: "employee",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.BASE_API_URL,
  }),
  tagTypes: ["Employee", "Search", "Filter"],
  endpoints: (builder) => ({
    getAllEmployees: builder.query({
      query: (page) => {
        return {
          url: `/api/employee?resultsPerPage=10&page=${page}`,
        };
      },
      providesTags: ["Employee"],
    }),
    getSearchEmployees: builder.query<
      any,
      { page: number; searchQuery: string }
    >({
      query: (args) => {
        const { page, searchQuery } = args;
        return {
          url: `/api/search?resultsPerPage=10`,
          params: { page, searchQuery },
        };
      },
      providesTags: ["Search"],
    }),

    getFilterEmployees: builder.query<
      any,
      { page: number; role: string; date: string }
    >({
      query: (args) => {
        const { page, role, date } = args;
        return {
          url: `/api/filter?resultsPerPage=10`,
          params: { page, role, date },
        };
      },
      providesTags: ["Filter"],
    }),
    addNewEmployee: builder.mutation({
      query: (payload) => ({
        url: "/api/dashboard",
        method: "POST",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: (_) => ["Employee", "Search", "Filter"],
    }),
  }),
});

export const {
  useGetAllEmployeesQuery,
  useGetSearchEmployeesQuery,
  useGetFilterEmployeesQuery,
  useAddNewEmployeeMutation,
} = DashboardSlice;
