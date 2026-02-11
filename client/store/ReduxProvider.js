"use client"

import {Provider, useDispatch, useSelector} from "react-redux";
import store from './store';
import { useEffect } from "react";
import { hydrateCart } from "./slices/cartSlice";


function CartHydrator({children}){
    const dispatch=useDispatch();

    const {userInfo}=useSelector((state)=>state.user)

    useEffect(()=>{
        //only run if have a logged-in user
        if(userInfo?._id){
            const savedCart=localStorage.getItem(`cart_${userInfo._id}`);

            if(savedCart){
                try{
                    const parsedCart=JSON.parse(savedCart);
                    if(parsedCart){
                        dispatch(hydrateCart(parsedCart));
                    }
                }catch(error){
                    console.error("Failed to parse cart data",error)
                }
            }
        }
        // dispatch(hydrateCart())
    },[userInfo,dispatch])

    return <>{children}</>

}


export default function ReduxProvider({children}){

    return <Provider store={store}>
        <CartHydrator>
            {children}
        </CartHydrator>
        </Provider>
}