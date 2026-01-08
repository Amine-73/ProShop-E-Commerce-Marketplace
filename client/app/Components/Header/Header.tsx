"use client";
import { AppBar, Toolbar, Typography, Box, InputBase, Badge, IconButton } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import { useCart } from '@/app/context/CartContext';
import Link from 'next/link';

export default function Navbar() {
  const {cartItems}=useCart();
  // calcule total quantity or all items in cart 
  const cartItemsCount=cartItems.reduce((acc:number,item:any)=> acc+item.qty,0)
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
        <Box sx={{backgroundColor: 'rgba(255,255,255,0.15)', 
              borderRadius: '20px', 
              display: 'flex', 
              alignItems: 'center', 
              px: 2,
              width: { xs: '100%', md: '400px' }  }}>
           
            <SearchIcon sx={{ color: 'white', mr: 1 }} />
            <InputBase 
              placeholder="Search products..." 
              sx={{ color: 'white', width: '100%' }} 
            />
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
            <PersonIcon />
          </IconButton>
        </Box>

      </Toolbar>
    </AppBar>
  );
}