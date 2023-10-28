import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Login, GetUserById, Register } from "../services/UserService";
import { toast } from "react-toastify";
import { defaultErrorMessage } from "../constants/Constants";

const initialState = {
  token: localStorage.getItem("token"),
  isLoggedIn: localStorage.getItem("token") != null,
  user:
    localStorage.getItem("user") !== null
      ? JSON.parse(localStorage.getItem("user"))
      : null,
  apiState: "COMPLETED",
};

export const loginAction = createAsyncThunk(
  "user/login",
  async (user, thunkApi) => {
    try {
      const response = await Login(user);
      return thunkApi.fulfillWithValue(response.data);
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.error);
    }
  }
);

export const getUserByIdAction = createAsyncThunk(
  "user/get",
  async (id, thunkApi) => {
    try {
      const response = await GetUserById(id);
      return thunkApi.fulfillWithValue(response.data);
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.error);
    }
  }
);

export const registerUserAction = createAsyncThunk(
  "user/register",
  async (data, thunkApi) => {
    try {
      const response = await Register(data);
      return thunkApi.fulfillWithValue(response.data);
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.error);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.isLoggedIn = false;
      state.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      toast.info("Logged out", {
        position: "top-center",
        autoClose: 2500,
        closeOnClick: true,
        pauseOnHover: false,
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginAction.pending, (state) => {
      state.apiState = "PENDING";
    });

    builder.addCase(loginAction.fulfilled, (state, action) => {
      state.apiState = "COMPLETED";
      const token = action.payload.access_token;
      state.token = token;
      state.isLoggedIn = true;
      localStorage.setItem("token", token);
    });

    builder.addCase(loginAction.rejected, (state, action) => {
      state.apiState = "REJECTED";
      let error = defaultErrorMessage;
      if (typeof action.payload === "string") {
        error = action.payload;
      }

      toast.error(error, {
        position: "top-center",
        autoClose: 2500,
        closeOnClick: true,
        pauseOnHover: false,
      });
    });

    builder.addCase(getUserByIdAction.pending, (state) => {
      state.apiState = "PENDING";
    });

    builder.addCase(getUserByIdAction.fulfilled, (state, action) => {
      state.apiState = "COMPLETED";
      state.user = { ...action.payload };
      state.finishedRegistration = action.payload.finishedRegistration;
      localStorage.setItem("user", JSON.stringify(action.payload));
    });

    builder.addCase(getUserByIdAction.rejected, (state, action) => {
      state.apiState = "REJECTED";
      let error = defaultErrorMessage;
      if (typeof action.payload === "string") {
        error = action.payload;
      }

      toast.error(error, {
        position: "top-center",
        autoClose: 2500,
        closeOnClick: true,
        pauseOnHover: false,
      });
    });

    builder.addCase(registerUserAction.pending, (state) => {
        state.apiState = "PENDING";
      });
      builder.addCase(registerUserAction.fulfilled, (state) => {
        state.apiState = "COMPLETED";
        toast.success("You have registered user successfully.", {
          position: "top-center",
          autoClose: 2500,
          closeOnClick: true,
          pauseOnHover: false,
        });
      });
      builder.addCase(registerUserAction.rejected, (state, action) => {
        state.apiState = "REJECTED";
        let error = defaultErrorMessage;
        if (typeof action.payload === "string") {
          error = action.payload;
        }
  
        toast.error(error, {
          position: "top-center",
          autoClose: 2500,
          closeOnClick: true,
          pauseOnHover: false,
        });
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
