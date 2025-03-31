import { configureStore } from "@reduxjs/toolkit";
import otpReducer from "./slices/OtpSlice.js";

const store = configureStore({
  reducer: {
    otp: otpReducer,
  },
});

export default store;
