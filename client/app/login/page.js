"use client";
import { useEffect, useState } from 'react';
import { Container, Box, Typography, TextField, Button, Paper,Card,Stack ,CircularProgress, Alert, Divider} from '@mui/material';
import Link from 'next/link';
import { useRouter ,userSearchParams, useSearchParams} from 'next/navigation';
import { useLoginMutation } from '../../store/slices/apiSlice';
import { setCredentials } from '../../store/slices/userSlice';
import { useDispatch,useSelector } from 'react-redux';


export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();


  const dispatch=useDispatch();
  const searchParams=useSearchParams();


  // Get the redirect path (e.g., if coming from cart, redirect back to shipping)
  const redirect = searchParams.get('redirect') || '/';

  const [login, { isLoading, error }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.user);
  // if already logged in ,skip this page
  useEffect(()=>{
    if(userInfo){
      router.push(redirect)
    }
  },[router,redirect,userInfo])
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res= await login({email,password}).unwrap();
      dispatch(setCredentials({...res}));
      router.push(redirect)
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        {/* You can put your Logo here */}
        <Typography variant="h4" fontWeight="bold" color="primary">
          PROSHOP
        </Typography>
      </Box>

      <Card variant="outlined" sx={{ p: 4, borderRadius: '8px' }}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 500 }}>
          Sign In
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error?.data?.message || error.error}
          </Alert>
        )}

        <form onSubmit={submitHandler}>
          <Stack spacing={2}>
            <TextField
              label="Email Address"
              fullWidth
              variant="outlined"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              label="Password"
              fullWidth
              variant="outlined"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={isLoading}
              sx={{ 
                bgcolor: '#f0c14b', 
                color: '#000',
                '&:hover': { bgcolor: '#ddb347' },
                py: 1.2,
                borderRadius: '8px',
                fontWeight: 'bold'
              }}
            >
              {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Continue'}
            </Button>
          </Stack>
        </form>

        <Typography variant="body2" sx={{ mt: 3, fontSize: '12px', color: 'text.secondary' }}>
          By continuing, you agree to ProShop's Conditions of Use and Privacy Notice.
        </Typography>
      </Card>

      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Divider sx={{ mb: 2 }}>
          <Typography variant="caption" color="text.secondary">New to ProShop?</Typography>
        </Divider>
        <Button 
          fullWidth 
          variant="outlined" 
          component={Link} 
          href={`/register?redirect=${redirect}`}
          sx={{ borderRadius: '8px', textTransform: 'none', color: 'text.primary' }}
        >
          Create your ProShop account
        </Button>
      </Box>
    </Container>
  );
}