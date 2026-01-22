"use client";


import { useCart } from '../context/CartContext';
import { 
  Container, Grid, Typography, Box, List, ListItem, 
  Select, MenuItem, Button, Card, Divider, Stack, Link as MuiLink 
} from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { addToCart,removeFromCart } from '../../store/slices/cartSlice';
import { useDispatch,useSelector } from 'react-redux';


export default function CartPage() {
    const router = useRouter();
    const dispatch=useDispatch()
    const { cartItems,itemsPrice } = useSelector((state)=>state.cart);

    // handlers using dispatch 
    const addToCartHandler=(item,qty)=>{
      dispatch(addToCart({...item,qty}));
    };

    const removeFromCartHandler=(id)=>{
      dispatch(removeFromCart(id))
    };


    
    const checkoutHandler = () => {
  // If you have a login system, you would check if the user is logged in here
  // For now, we go straight to shipping
  router.push('/login?redirect=/shipping'); 
};
  const subtotalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const subtotalPrice = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2);

  return (
    <Box sx={{ bgcolor: '#EAEDED', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          
          {/* LEFT COLUMN: Shopping Cart List */}
          <Grid item xs={12} md={9}>
            <Card sx={{ p: 3, borderRadius: '4px', boxShadow: 'none' }}>
              <Typography variant="h4" sx={{ fontWeight: 500, mb: 1 }}>
                Shopping Cart
              </Typography>
              <MuiLink href="#" underline="hover" sx={{ fontSize: '18px', color: '#ff4343ff' }}>
                Deselect all items
              </MuiLink>
              <Typography align="right" variant="body2" sx={{ color: '#565959', mb: 1 }}>
                Price
              </Typography>
              <Divider />

              {cartItems.length === 0 ? (
                <Box sx={{ py: 4 }}>
                  <Typography variant="h6">Your Amazon Cart is empty.</Typography>
                  <Link href="/" style={{ color: '#007185', textDecoration: 'none' }}>Go back to shopping</Link>
                </Box>
              ) : (
                <List disablePadding>
                  {cartItems.map((item) => (
                    <Box key={item._id}>
                      <ListItem sx={{ py: 3, px: 0, alignItems: 'flex-start' }}>
                        <Grid container spacing={2}>
                          {/* Product Image */}
                          <Grid item xs={12} sm={3} md={2}>
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              style={{ width: '100%', maxHeight: '180px', objectFit: 'contain' }} 
                            />
                          </Grid>
                          
                          {/* Product Details */}
                          <Grid item xs={12} sm={7} md={8}>
                            <Typography variant="h6" sx={{ fontSize: '18px', fontWeight: 500, lineHeight: '24px' }}>
                              {item.name}
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#007600', my: 0.5 }}>In Stock</Typography>
                            <Typography variant="body2" sx={{ color: '#565959', fontSize: '12px' }}>Eligible for FREE Shipping</Typography>
                            
                            <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 2 }}>
                              <Select
                                size="small"
                                value={item.qty}
                                onChange={(e) => addToCartHandler(item, Number(e.target.value))}
                                sx={{ bgcolor: '#F0F2F2', borderRadius: '8px', fontSize: '13px' }}
                              >
                                {[...Array(item.countInStock).keys()].map((x) => (
                                  <MenuItem key={x + 1} value={x + 1}>Qty: {x + 1}</MenuItem>
                                ))}
                              </Select>
                              <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
                              <MuiLink 
                                component="span" 
                                onClick={() => removeFromCartHandler(item._id)}
                                sx={{ fontSize: '15px', color: '#ff4343ff', textDecoration: 'none' }}
                              >
                                Delete
                              </MuiLink>
                            </Stack>
                          </Grid>

                          {/* Price */}
                          <Grid item xs={12} sm={2} textAlign="right">
                            <Typography sx={{ fontWeight: 700, fontSize: '18px' }}>
                              ${item.price}
                            </Typography>
                          </Grid>
                        </Grid>
                      </ListItem>
                      <Divider />
                    </Box>
                  ))}
                </List>
              )}
              <Box sx={{ textAlign: 'right', pt: 2 }}>
                <Typography variant="h6">
                  Subtotal ({subtotalItems} items): <strong>${subtotalPrice}</strong>
                </Typography>
              </Box>
            </Card>
          </Grid>

          {/* RIGHT COLUMN: Checkout Box */}
          <Grid item xs={12} md={3}>
            <Card sx={{ p: 2, borderRadius: '4px', boxShadow: 'none' }}>
              <Stack spacing={1}>
                <Typography sx={{ color: '#007600', fontSize: '12px' }}>
                   Your order qualifies for FREE Shipping
                </Typography>
                <Typography variant="h6" sx={{ fontSize: '18px' }}>
                  Subtotal ({subtotalItems} items): <strong>${subtotalPrice}</strong>
                </Typography>
                
                <Button 
                  variant="contained" 
                  fullWidth 
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                  sx={{ 
                    bgcolor: '#FFD814', 
                    color: '#000', 
                    borderRadius: '50px', 
                    textTransform: 'none',
                    fontWeight: 400,
                    boxShadow: '0 2px 5px 0 rgba(213,217,217,.5)',
                    '&:hover': { bgcolor: '#F7CA00' } 
                  }}
                >
                  Proceed to Checkout
                </Button>
              </Stack>
            </Card>
            
            
            <Card sx={{ p: 2, mt: 2, borderRadius: '4px', boxShadow: 'none' }}>
              <Typography variant="body2" fontWeight="bold">Recommended for you</Typography>
              <Typography variant="caption" color="text.secondary">Based on your cart items</Typography>
            </Card>
          </Grid>

        </Grid>
      </Container>
    </Box>
  );
}