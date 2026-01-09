"use client";
import { useRouter } from 'next/navigation';
import { Container, Grid, Typography, List, ListItem, Box, Card, Button, Stack, Divider } from '@mui/material';
import { useCart } from '../context/CartContext';
import Link from 'next/link';

export default function PlaceOrderPage() {
  const router = useRouter();
  const { cartItems, shippingAddress, paymentMethod, clearCart } = useCart();
  // Calculations
  const itemsPrice = cartItems.reduce((acc:number, item:any) => acc + item.price * item.qty, 0);
  const shippingPrice = itemsPrice > 100 ? 0 : 10; // Free shipping over $100
  const totalPrice = itemsPrice + shippingPrice;

  // 1. Define the handler function here
  const placeOrderHandler = () => {
    // In a real app, you would call an API here to save the order to a database
    
    // Clear the cart items from state and localStorage
    clearCart();
    
    // Redirect the user to a success page
    router.push('/success');
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
            {cartItems.map((item:any) => (
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
    <Grid size={{ xs: 12, md: 4 }}>
      <Card sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>Price Details</Typography>
        <Stack spacing={2}>
          <Box display="flex" justifyContent="space-between">
            <Typography>Items</Typography>
            <Typography>${itemsPrice.toFixed(2)}</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Typography>Shipping</Typography>
            <Typography>${shippingPrice.toFixed(2)}</Typography>
          </Box>
          <Divider />
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h6">Total</Typography>
            <Typography variant="h6" color="primary">${totalPrice.toFixed(2)}</Typography>
          </Box>
          <Button 
            variant="contained" 
            fullWidth 
            onClick={placeOrderHandler} // Make sure this function is defined!
            sx={{ bgcolor: '#FFD814', color: '#000', fontWeight: 'bold', mt: 2, '&:hover': { bgcolor: '#F7CA00' } }}
          >
            Place Order
          </Button>
        </Stack>
      </Card>
    </Grid>
  </Grid>
</Container>
  );
}