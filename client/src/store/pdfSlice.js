import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GetPdfById } from "../services/PdfService";
import { toast } from "react-toastify";
import { defaultErrorMessage } from "../constants/Constants";

const initialState = {
  pdfFile: null,
  modalOpen: false,
  apiState: "COMPLETED",
};

export const getPdfByIdAction = createAsyncThunk(
  "pdf/get",
  async (id, thunkApi) => {
    try {
      const response = await GetPdfById(id);
      return thunkApi.fulfillWithValue(response.data);
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.error);
    }
  }
);

const pdfSlice = createSlice({
  name: "pdf",
  initialState,
  reducers: {
    clearPdf(state) {
      state.pdfFile = null;
    },
    openModal(state) {
        state.modalOpen = true;
    },
    closeModal(state) {
        state.modalOpen = false;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getPdfByIdAction.pending, (state) => {
      state.apiState = "PENDING";
    });

    builder.addCase(getPdfByIdAction.fulfilled, (state, action) => {
      state.apiState = "COMPLETED";
      state.pdfFile = action.payload;
    });

    builder.addCase(getPdfByIdAction.rejected, (state, action) => {
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

export const { clearPdf, openModal, closeModal } = pdfSlice.actions;
export default pdfSlice.reducer;
