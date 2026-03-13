import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  shippingAddress: {},
  paymentMethod: "PayPal",
  itemsPrice: 0,
  shippingPrice: 0,
  taxPrice: 0,
  totalPrice: 0,
};


const addDecimals = (num) => (Math.round(num * 100) / 100).toFixed(2);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    removeFromCart: (state, action) => {
      const { id, userId } = action.payload;
      // action.payload is the ID of the item to remove
      state.cartItems = state.cartItems.filter((x) => x._id !== id);

      // Recalculate Prices
      state.itemsPrice = addDecimals(
        state.cartItems.reduce((acc, item) => {
          const p = Number(item.price) || 0;
          const q = Number(item.qty) || 0;
          return acc + p * q;
        }, 0),
      );
      state.shippingPrice = addDecimals(
        Number(state.itemsPrice) > 100 ? 0 : 10,
      );
      state.taxPrice = addDecimals(
        Number((0.15 * state.itemsPrice).toFixed(2)),
      );
      state.totalPrice = (
        Number(state.itemsPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice)
      ).toFixed(2);
      if (userId) {
        localStorage.setItem(`cart_${userId}`, JSON.stringify(state));
      }
    },
    hydrateCart: (state, action) => {
      return { ...state, ...action.payload };
      
    },
    addToCart: (state, action) => {
      
      const { item, userInfo } = action.payload || {};
      if (!item || !item._id) return;
      const existItem = state.cartItems.find((x) => x._id === item._id);

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x,
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }
      //Calculate Prices
      state.itemsPrice = addDecimals(
        state.cartItems.reduce(
          (acc, item) => acc + Number(item.price * item.qty || 0),
          0,
        ),
      );
      state.taxPrice = addDecimals(
        Number((0.15 * state.itemsPrice).toFixed(2)),
      );
      state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);
      state.totalPrice = (
        Number(state.itemsPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice)
      ).toFixed(2);
      if (userInfo?._id) {
        localStorage.setItem(`cart_${userInfo._id}`, JSON.stringify(state));
      }
    },
    saveShippingAddress: (state, action) => {
      
      const { address, userId } = action.payload;
      state.shippingAddress = address;
      
      if (userId) {
        localStorage.setItem(`cart_${userId}`, JSON.stringify(state));
      }else{
        console.warn('Shipping saved to Redux, but no userId found for LocalStorage')
      }
    },
    savePaymentMethod: (state, action) => {
      const { method, userId } = action.payload;
      state.paymentMethod = method;
      if (userId) {
        localStorage.setItem(`cart_${userId}`, JSON.stringify(state));
      }
    },
    
    clearCartItems: (state,action) => {
      const userId = action.payload;
      state.cartItems = [];
      state.shippingAddress = {};
      state.paymentMethod = "PayPal";
      state.itemsPrice = 0;
      state.shippingPrice = 0;
      state.totalPrice = 0;
      
    },
  },
});

export const {
  addToCart,
  hydrateCart,
  removeFromCart,
  saveShippingAddress,
  savePaymentMethod,
  clearCartItems,
} = cartSlice.actions;
export default cartSlice.reducer;
