import React, { useState } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Box,
  Typography,
  Container,
  Zoom,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { emailRegex } from "../../constants/Constants";
import { useDispatch } from "react-redux";
import { loginAction } from "../../store/userSlice";

const LoginForm = () => {
  const dispatch = useDispatch();
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isEmailTouched, setIsEmailTouched] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isPasswordTouched, setIsPasswordTouched] = useState(false);

  const emailChangeHandler = (event) => {
    setIsEmailValid(emailRegex.test(event.target.value));
  };

  const emailBlurHandler = (event) => {
    setIsEmailTouched(true);
  };

  const passwordChangeHandler = (
    event
  ) => {
    setIsPasswordValid(event.target.value.trim().length >= 0);
  };

  const passwordBlurHandler = (event) => {
    setIsPasswordTouched(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");
    if (email == null || password == null) {
      return;
    }

    const userLogin = {
      email: email.toString().trim(),
      password: password.toString().trim(),
    };

    dispatch(loginAction(userLogin));
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Zoom in={true}>
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <LockOutlinedIcon style={{ color: 'white' }}/>
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              error={isEmailTouched && !isEmailValid}
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={emailChangeHandler}
              onBlur={emailBlurHandler}
            />
            <TextField
              margin="normal"
              required
              error={isPasswordTouched && !isPasswordValid}
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={passwordChangeHandler}
              onBlur={passwordBlurHandler}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={!isEmailValid || !isPasswordValid}
              sx={{ mt: 3, mb: 2, color: "white" }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Zoom>
    </Container>
  );
};

export default LoginForm;