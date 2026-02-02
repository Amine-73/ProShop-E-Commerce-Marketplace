"use client";
import { useParams } from 'next/navigation';
import { useGetOrderDetailsQuery } from '@/store/slices/apiSlice';
import { Container, Typography, Grid, List, ListItem, Card, Box, Divider, Stack } from '@mui/material';
import Image from 'next/image';

export default function OrderDetailsPage() {
  const { id: orderId } = useParams();
  const { data: order, isLoading, error } = useGetOrderDetailsQuery(orderId);

  if (isLoading) return <Typography sx={{ p: 5 }}>Loading Order...</Typography>;
  if (error) return <Typography color="error">Error loading order</Typography>;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
        Order: {order._id}
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Stack spacing={3}>
            {/* Shipping Info */}
            <Box>
              <Typography variant="h6" fontWeight="bold">Shipping Details</Typography>
              <Typography><strong>Name:</strong> {order.user.name}</Typography>
              <Typography><strong>Email:</strong> {order.user.email}</Typography>
              <Typography>
                <strong>Address:</strong> {order.shippingAddress.address}, {order.shippingAddress.city}
              </Typography>
              <Box sx={{ mt: 1, p: 1, bgcolor: order.isDelivered ? '#d4edda' : '#f8d7da', borderRadius: 1 }}>
                {order.isDelivered ? `Delivered on ${order.deliveredAt}` : "Not Delivered"}
              </Box>
            </Box>

            <Divider />

            {/* Order Items */}
            <Box>
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>Items</Typography>
              <List disablePadding>
                {order?.orderItems?.map((item, index) => (
                  <ListItem key={index} sx={{ px: 0, py: 1 }}>
                    <Grid container alignItems="center">
                      <Grid item xs={2}>
                        <img src={item.image} alt={item.name} style={{ width: '50px', borderRadius: '4px' }} />
                      </Grid>
                      <Grid item xs={6}>{item.name}</Grid>
                      <Grid item xs={4} textAlign="right">
                        {item.qty} x ${item.price} = ${(item.qty * item.price).toFixed(2)}
                      </Grid>
                    </Grid>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Stack>
        </Grid>

        {/* Sidebar Summary */}
        <Grid item xs={12} md={4}>
          <Card variant="outlined" sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>Order Summary</Typography>
            <Stack spacing={1}>
              <Box display="flex" justifyContent="space-between">
                <Typography>Items</Typography>
                <Typography>${order.itemsPrice}</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Typography>Tax</Typography>
                <Typography>${order.taxPrice}</Typography>
              </Box>
              <Divider />
              <Box display="flex" justifyContent="space-between">
                <Typography variant="h6">Total</Typography>
                <Typography variant="h6">${order.totalPrice}</Typography>
              </Box>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}