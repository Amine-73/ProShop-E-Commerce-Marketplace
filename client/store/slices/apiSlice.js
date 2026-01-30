import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" ,
    prepareHeaders:(headers,{getState})=>{
      const token=getState().user.userInfo?.token;
      if(token){
        headers.set('authorization',`Bearer ${token}`)
      }
      return headers;
    }
    
  }),
  tagTypes: ["Product", "Order", "User"],
  // This is where builder is defined!
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "/api/products",
      providesTags: ["Product"],
      keepUnusedDataFor: 5,
    }),
    getProductDetails: builder.query({
      query: (productId) => `/api/products/${productId}`,
      keepUnusedDataFor: 5,
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "/api/users/login",
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: "/api/users",
        method: "POST",
        body: data,
      }),
    }),
    createOrder:builder.mutation({
      query:(order)=>({
        url:'/api/orders',
        method:'POST',
        body:{...order}
      })
    })
  }),
});

export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useLoginMutation,
  useRegisterMutation,
  useCreateOrderMutation
} = apiSlice;
