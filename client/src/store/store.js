import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import courseReducer from "./courseSlice";
import pdfReducer from "./pdfSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    course: courseReducer,
    pdf: pdfReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
