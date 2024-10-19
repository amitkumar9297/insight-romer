import React from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  Paper,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { styled } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";

// const BackgroundImage = "https://source.unsplash.com/random/1600x900"; // Replace with your image

const StyledContainer = styled(Container)(({ theme }) => ({
  height: "85vh",
  // backgroundImage: `url(${BackgroundImage})`,
  // backgroundSize: "cover",
  // backgroundPosition: "center",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(2),
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(6),
  width: "100%",
  maxWidth: 500,
  boxShadow: theme.shadows[10],
  backgroundColor: theme.palette.background.paper,
  // borderRadius: theme.shape.borderRadius,
  borderRadius: "1rem",
}));

const Login = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await fetch(`http://localhost:8000/api/v1/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Ensure Content-Type is set
        },
        body: JSON.stringify(data),
      });
      const fullResponse = await response.json();
      console.log(fullResponse);
      if (fullResponse?.token) {
        localStorage.setItem("token", fullResponse?.token);
        navigate("/"); // Redirect to home page after login
      }

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <StyledContainer component="main">
      <StyledPaper elevation={6}>
        <Typography variant="h4" align="center" gutterBottom>
          Log In
        </Typography>
        <Typography
          variant="body2"
          align="center"
          color="textSecondary"
          gutterBottom
        >
          Enter your credentials to access your account.
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Email Address"
                variant="outlined"
                margin="normal"
                fullWidth
                error={!!errors.email}
                helperText={errors.email ? errors.email.message : ""}
                sx={{ mb: 2 }}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{ required: "Password is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Password"
                type="password"
                variant="outlined"
                margin="normal"
                fullWidth
                error={!!errors.password}
                helperText={errors.password ? errors.password.message : ""}
                sx={{ mb: 2 }}
              />
            )}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2 }}
            color="primary"
          >
            Sign In
          </Button>
          <Box sx={{ mt: 2, textAlign: "center" }}>
            <Typography variant="body2" color="textSecondary">
              Don't have an account? <Link to={"/signup"}>Sign Up</Link>
            </Typography>
          </Box>
        </Box>
      </StyledPaper>
    </StyledContainer>
  );
};

export default Login;
