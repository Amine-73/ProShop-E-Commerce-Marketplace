"use client";
import React, { useState } from 'react';
import { Container, Grid, Typography, TextField, Button, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

export default function ProfilePage() {
  // Mock data for now (In the future, this comes from your Auth state)
  const [name, setName] = useState('Amine');
  const [email, setEmail] = useState('amine@example.com');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
    } else {
      console.log('Profile Updated');
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {/* Left Side: User Profile Form */}
        <Grid size={{ xs: 12, md: 3 }}>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>User Profile</Typography>
          <Box component="form" onSubmit={submitHandler}>
            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              fullWidth
              label="Email Address"
              variant="outlined"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              fullWidth
              label="Confirm Password"
              type="password"
              variant="outlined"
              margin="normal"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button 
              type="submit" 
              variant="contained" 
              fullWidth 
              sx={{ mt: 3, bgcolor: '#000', color: '#fff' }}
            >
              Update
            </Button>
          </Box>
        </Grid>

        {/* Right Side: Order History */}
        <Grid size={{ xs: 12, md: 9 }}>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>My Orders</Typography>
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
                {/* For now, we show a "No Orders" message or mock data */}
                <TableRow>
                  <TableCell colSpan={6}>
                    <Typography align="center" sx={{ py: 2 }}>You have no orders yet.</Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Container>
  );
}