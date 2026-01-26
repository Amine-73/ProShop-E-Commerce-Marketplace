"use client";
import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
} from "@mui/material";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useRegisterMutation } from "@/store/slices/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../store/slices/userSlice";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [register, { isLoading, error }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const router = useRouter();

  const searchParams = useSearchParams();

  const redirect = searchParams.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      router.push(redirect);
    }
  }, [redirect, router, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    //logic to send data to backend
    try {
      const res = await register({ name, email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      router.push(redirect);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography
          variant="h4"
          sx={{ mb: 3, fontWeight: "bold", textAlign: "center" }}
        >
          Create Account
        </Typography>
        {/* Show error message if registration fails */}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error?.data?.message || error.error}
          </Alert>
        )}

        <Box component="form" onSubmit={submitHandler}>
          <TextField
            fullWidth
            label="Your Name"
            margin="normal"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            fullWidth
            label="Email Address"
            type="email"
            margin="normal"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            required
            placeholder="At least 6 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            fullWidth
            label="Re-enter Password"
            type="password"
            margin="normal"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 3,
              mb: 2,
              bgcolor: "#FFD814",
              color: "#000",
              fontWeight: "bold",
              "&:hover": { bgcolor: "#F7CA00" },
            }}
          >
            Create your account
          </Button>

          <Typography variant="body2" sx={{ textAlign: "center", mt: 2 }}>
            Already have an account?{" "}
            <Link
              href="/login"
              style={{
                color: "#007185",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Sign In
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}
