"use client";
import { useRouter } from 'next/navigation';
import { Container, Grid, Typography, List, ListItem, Box, Card, Button, Stack, Divider } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { useEffect,useState } from 'react';
import { clearCartItems } from '@/store/slices/cartSlice';
import { useCreateOrderMutation } from '@/store/slices/apiSlice';

export default function PlaceOrderPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  
  const cart = useSelector((state) => state.cart);
  const { cartItems, shippingAddress, paymentMethod, itemsPrice, shippingPrice, taxPrice, totalPrice } = cart;

  const [createOrder, { isLoading }] = useCreateOrderMutation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (!isSuccess) {
      if (!shippingAddress?.address) {
        router.push('/shipping');
      } else if (!paymentMethod) {
        router.push('/payment');
      }
    }
  }, [shippingAddress, paymentMethod, router]);


  const placeOrderHandler = async () => {
    try {
      setIsSubmitting(true); // 🚩 Set this to true before starting
      
      const res = await createOrder({
        orderItems: cartItems,
        shippingAddress: shippingAddress,
        paymentMethod: paymentMethod || 'PayPal',
        itemsPrice: itemsPrice,
        shippingPrice: shippingPrice,
        taxPrice: taxPrice,
        totalPrice: totalPrice,
      }).unwrap();

      setIsSuccess(true);
      dispatch(clearCartItems());
      router.push(`/order/${res._id}`);
    } catch (err) {
      setIsSubmitting(false); // 🚩 Reset if it fails
      alert(err?.data?.message || err.error);
    }
  };

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