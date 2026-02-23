import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api" }),
  tagTypes: ["book"],
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => "/books",
      providesTags: ["book"],
    }),
    createBook: builder.mutation({
        query: (bookData) => ({
            url: "/books/create-book",
            method: "POST",
            body: bookData,
        }),
        invalidatesTags: ["book"]
    }),
    getBorrowBooks: builder.query({
      query: () => "/borrow",
      providesTags: ["borrow"],
    })
  }),
});

export const { useGetBooksQuery, useCreateBookMutation, useGetBorrowBooksQuery } = baseApi;
