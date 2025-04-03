import { createSlice } from "@reduxjs/toolkit";
import { requestOtp, verifyOtp } from "../asyncThunk/otpThunk";

const otpSlice = createSlice({
    name: "otp",
    initialState: {
      verifing: false,
      sendingOtp : false,
      otpSent: false,
      verified: false,
      error: null,
    },
    reducers: {
      resetOtpState: (state) => {
        state.otpSent = false;
        state.verified = false;
        state.error = null;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(requestOtp.pending, (state) => {
          state.sendingOtp = true;
          state.error = null;
        })
        .addCase(requestOtp.fulfilled, (state) => {
          state.sendingOtp = false;
          state.otpSent = true;
        })
        .addCase(requestOtp.rejected, (state, action) => {
          state.sendingOtp = false;
          state.error = action.payload;
        })
        .addCase(verifyOtp.pending, (state) => {
          state.verifing = true;
          state.error = null;
        })
        .addCase(verifyOtp.fulfilled, (state) => {
          state.verifing = false;
          state.verified = true;
        })
        .addCase(verifyOtp.rejected, (state, action) => {
          state.verifing = false;
          state.error = action.payload;
        });
    },
  });
  
  export const { resetOtpState } = otpSlice.actions;
  export default otpSlice.reducer;