"use client";
import React, { useState } from 'react';
import { Container, Box, Typography, TextField, Button, Paper } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Logging in with:', email, password);
    // For now, let's just pretend login was successful
    router.push('/');
  };

  return (
    <Container maxWidth="sm" sx={{ py: 10 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold', textAlign: 'center' }}>
          Sign In
        </Typography>
        <Box component="form" onSubmit={submitHandler}>
          <TextField
            fullWidth
            label="Email Address"
            margin="normal"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button 
            type="submit" 
            variant="contained" 
            fullWidth 
            sx={{ mt: 3, mb: 2, bgcolor: '#FFD814', color: '#000', fontWeight: 'bold' }}
          >
            Sign In
          </Button>
          <Typography variant="body2" sx={{ textAlign: 'center' }}>
            New Customer? <Link href="/register" style={{ color: '#007185' }}>Create your account</Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}