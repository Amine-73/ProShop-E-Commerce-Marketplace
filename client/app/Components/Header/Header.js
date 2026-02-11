"use client";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  InputBase,
  Badge,
  IconButton,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
// import { useCart } from '@/app/context/CartContext';
import Link from "next/link";
import SearchBox from "../searchBox/SearchBox";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/store/slices/userSlice";
import { useRouter } from "next/navigation";
import { AccountCircle, KeyboardArrowDown } from "@mui/icons-material";
import { clearCartItems } from "@/store/slices/cartSlice";

export default function Navbar() {
  const { cartItems } = useSelector((state) => state.cart);
  const [mounted, setMounted] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();
  // get userInfo from Redux
  const { userInfo } = useSelector((state) => state.user);
  // menu state for the dropdown
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const logoutHandler = () => {
    if (userInfo?._id) {
    localStorage.removeItem(`cart_${userInfo._id}`);
    }
    // Make sure clearCartItems doesn't try to save to 'cart' inside the slice
    dispatch(logout())
    dispatch(clearCartItems()); 
    handleClose();
    router.push("/login");
  };
  // This ensures the component only shows cart data AFTER it reaches the browser
  useEffect(() => {
    setMounted(true);
  }, []);

  if(!mounted)return null;

  // calcule total quantity or all items in cart
  const cartItemsCount = mounted
    ? (cartItems || []).reduce((acc, item) => acc +Number(item.qty||0), 0)
    : 0;
  return (
    <AppBar position="sticky" sx={{ bgcolor: "#131921", zIndex: 1100 }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* LOGO */}
        <Typography variant="h6" sx={{ fontWeight: "bold", letterSpacing: 1 }}>
          <Link href="/" style={{ color: "white", textDecoration: "none" }}>
            PRO<span style={{ color: "#1976d2" }}>SHOP</span>
          </Link>
        </Typography>

        {/* SEARCH BAR */}
        <Box>
          <SearchBox />
        </Box>

        {/* ICONS */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {/* Cart Link */}
          <IconButton component={Link} href="/cart" sx={{ color: "white" }}>
            <Badge badgeContent={Number(cartItemsCount)} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>

          {/* User Menu - Notice we removed the IconButton wrapper here */}
          {userInfo ? (
            <Box>
              <Button
                onClick={handleClick}
                sx={{
                  color: "white",
                  textTransform: "none",
                  whiteSpace: "nowrap",
                }}
                endIcon={<KeyboardArrowDown />}
              >
                {userInfo.name}
              </Button>
              <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                <MenuItem
                  onClick={() => {
                    handleClose();
                    router.push("/profile");
                  }}
                >
                  Profile
                </MenuItem>
                <MenuItem onClick={logoutHandler}>Logout</MenuItem>
              </Menu>
            </Box>
          ) : (
            <Button
              onClick={() => router.push("/login")}
              sx={{ color: "white" }}
              startIcon={<AccountCircle />}
            >
              Sign In
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
