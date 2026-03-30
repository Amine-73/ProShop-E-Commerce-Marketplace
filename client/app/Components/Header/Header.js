"use client";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Badge,
  IconButton,
  Button,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Stack,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu"; // ✅ Correct hamburger icon
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircle from "@mui/icons-material/AccountCircle";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import Link from "next/link";
import SearchBox from "../searchBox/SearchBox";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/store/slices/userSlice";
import { clearCartItems } from "@/store/slices/cartSlice";
import { useLogoutMutation } from "@/store/slices/apiSlice";
import { useRouter } from "next/navigation";
import CloseIcon from "@mui/icons-material/Close";

export default function Navbar() {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.user);
  const [logoutApiCall] = useLogoutMutation();
  const dispatch = useDispatch();
  const router = useRouter();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = (open) => () => {
    setMobileOpen(open);
  };
  const handleClick = (event) => {
  // toggle: if already open, close; otherwise open
  if (anchorEl) {
    setAnchorEl(null);
  } else {
    setAnchorEl(event.currentTarget);
  }
};
  const handleClose = () => {
  setAnchorEl(null);
};

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      dispatch(clearCartItems());
      handleClose();
      router.push("/login");
    } catch (err) {
      console.error("Logout failed:", err);
      alert("Something went wrong while logging out. Please try again.");
    }
  };

  // cart count
  const cartItemsCount = (cartItems || []).reduce(
    (acc, item) => acc + Number(item.qty || 0),
    0,
  );

  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);

  return (
    <>
      <AppBar position="sticky" sx={{ bgcolor: "#131921", zIndex: 1100 }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/* LOGO */}
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", letterSpacing: 1 }}
          >
            <Link href="/" style={{ color: "white", textDecoration: "none" }}>
              PRO<span style={{ color: "#1976d2" }}>SHOP</span>
            </Link>
          </Typography>

          {/* Desktop Search + Icons */}

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
            }}
          >
            <SearchBox />
          </Box>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: 2,
            }}
          >
            <IconButton component={Link} href="/cart" sx={{ color: "white" }}>
              <Badge badgeContent={Number(cartItemsCount)} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
             {hydrated && userInfo ? (
    <Box>
      <Button
        onClick={handleClick}
        sx={{ color: "white", textTransform: "none", whiteSpace: "nowrap" }}
        endIcon={<KeyboardArrowDown />}
      >
        {userInfo.name}
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={() => { handleClose(); router.push("/profile"); }}>
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

          {/* Mobile Hamburger */}
          <IconButton
            sx={{ display: { xs: "flex", md: "none" }, color: "white" }}
            onClick={handleDrawerToggle(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>






      

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle(false)} // closes when clicking outside
      >
        <Box sx={{ width: 250, p: 2 }} role="presentation">
          {/* 1. The Close Button Header */}
          <Stack direction="row" justifyContent="flex-end" alignItems="center">
            <IconButton onClick={() => setMobileOpen(false)}>
              {" "}
              {/* 🚩 Use your state toggle here */}
              <CloseIcon />
            </IconButton>
          </Stack>

          <Box
            sx={{ flexGrow: 1, justifyContent: "center", marginRight: "20px" }}
          >
            <SearchBox />
          </Box>

          <List>
            <ListItemButton
              onClick={handleDrawerToggle(false)}
              component={Link}
              href="/cart"
            >
              <ShoppingCartIcon sx={{ mr: 1 }} />
              <ListItemText primary="Cart" />
            </ListItemButton>

            {userInfo ? (
              <>
                <ListItemButton
                  onClick={() => {
                    router.push("/profile");
                    handleDrawerToggle(false);
                  }}
                >
                  <ListItemText primary="Profile" />
                </ListItemButton>
                <ListItemButton
                  onClick={() => {
                    logoutHandler();
                    handleDrawerToggle(false);
                  }}
                >
                  <ListItemText primary="Logout" />
                </ListItemButton>
              </>
            ) : (
              <ListItemButton
                onClick={() => {
                  router.push("/login");
                }}
              >
                <AccountCircle sx={{ mr: 1 }} />
                <ListItemText primary="Sign In" />
              </ListItemButton>
            )}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
