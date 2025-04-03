import { configureStore } from "@reduxjs/toolkit";
import otpReducer from "./slices/OtpSlice.js";
import authSlice from "./slices/AuthSlice.js";

const store = configureStore({
  reducer: {
    otp: otpReducer,
    auth: authSlice,
  },
});

export default store;
