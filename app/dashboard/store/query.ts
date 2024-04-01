import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

const addTokenToRequest = async (headers: any, { getState }: any) => {
  const session = await getSession();
  if (session?.user?.accessToken) {
    headers.set("Authorization", `Bearer ${session.user.accessToken}`);
  }
  return headers;
};
export const DashboardSlice = createApi({
  reducerPath: "employee",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_API_URL,
    prepareHeaders: (headers, { getState }) => {
      return addTokenToRequest(headers, { getState });
    },
  }),

  tagTypes: ["Employee", "Search", "Filter"],
  endpoints: (builder) => ({
    getAllEmployees: builder.query({
      query: (page) => {
        return {
          url: `employee?resultsPerPage=10&page=${page}`,
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
          url: `search?resultsPerPage=10`,
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
          url: `filter?resultsPerPage=10`,
          params: { page, role, date },
        };
      },
      providesTags: ["Filter"],
    }),
    addNewEmployee: builder.mutation({
      query: (payload) => ({
        url: "dashboard",
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
