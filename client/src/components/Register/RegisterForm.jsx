import React, { useState, useEffect } from "react";
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
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { emailRegex } from "../../constants/Constants";
import { useDispatch, useSelector } from "react-redux";
import { registerUserAction } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isNameValid, setIsNameValid] = useState(false);
  const [isNameTouched, setIsNameTouched] = useState(false);
  const [isLastNameValid, setIsLastNameValid] = useState(false);
  const [isLastNameTouched, setIsLastNameTouched] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isEmailTouched, setIsEmailTouched] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isPasswordTouched, setIsPasswordTouched] = useState(false);
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(false);
  const [isConfirmPasswordTouched, setIsConfirmPasswordTouched] =
    useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [requestSent, setRequestSent] = useState(false);
  const apiState = useSelector((state) => state.user.apiState);

  const nameChangeHandler = (event) => {
    setIsNameValid(event.target.value.trim().length > 0);
  };

  const nameBlurHandler = (event) => {
    setIsNameTouched(true);
  };

  const lastNameChangeHandler = (event) => {
    setIsLastNameValid(event.target.value.trim().length > 0);
  };

  const lastNameBlurHandler = (event) => {
    setIsLastNameTouched(true);
  };

  const emailChangeHandler = (event) => {
    setIsEmailValid(emailRegex.test(event.target.value));
  };

  const emailBlurHandler = (event) => {
    setIsEmailTouched(true);
  };

  const passwordChangeHandler = (event) => {
    setIsPasswordValid(event.target.value.trim().length > 0);
    setPasswordsMatch(true);
  };

  const passwordBlurHandler = (event) => {
    setIsPasswordTouched(true);
  };

  const confirmPasswordChangeHandler = (event) => {
    setIsConfirmPasswordValid(event.target.value.trim().length > 0);
    setPasswordsMatch(true);
  };

  const confirmPasswordBlurHandler = (event) => {
    setIsConfirmPasswordTouched(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");
    const confirmPassword = data.get("confirmPassword");
    const name = data.get("name");
    const lastName = data.get("lastName");
    if (
      email == null ||
      password == null ||
      confirmPassword == null ||
      name == null ||
      lastName == null
    ) {
      return;
    }

    if (password !== confirmPassword) {
      setIsPasswordValid(false);
      setIsConfirmPasswordValid(false);
      setPasswordsMatch(false);
      return;
    }

    const registerUser = {
      email: email.toString().trim(),
      password: password.toString().trim(),
      firstName: name.toString().trim(),
      lastName: lastName.toString().trim()
    };

    dispatch(registerUserAction(registerUser));
    setRequestSent(true)
  }

  useEffect(() => {
    if (!requestSent) {
      return;
    }

    if (!(apiState === "COMPLETED")) {
      return;
    }
    
    navigate("/");
  }, [apiState, navigate, requestSent, dispatch]);

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
            <PersonAddIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
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
              helperText={!passwordsMatch && "Passwords must match"}
            />
            <TextField
              margin="normal"
              required
              error={isConfirmPasswordTouched && !isConfirmPasswordValid}
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              autoComplete="confirm-password"
              onChange={confirmPasswordChangeHandler}
              onBlur={confirmPasswordBlurHandler}
              helperText={!passwordsMatch && "Passwords must match"}
            />
            <TextField
              margin="normal"
              required
              error={isNameTouched && !isNameValid}
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              onChange={nameChangeHandler}
              onBlur={nameBlurHandler}
            />
            <TextField
              margin="normal"
              required
              error={isLastNameTouched && !isLastNameValid}
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="lastName"
              onChange={lastNameChangeHandler}
              onBlur={lastNameBlurHandler}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={
                !isEmailValid ||
                !isPasswordValid ||
                !isConfirmPasswordValid ||
                !isNameValid ||
                !isLastNameValid
              }
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
      </Zoom>
    </Container>
  );
};

export default RegisterForm;