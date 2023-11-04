import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  CreateNewCourse,
  GetAllCourses,
  AddPdfToCourse,
} from "../services/CourseServices";
import { toast } from "react-toastify";
import { defaultErrorMessage } from "../constants/Constants";

const initialState = {
  allCourses: [],
  page: 1,
  totalPages: 0,
  apiState: "COMPLETED",
};

export const createNewCourse = createAsyncThunk(
  "course/new",
  async (data, thunkApi) => {
    try {
      const response = await CreateNewCourse(data);
      return thunkApi.fulfillWithValue(response.data);
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.result);
    }
  }
);

export const getAllCoursesAction = createAsyncThunk(
  "courses/all",
  async (query, thunkApi) => {
    try {
      const response = await GetAllCourses(query);
      return thunkApi.fulfillWithValue(response.data);
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.result);
    }
  }
);

export const addPdfToCourseAction = createAsyncThunk(
  "courses/update",
  async (data, thunkApi) => {
    try {
      const response = await AddPdfToCourse(data.id, data.data);
      return thunkApi.fulfillWithValue(response.data);
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.result);
    }
  }
);

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    changePage(state, action) {
      state.page = action.payload;
    },
    clearAllCourses(state) {
      state.allCourses = [];
      state.page = 1;
      state.totalPages = 0;
      state.apiState = "COMPLETED";
    },
  },
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

    builder.addCase(getAllCoursesAction.pending, (state) => {
      state.apiState = "PENDING";
    });
    builder.addCase(getAllCoursesAction.fulfilled, (state, action) => {
      state.apiState = "COMPLETED";
      state.allCourses = [...action.payload.items];
      state.page = action.payload.page;
      state.totalPages = action.payload.total_pages;
    });
    builder.addCase(getAllCoursesAction.rejected, (state, action) => {
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

    builder.addCase(addPdfToCourseAction.pending, (state) => {
      state.apiState = "PENDING";
    });
    builder.addCase(addPdfToCourseAction.fulfilled, (state) => {
      state.apiState = "COMPLETED";
      toast.success("Course material added successfully.", {
        position: "top-center",
        autoClose: 2500,
        closeOnClick: true,
        pauseOnHover: false,
      });
    });
    builder.addCase(addPdfToCourseAction.rejected, (state, action) => {
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

export const { changePage, clearAllCourses } = courseSlice.actions;
export default courseSlice.reducer;
