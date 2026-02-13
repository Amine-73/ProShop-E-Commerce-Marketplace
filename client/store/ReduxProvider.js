"use client"

import {Provider, useDispatch, useSelector} from "react-redux";
import store from './store';
import { useEffect } from "react";
import { hydrateCart } from "./slices/cartSlice";


function CartHydrator({children}){
    const dispatch=useDispatch();

    const {userInfo}=useSelector((state)=>state.user)

    // useEffect(()=>{
    //     //only run if have a logged-in user
    //     if(userInfo?._id){
    //         const savedCart=localStorage.getItem(`cart_${userInfo._id}`);

    //         if(savedCart){
    //             try{
    //                 const parsedCart=JSON.parse(savedCart);
    //                 if(parsedCart){
    //                     dispatch(hydrateCart(parsedCart));
    //                 }
    //             }catch(error){
    //                 console.error("Failed to parse cart data",error)
    //             }
    //         }else {
    //             // If they have no saved cart, ensure state is empty
    //             dispatch(hydrateCart({ cartItems: [] }));
    //         }
    //     }else {
    //         // 2. If NO user is logged in (Logout), reset the Redux cart to empty
    //         // This prevents User_2 from seeing User_1's items
    //         dispatch(hydrateCart({ cartItems: [] }));
    //     }

    //     // dispatch(hydrateCart())
    // },[userInfo,dispatch])

    useEffect(() => {
    const loadCart = () => {
        if (userInfo?._id) {
            const savedCart = localStorage.getItem(`cart_${userInfo._id}`);
            if (savedCart) {
                dispatch(hydrateCart(JSON.parse(savedCart)));
            } else {
                // User has no saved cart, start fresh for THIS user
                dispatch(hydrateCart({ cartItems: [], itemsPrice: 0, totalPrice: 0 }));
            }
        } else {
            // No user logged in, clear the Redux memory so User 2 starts at 0
            dispatch(hydrateCart({ cartItems: [], itemsPrice: 0, totalPrice: 0 }));
        }
    };

    loadCart();
    }, [userInfo?._id, dispatch]); // Only trigger when the actual ID changes

    return <>{children}</>

}


export default function ReduxProvider({children}){

    return <Provider store={store}>
        <CartHydrator>
            {children}
        </CartHydrator>
        </Provider>
}