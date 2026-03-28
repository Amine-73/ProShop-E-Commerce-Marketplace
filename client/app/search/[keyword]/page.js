"use client";
import React from "react";
import { useParams } from "next/navigation";
import { Container, Grid, Typography, Button } from "@mui/material";
import ProductItem from "../../Components/productItem/ProductItem";
import { useGetProductsQuery } from "../../../store/slices/apiSlice.js";
import Link from "next/link";

export default function SearchPage() {
  const params = useParams();
  const keyword = params.keyword;
  const { data: products } = useGetProductsQuery();
  // Filter products based on the keyword (case-insensitive)
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(keyword.toLowerCase()),
  );

  return (
    <Container sx={{ py: 4 }}>
      <Link href="/">
        <Button variant="outlined" sx={{ mb: 3 }}>
          Go Back
        </Button>
      </Link>

      <Typography variant="h4" sx={{ mb: 3 }}>
        Results for "{keyword}"
      </Typography>

      {filteredProducts.length === 0 ? (
        <Typography variant="h6" color="text.secondary">
          No products found matching that search.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {filteredProducts.map((product) => (
            <Grid key={product._id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <ProductItem product={product} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}
