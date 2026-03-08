"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hydrateCart } from "../../../store/slices/cartSlice.js";

export default function CartHydrator() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  console.log("Hydrator running, userInfo:", userInfo);
  useEffect(() => {
    try {
      if (userInfo?._id) {
        const savedCart = localStorage.getItem(`cart_${userInfo._id}`);
        if (savedCart) {
          const parsed = JSON.parse(savedCart);
          dispatch(hydrateCart(parsed));
        }
      } else {
        const guestCart = localStorage.getItem("cart_guest");
        if (guestCart) {
          dispatch(hydrateCart(JSON.parse(guestCart)));
        }
      }
    } catch (err) {
      console.error("Failed to parse cart from localStorage", err);
    }
  }, [dispatch, userInfo]);
  return null;
}
