"use client";
import React, { useState } from 'react';
import { Container, Typography, Button, Radio, RadioGroup, FormControlLabel, FormControl, Stepper, Step, StepLabel, Box } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
// import {useCart} from '../context/CartContext'
import { UseSelector,UseDispatch, useSelector, useDispatch } from 'react-redux';
import { savePaymentMethod } from '@/store/slices/cartSlice';


export default function PaymentPage() {
  const [paymentMethod, setPaymentMethod] = useState('PayPal');
  const router = useRouter();
  //get shipping Adress from Redux Store
  const dispatch=useDispatch();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const { userInfo } = useSelector((state) => state.user);

  const submitHandler = (e) => {
    e.preventDefault(); // 🚩 CRITICAL: Prevents page reload
    
    // 2. Save to Redux
    dispatch(savePaymentMethod({ 
      method: paymentMethod, 
      userId: userInfo?._id 
    }));
    
    // 3. Move to the next step
    router.push('/placeorder'); 
  };

  useEffect(() => {
    // 1. Get the current user ID
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const userId = userInfo?._id;

    // 2. Look for the CORRECT user-specific cart
    const storedCart = userId ? JSON.parse(localStorage.getItem(`cart_${userId}`)) : null;

    // 3. Check both Redux state and LocalStorage for the address
    const hasAddress = shippingAddress?.address || storedCart?.shippingAddress?.address;

    if (!hasAddress) {
        console.log("Redirecting to shipping: Address not found for user", userId);
        router.push('/shipping'); 
    }
}, [shippingAddress, router]);
  

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Stepper activeStep={2} alternativeLabel sx={{ mb: 5 }}>
        {['Login', 'Shipping', 'Payment', 'Place Order'].map((label) => (
          <Step key={label}><StepLabel>{label}</StepLabel></Step>
        ))}
      </Stepper>

      <Typography variant="h4" fontWeight={700} gutterBottom>Payment Method</Typography>
      
      <Box component="form" onSubmit={submitHandler} sx={{ mt: 3 }}>
        <FormControl component="fieldset">
          <Typography variant="h6" sx={{ mb: 2 }}>Select Method</Typography>
          <RadioGroup value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
            <FormControlLabel value="PayPal" control={<Radio color="primary" />} label="PayPal or Credit Card" />
            <FormControlLabel value="Stripe" control={<Radio color="primary" />} label="Stripe" />
          </RadioGroup>
        </FormControl>

        <Button 
          type="submit" 
          fullWidth 
          variant="contained" 
          sx={{ mt: 4, py: 1.5, bgcolor: '#FFD814', color: '#000', fontWeight: 'bold' }}
        >
          Continue
        </Button>
      </Box>
    </Container>
  );
}