import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '' }),
  tagTypes: ['Product', 'Order', 'User'],
  // This is where builder is defined!
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => '/api/products',
      providesTags: ['Product'],
      keepUnusedDataFor: 5,
    }),
    getProductDetails: builder.query({
      query: (productId) => `/api/products/${productId}`,
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetProductsQuery, useGetProductDetailsQuery } = apiSlice;