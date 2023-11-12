import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GetAnswer } from "../services/ChatService";
import { toast } from "react-toastify";
import { defaultErrorMessage } from "../constants/Constants";

const initialState = {
  messages: [],
  apiState: "COMPLETED",
};

export const getAnswerAction = createAsyncThunk(
  "chat/answer",
  async (data, thunkApi) => {
    try {
      const response = await GetAnswer(data);
      return thunkApi.fulfillWithValue(response.data);
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.result);
    }
  }
);

const chatSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    clearMessages(state) {
      state.messages = [];
      state.apiState = "COMPLETED";
    },
    askQuestion(state, action) {
      const message = {
        text: action.payload.question,
        align: "right",
      };
      state.messages.unshift(message);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAnswerAction.pending, (state) => {
      state.apiState = "PENDING";
    });
    builder.addCase(getAnswerAction.fulfilled, (state, action) => {
      state.apiState = "COMPLETED";
      const message = {
        text: action.payload.result,
        align: "left",
      };
      state.messages.unshift(message);
    });
    builder.addCase(getAnswerAction.rejected, (state, action) => {
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

export const { clearMessages, askQuestion } = chatSlice.actions;
export default chatSlice.reducer;
