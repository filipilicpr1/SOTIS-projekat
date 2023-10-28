import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { CreateNewCourse } from "../services/CourseServices";
import { toast } from "react-toastify";
import { defaultErrorMessage } from "../constants/Constants";

const initialState = {
  apiState: "COMPLETED",
};

export const createNewCourse = createAsyncThunk(
  "course/new",
  async (data, thunkApi) => {
    try {
      const response = await CreateNewCourse(data);
      return thunkApi.fulfillWithValue(response.data);
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.error);
    }
  }
);

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createNewCourse.pending, (state) => {
      state.apiState = "PENDING";
    });

    builder.addCase(createNewCourse.fulfilled, (state) => {
      state.apiState = "COMPLETED";
      toast.success("A course has been created.", {
        position: "top-center",
        autoClose: 2500,
        closeOnClick: true,
        pauseOnHover: false,
      });
    });

    builder.addCase(createNewCourse.rejected, (state, action) => {
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

export default courseSlice.reducer;
