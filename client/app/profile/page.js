"use client";
import React, { useState ,useEffect} from 'react';
import { Container, Grid, Typography, TextField, Button, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useUpdateProfileMutation, useGetMyOrdersQuery } from '../../store/slices/apiSlice';
import { setCredentials } from '@/store/slices/userSlice';






export default function ProfilePage() {
  // Mock data for now (In the future, this comes from your Auth state)
  const [name, setName] = useState('Amine');
  const [email, setEmail] = useState('amine@example.com');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  
  const [updateProfile, { isLoading: loadingUpdate }] = useUpdateProfileMutation();
  const { data: orders, isLoading: loadingOrders, error: errorOrders } = useGetMyOrdersQuery();

  // Load user data into form
  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo]);

  const submitHandler =async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      // Send data to backend. Password is only sent if the user typed something.
      const res = await updateProfile({
        _id: userInfo._id,
        name,
        email,
        password,
      }).unwrap();
      
      dispatch(setCredentials({ ...res }));
      toast.success('Profile updated successfully!');
      setPassword(''); // Clear password fields after success
      setConfirmPassword('');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }

  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {/* User Profile Form */}
        <Grid item xs={12} md={3}>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>User Profile</Typography>
          <Box component="form" onSubmit={submitHandler}>
            <TextField fullWidth label="Name" variant="outlined" margin="normal" 
              value={name} onChange={(e) => setName(e.target.value)} />
            
            <TextField fullWidth label="Email Address" variant="outlined" margin="normal" 
              value={email} onChange={(e) => setEmail(e.target.value)} />
            
            <TextField fullWidth label="New Password" type="password" variant="outlined" margin="normal" 
              value={password} onChange={(e) => setPassword(e.target.value)} />
            
            <TextField fullWidth label="Confirm Password" type="password" variant="outlined" margin="normal" 
              value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            
            <Button type="submit" variant="contained" fullWidth disabled={loadingUpdate}
              sx={{ mt: 3, bgcolor: '#000', color: '#fff', '&:hover': { bgcolor: '#333' } }}>
              {loadingUpdate ? <CircularProgress size={24} /> : 'Update'}
            </Button>
          </Box>
        </Grid>

        {/* Order History */}
        <Grid item xs={12} md={9}>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>My Orders</Typography>
          {loadingOrders ? <CircularProgress /> : errorOrders ? <Typography color="error">Failed to load orders</Typography> : (
            <TableContainer component={Paper}>
              <Table>
                <TableHead sx={{ bgcolor: '#f5f5f5' }}>
                  <TableRow>
                    <TableCell><strong>ID</strong></TableCell>
                    <TableCell><strong>DATE</strong></TableCell>
                    <TableCell><strong>TOTAL</strong></TableCell>
                    <TableCell><strong>PAID</strong></TableCell>
                    <TableCell><strong>DELIVERED</strong></TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders?.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} align="center">You have no orders yet.</TableCell>
                    </TableRow>
                  ) : (
                    orders?.map((order) => (
                      <TableRow key={order._id}>
                        <TableCell>{order._id.substring(0, 10)}...</TableCell>
                        <TableCell>{order.createdAt.substring(0, 10)}</TableCell>
                        <TableCell>${order.totalPrice}</TableCell>
                        <TableCell>{order.isPaid ? order.paidAt.substring(0, 10) : '❌'}</TableCell>
                        <TableCell>{order.isDelivered ? order.deliveredAt.substring(0, 10) : '❌'}</TableCell>
                        <TableCell>
                          <Button 
                          size="small" 
                          variant="outlined" 
                          component={Link} // Use Next.js Link
                          href={`/order/${order._id}`}
                          sx={{ color: '#000', borderColor: '#000' }}
                        >
                          Details
                        </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}