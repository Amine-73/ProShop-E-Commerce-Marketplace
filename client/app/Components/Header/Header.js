"use client";
import { AppBar, Toolbar, Typography, Box, InputBase, Badge, IconButton } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
// import { useCart } from '@/app/context/CartContext';
import Link from 'next/link';
import SearchBox from '../searchBox/SearchBox';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';



export default function Navbar() {
  const {cartItems}=useSelector((state)=>state.cart);
  const [mounted,setMounted]=useState(false);
  // This ensures the component only shows cart data AFTER it reaches the browser
  useEffect(()=>{
    setMounted(true)
  },[])

  // calcule total quantity or all items in cart 
  const cartItemsCount=mounted ? cartItems.reduce((acc, item) => acc + item.qty, 0) : 0
  return (
    <AppBar position="sticky" sx={{ bgcolor: '#131921', zIndex: 1100 }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        
        {/* LOGO */}
        <Typography variant="h6" sx={{ fontWeight: 'bold', letterSpacing: 1 }}>
          <Link href="/" style={{color:'white',textDecoration:'none'}}> 
            PRO<span style={{ color: '#1976d2' }}>SHOP</span>
          </Link>
        </Typography>

        {/* SEARCH BAR */}
        <Box>
            <SearchBox/>
        </Box>

        {/* ICONS */}
        <Box>
          <IconButton 
            component={Link} 
            href="/cart" 
            sx={{ color: 'white' }}
          >
            <Badge badgeContent={cartItemsCount} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          <IconButton color="inherit">
          {/* inside your icons section */}
          {/* <Link href="/profile" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
            
              <PersonIcon />
            
            <Typography variant="body2" sx={{ display: { xs: 'none', md: 'block' } }}>
              Sign In
            </Typography>
          </Link> */}

          <Link href="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            
              <PersonIcon />
            
            <Typography variant="body2" sx={{ ml: 1 }}>
              Sign In
            </Typography>
          </Box>
        </Link>
          </IconButton>
        </Box>

      </Toolbar>
    </AppBar>
  );
}