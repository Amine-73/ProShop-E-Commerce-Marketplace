"use client";
import React, { useState } from 'react';
import { Container, Typography, Button, Radio, RadioGroup, FormControlLabel, FormControl, Stepper, Step, StepLabel, Box } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import {useCart} from '../context/CartContext'


export default function PaymentPage() {
  const [paymentMethod, setPaymentMethod] = useState('PayPal');
  const router = useRouter();
  const { shippingAddress } = useCart();

  const submitHandler = (e:any) => {
    e.preventDefault();
    // Logic to save payment method can go here
    router.push('/placeorder');
  };

  useEffect(() => {
  if (!shippingAddress.address) {
    router.push('/shipping'); // Send them back if they skipped a step
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