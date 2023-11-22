import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import courseReducer from "./courseSlice";
import pdfReducer from "./pdfSlice";
import chatReducer from "./chatSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    course: courseReducer,
    pdf: pdfReducer,
    chat: chatReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
