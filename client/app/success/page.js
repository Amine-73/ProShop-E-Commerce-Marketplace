"use client";
import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useRouter } from 'next/navigation';

export default function SuccessPage() {
  const router = useRouter();

  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', py: 10 }}>
      <CheckCircleOutlineIcon sx={{ fontSize: 80, color: '#007600', mb: 2 }} />
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Thank you for your order!
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Your order has been placed successfully. We'll send you an email confirmation shortly.
      </Typography>
      <Button 
        variant="contained" 
        onClick={() => router.push('/')}
        sx={{ bgcolor: '#FFD814', color: '#000', fontWeight: 'bold', '&:hover': { bgcolor: '#F7CA00' } }}
      >
        Continue Shopping
      </Button>
    </Container>
  );
}