"use client"

import {Provider, useDispatch} from "react-redux";
import store from './store';
import { useEffect } from "react";
import { hydrateCart } from "./slices/cartSlice";

function CartHydrator({children}){
    const dispatch=useDispatch();

    useEffect(()=>{
        dispatch(hydrateCart())
    },[dispatch])

    return <>{children}</>

}


export default function ReduxProvider({children}){

    return <Provider store={store}>
        <CartHydrator>
            {children}
        </CartHydrator>
        </Provider>
}