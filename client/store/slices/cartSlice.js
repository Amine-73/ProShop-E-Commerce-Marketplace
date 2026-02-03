import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  shippingAdress:{},
  paymentMethod:'PayPal',
  itemsPrice: 0,
  shippingPrice: 0,
  taxPrice: 0,
  totalPrice: 0,
};

// Ensure you are parsing the 'cart' from localStorage correctly
// const initialState = typeof window !== 'undefined' && localStorage.getItem('cart')
//   ? JSON.parse(localStorage.getItem('cart'))
//   : { cartItems: [], shippingAddress: {}, paymentMethod: 'PayPal' ,itemPrice:0,shippingPrice:0,taxPrice:0,totalPrice:0,};


  


const addDecimals = (num) => (Math.round(num * 100) / 100).toFixed(2);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    removeFromCart: (state, action) => {
    // action.payload is the ID of the item to remove
    state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);

    // Recalculate Prices
    state.itemsPrice = addDecimals(state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0));
    state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);
    state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2)));
    state.totalPrice = (
        Number(state.itemsPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice)
    ).toFixed(2);

    localStorage.setItem('cart', JSON.stringify(state));
},
    hydrateCart: (state) => {
      if(typeof window !== 'undefined'){
        const storage = localStorage.getItem("cart");
        if (storage) {
          return JSON.parse(storage);
        }
      }
      
    },
    addToCart: (state, action) => {
      // const item = action.payload;
      const {item,userInfo}=action.payload;
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
        state.cartItems.reduce((acc, item) => acc + Number(item.price * item.qty || 0), 0),
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
      if(userInfo?._id){
        localStorage.setItem(`cart_${userInfo._id}`,JSON.stringify(state))
      }
      // localStorage.setItem("cart", JSON.stringify(state));
    },
    saveShippingAddress:(state,action)=>{
        state.shippingAddress=action.payload;
        //update local storage so it persist on refresh
        localStorage.setItem('cart',JSON.stringify(state))
    },
    savePaymentMethod:(state,action)=>{
        state.paymentMethod=action.payload;
        localStorage.setItem('cart',JSON.stringify(state))
    },
    clearCartItem:(state)=>{
        state.cartItems=[];
        // update local storage so the cart stays empty after refresh 
        localStorage.setItem('cart',JSON.stringify(state));
    },
    clearCartItems :(state)=>{
    state.cartItems=[];
    state.shippingAddress={};
    state.paymentMethod='PayPal';
    state.itemsPrice=0;
    state.shippingPrice=0;
    state.totalPrice=0;
    localStorage.removeItem("cart")
  }
  },
});

export const { addToCart, hydrateCart,removeFromCart ,saveShippingAddress,savePaymentMethod,clearCartItem,clearCartItems} = cartSlice.actions;
export default cartSlice.reducer;
