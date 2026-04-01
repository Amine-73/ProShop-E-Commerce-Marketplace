import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { USERS_URL } from '../../app/canstants';


export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" ,
  credentials: 'include', // 🚩 Add this line
  prepareHeaders: (headers, { getState }) => {
    const state = getState();

  const token = state.user?.userInfo?.token; 

  if (token) {
    headers.set('authorization', `Bearer ${token}`);
    
  }
  return headers;
},
    
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
    }),
    getOrderDetails:builder.query({
      query:(id)=>({
        url:`/api/orders/${id}`,
      }),
      keepUnusedDataFor:5,
    }),
    updateProfile:builder.mutation({
      query:(data)=>({
        url:'/api/users/profile',
        method:'PUT',
        body:data,
      })
    }),
    getMyOrders:builder.query({
      query:()=>({
        url:'/api/orders/mine'
      })
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useUpdateProfileMutation,
  useGetMyOrdersQuery,
  useGetProductDetailsQuery,
  useLoginMutation,
  useRegisterMutation,
  useCreateOrderMutation,
  useGetOrderDetailsQuery,
  useLogoutMutation,
} = apiSlice;
