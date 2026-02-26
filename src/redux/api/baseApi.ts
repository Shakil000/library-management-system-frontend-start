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
    borrowBook: builder.mutation({
      query:(payload) => ({
        url: "/borrow/borrow-book",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["book", "borrow"]
    }),
    getBorrowBooks: builder.query({
      query: () => "/borrow",
      providesTags: ["borrow"],
    }),
    deleteBook: builder.mutation({
      query: (id: string) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["book"]
    })
  }),
});

export const { useGetBooksQuery, useCreateBookMutation, useGetBorrowBooksQuery, useBorrowBookMutation, useDeleteBookMutation } = baseApi;
