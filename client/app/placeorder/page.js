"use client";
import { useRouter } from 'next/navigation';
import { Container, Grid, Typography, List, ListItem, Box, Card, Button, Stack, Divider } from '@mui/material';
// import { useCart } from '../context/CartContext';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { useEffect } from 'react';
import { clearCartItem } from '@/store/slices/cartSlice';
import {toast} from 'react-toastify' //for nice alert
import { useCreateOrderMutation } from '@/store/slices/apiSlice';
import { clearCartItem } from '@/store/slices/cartSlice';

export default function PlaceOrderPage() {
  const router = useRouter();
  const dispatch=useDispatch();
  const cart =useSelector((state)=>state.cart);
  const [createOrder,{isLoading}]=useCreateOrderMutation();
  // const { cartItems, shippingAddress, paymentMethod, clearCart } = useCart();
  const {cartItems,shippingAddress={},paymentMethod,clearCart}=cart||{};
  // Calculations
  // const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  // const shippingPrice = itemsPrice > 100 ? 0 : 10; // Free shipping over $100
  // const totalPrice = itemsPrice + shippingPrice;

  const placeOrderHandler=async ()=>{
    try{
      const res=await createOrder({
        orderItems:cart.cartItems,
        shippingAddress:cart.shippingAddress,
        paymentMethod:cart.paymentMethod,
        itemsPrice:cart.itemsPrice,
        shippingPrice:cart.shippingPrice,
        taxPrice:cart.taxPrice,
        totalPrice:cart.totalPrice,
      }).unwrap();

      dispatch(clearCartItem());
      router.push(`/order/${res._id}`);//redirect to order details
    }catch(error){
      alert(error?.data?.message || error.error)
    }
  }

  useEffect(()=>{
    if(!shippingAddress.address)
      router.push('/shipping')
  },[shippingAddress.address,router])

  const {itemsPrice,shippingPrice,taxPrice,totalPrice}=cart
  // 1. Define the handler function here
  // const placeOrderHandler = () => {
  //   // In a real app, you would call an API here to save the order to a database
    
  //   // Clear the cart items from state and localStorage
  //   dispatch(clearCartItem());
    
  //   // Redirect the user to a success page
  //   router.push('/success');
  // };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
  <Typography variant="h4" sx={{ mb: 4, fontWeight: 700 }}>Order Summary</Typography>
  
  <Grid container spacing={4}>
    {/* Left Column: Details */}
    <Grid size={{ xs: 12, md: 8 }}>
      <Stack spacing={3}>
        <Box>
          <Typography variant="h6">Shipping</Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            <strong>Address: </strong> 
            {shippingAddress.address}, {shippingAddress.city}, {shippingAddress.postalCode}, {shippingAddress.country}
          </Typography>
        </Box>

        <Divider />

        <Box>
          <Typography variant="h6">Payment Method</Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            <strong>Method: </strong> {paymentMethod || 'PayPal'}
          </Typography>
        </Box>

        <Divider />

        <Box>
          <Typography variant="h6" sx={{ mb: 2 }}>Order Items</Typography>
          <List>
            {cartItems.map((item) => (
              <ListItem key={item._id} sx={{ px: 0 }}>
                {/* Updated nested Grid to remove "item" */}
                <Grid container alignItems="center" spacing={2}>
                  <Grid size={{ xs: 2 }}>
                    <img src={item.image} alt={item.name} style={{ width: '50px', borderRadius: '4px' }} />
                  </Grid>
                  <Grid size={{ xs: 6 }}>
                    <Link href={`/product/${item._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                      {item.name}
                    </Link>
                  </Grid>
                  <Grid size={{ xs: 4 }} sx={{ textAlign: 'right' }}>
                    {item.qty} x ${item.price} = ${(item.qty * item.price).toFixed(2)}
                  </Grid>
                </Grid>
              </ListItem>
            ))}
          </List>
        </Box>
      </Stack>
    </Grid>

    {/* Right Column: Order Summary Sidebar */}
   <Grid item xs={12} md={4}>
          <Card sx={{ p: 3, borderRadius: 2, border: '1px solid #ddd' }} elevation={0}>
            <Typography variant="h6" sx={{ mb: 2 }} fontWeight="bold">Order Summary</Typography>
            <Stack spacing={2}>
              <Box display="flex" justifyContent="space-between">
                <Typography color="text.secondary">Items</Typography>
                <Typography>${itemsPrice}</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Typography color="text.secondary">Shipping</Typography>
                <Typography>${shippingPrice}</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Typography color="text.secondary">Tax</Typography>
                <Typography>${taxPrice}</Typography>
              </Box>
              <Divider />
              <Box display="flex" justifyContent="space-between">
                <Typography variant="h6" fontWeight="bold">Order Total</Typography>
                <Typography variant="h6" color="primary" fontWeight="bold">${totalPrice}</Typography>
              </Box>
              <Button 
                variant="contained" 
                fullWidth 
                onClick={placeOrderHandler}
                disabled={cart.cartItems.length===0 || isLoading}
                sx={{ bgcolor: '#FFD814', color: '#000', fontWeight: 'bold', mt: 2, py: 1.5, '&:hover': { bgcolor: '#F7CA00' } }}
              >
                {isLoading ? 'Processing...':'Place Order'}
              </Button>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}