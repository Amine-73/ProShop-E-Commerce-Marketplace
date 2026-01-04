"use client";

import React from 'react';
import image_1 from '../../../images/image_1.jpg'
import { Box, Typography, Button, Container, Stack } from '@mui/material';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { url } from 'inspector';

export default function Hero() {
  return (
    <Box
      sx={{
        // bgcolor: '#f8f9fa', // Light professional grey background
        pt: 8,
        pb: 6,
        display: 'flex',
        alignItems: 'center',
        minHeight: '520px',
        borderBottom: '1px solid #ddd',
        // backgroundImage:'url("/image_3.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url("/image_3.jpg")',
        color: 'white',
    
      }}
    >
      <Container maxWidth="lg">
        <Typography
          component="h1"
          variant="h2"
          align="left"
          color="text.primary"
          gutterBottom
          sx={{ color: '#ffffff', // Pure white
          fontWeight: 'bold',
          textShadow: '2px 2px 10px rgba(0,0,0,0.6)', }}
        >
          Shop the Future
        </Typography>
        <Typography variant="h5" align="left" sx={{color: '#E0E0E0',
        textShadow: '1px 1px 4px rgba(0,0,0,0.8)',
        maxWidth: '600px',
        fontSize:"20px"
        }}  paragraph>
          Welcome to ProShop. Upgrade your tech with our latest 
          collection of electronics, accessories, and more. 
          High quality, unbeatable prices.
        </Typography>
        
        <Stack
          sx={{ pt: 4 }}
          direction="row"
          spacing={2}
          justifyContent="left"
        >
          <Button 
            variant="contained" 
            size="large" 
            startIcon={<ShoppingBagIcon />}
            sx={{ bgcolor: '#1976d2', // Your current blue
                '&:hover': { bgcolor: '#115293' },
                px: 4, py: 1.5,
                fontWeight: 'bold' }}
          >
            Shop Now
          </Button>
          <Button 
            variant="outlined" 
            size="large"
            sx={{ color: 'white', 
                    borderColor: 'white',
                    '&:hover': { borderColor: '#E0E0E0', bgcolor: 'rgba(255,255,255,0.1)' },
                    px: 4, py: 1.5 }}
          >
            Learn More
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}