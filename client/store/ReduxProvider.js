"use client"

import {Provider, useDispatch, useSelector} from "react-redux";
import store from './store';
import { useEffect } from "react";
import { hydrateCart } from "./slices/cartSlice";


function CartHydrator({children}){
    const dispatch=useDispatch();

    const {userInfo}=useSelector((state)=>state.user)

    

    useEffect(() => {
    // 1. If we have a user, try to load their specific cart
    if (userInfo?._id) {
        const savedCart = localStorage.getItem(`cart_${userInfo._id}`);
        if (savedCart) {
            
            dispatch(hydrateCart(JSON.parse(savedCart)));
        }
    } 
    // 2. If NO user, just reset the Redux state to empty 
    // WITHOUT touching localStorage
    else {
        
        dispatch(hydrateCart({ 
            cartItems: [], 
            shippingAddress: {}, 
            itemsPrice: 0, 
            totalPrice: 0 
        }));
    }
}, [userInfo?._id, dispatch]);

    return <>{children}</>

}


export default function ReduxProvider({children}){

    return <Provider store={store}>
        <CartHydrator>
            {children}
        </CartHydrator>
        </Provider>
}