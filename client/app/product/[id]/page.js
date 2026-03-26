"use client";
import {
  Container,
  Grid,
  Typography,
  Button,
  Box,
  Rating,
  Divider,
  Stack,
  Card,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { useEffect } from "react";
import { useGetProductDetailsQuery } from "../../../store/slices/apiSlice";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../store/slices/cartSlice";
import { useSelector } from "react-redux";


export default function ProductPage({ params }) {
  //Unwrap the params promise using React.use()
  const unwrappedParams = React.use(params);
  const { id } = useParams(); //get the _id From URL

  const { data: product, isLoading, error } = useGetProductDetailsQuery(id);
 
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const router = useRouter();
  const {userInfo}=useSelector((state)=>state.user)
  const addToCartHandler = () => {
    if(!userInfo){
      router.push('/login?redirect=/cart');
      return;
    }
    
      /* dispatch(addToCart({ ...product, qty }));*/
      dispatch(addToCart({
      item: { ...product, qty: Number(qty) },
      userInfo,
    }))
      router.push("/cart");

    
  };

  

  if (isLoading)
    return (
      <Container sx={{ py: 5 }}>
        <Typography>Loading...</Typography>
      </Container>
    );
  if (error || !product)
    return (
      <Container sx={{ py: 5 }}>
        <Typography color="error">
          Product Not Found . Please Try again
        </Typography>
        <Button component={Link} href="/" sx={{ mt: 2 }}>
          Back to Home
        </Button>
      </Container>
    );



  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      {/* Back Button */}
      <Button
        component={Link}
        href="/"
        startIcon={<ArrowBackIcon />}
        sx={{
          mb: 4,
          fontWeight: "500",
          color: "text.secondary",
          "&:hover": { color: "primary.main" },
        }}
      >
        Back to results
      </Button>

      <Grid container spacing={4} sx={{ mt: 2 }}>
        {/* left image preview */}
        <Grid item xs={12} md={5}>
          <Box
            sx={{
              position: "sticky",
              top: "100px",
              textAlign: "center",
              bgcolor: "#fff",
              borderRadius: "24px",
              p: 4,
              height: "500px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{
                maxHeight: "100%", // Won't go bigger than the box
                maxWidth: "100%",
                objectFit: "contain", // Maintains aspect ratio
              }}
            />
          </Box>
        </Grid>

        {/* Right: Product Info & Purchase Action */}
        <Grid item xs={12} md={7}>
          <Stack spacing={2}>
            <Box>
              <Typography
                variant="h4"
                component="h1"
                sx={{ fontWeight: 500, mb: 0.5 }}
              >
                {product.name}
              </Typography>
              <Typography
                variant="body2"
                color="primary"
                sx={{
                  cursor: "pointer",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                Visit the {product.brand} Store
              </Typography>
            </Box>

            {/* Rating */}
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography variant="body2">4.5</Typography>
              <Rating
                value={product.rating}
                readOnly
                precision={0.5}
                size="small"
              />
              <Typography variant="body2" color="primary" sx={{ ml: 1 }}>
                ({product.numReviews} ratings)
              </Typography>
            </Stack>

            <Divider />

            {/* Price Section */}
            <Box sx={{ py: 1 }}>
              <Stack direction="row" alignItems="flex-start" spacing={0.5}>
                <Typography variant="h6" sx={{ mt: 0.5 }}>
                  $
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: 500 }}>
                  {Math.floor(product.price)}
                </Typography>
                <Typography variant="h6" sx={{ mt: 0.5 }}>
                  {/* Safely get the decimals or default to 00 */}
                  {(product.price % 1).toFixed(2).split(".")[1] || "00"}
                </Typography>
              </Stack>
              <Typography variant="body2" color="text.secondary">
                FREE Returns
              </Typography>
            </Box>

            <Divider />

            {/* Description / Features List */}
            <Box>
              <Typography
                variant="h6"
                sx={{ fontSize: "1rem", fontWeight: "bold", mb: 1 }}
              >
                About this item
              </Typography>
              <Typography
                variant="body1"
                sx={{ fontSize: "0.95rem", lineHeight: 1.6 }}
              >
                {product.description}
              </Typography>
            </Box>

            {/* Purchase Action Card */}
            <Card
              variant="outlined"
              sx={{ p: 3, borderRadius: "16px", border: "1px solid #e0e0e0" }}
            >
              <Stack spacing={3}>
                <Stack direction="row" justifyContent="space-between">
                  <Typography color="text.secondary">Availability</Typography>
                  <Typography
                    color={
                      product.countInStock > 0 ? "success.main" : "error.main"
                    }
                    fontWeight="700"
                  >
                    {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                  </Typography>
                </Stack>

                {/* Optional: Add a Quantity Selector here later */}

                {product.countInStock > 0 && (
                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Quantity</InputLabel>
                    <Select
                      value={qty}
                      label="Quantity"
                      onChange={(e) => setQty(e.target.value)}
                    >
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <MenuItem key={x + 1} value={x + 1}>
                          {x + 1}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    bgcolor: "#ffd814",
                    color: "#000",
                    borderRadius: "20px",
                    mb: 1,
                    "&:hover": { bgcolor: "#f7ca00" },
                  }}
                  disabled={product.countInStock === 0}
                  onClick={addToCartHandler}
                >
                  Add to Cart
                </Button>
                
              </Stack>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}
