"use client";
import { AppBar, Toolbar, Typography, Box, InputBase, Badge, IconButton } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';

export default function Navbar() {
  return (
    <AppBar position="sticky" sx={{ bgcolor: '#121212', py: 0.5 }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        
        {/* LOGO */}
        <Typography variant="h6" sx={{ fontWeight: 'bold', letterSpacing: 1 }}>
          PRO<span style={{ color: '#1976d2' }}>SHOP</span>
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
          <IconButton color="inherit">
            <Badge badgeContent={4} color="error">
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