"use client";
import  { useState } from 'react';
import { Container, Box, Typography, TextField, Button, Stack, Stepper, Step, StepLabel } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import {saveShippingAddress} from '@/store/slices/cartSlice'

const steps = ['Login', 'Shipping', 'Payment', 'Place Order'];

export default function ShippingPage() {
  const router = useRouter();
  // const { shippingAddress, saveShippingAddress } = useCart();
  // State for form fields
  const {shippingAddress}=useSelector((state)=>state.cart);

  const [address, setAddress] = useState(shippingAddress?.address || '');
  const [city, setCity] = useState(shippingAddress?.city || '');
  const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode || '');
  const [country, setCountry] = useState(shippingAddress?.country || '');
  const { userInfo } = useSelector((state) => state.user);

  const dispatch=useDispatch()
  const addressData={address,city,postalCode,country}
  
  const submitHandler = (e) => {
  e.preventDefault();
  
  // 1. Construct the exact object the slice expects
  const dispatchData = {
    address: { address, city, postalCode, country },
    userId: userInfo?._id // <--- This must be included!
  };


  // 2. Dispatch the combined object
  dispatch(saveShippingAddress(dispatchData));

  // 3. Move to Payment
  router.push('/payment');
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      {/* Checkout Steps */}
      <Stepper activeStep={1} alternativeLabel sx={{ mb: 5 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
        Shipping Address
      </Typography>

      <Box component="form" onSubmit={submitHandler} sx={{ mt: 3 }}>
        <Stack spacing={3}>
          <TextField
            required
            fullWidth
            label="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <TextField
            required
            fullWidth
            label="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <TextField
            required
            fullWidth
            label="Postal Code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
          <TextField
            required
            fullWidth
            label="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            sx={{ 
              bgcolor: '#FFD814', 
              color: '#000', 
              py: 1.5,
              fontWeight: 'bold',
              '&:hover': { bgcolor: '#F7CA00' } 
            }}
          >
            Continue to Payment
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}