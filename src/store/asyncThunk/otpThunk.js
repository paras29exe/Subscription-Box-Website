import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

export const requestOtp = createAsyncThunk(
    "otp/request",
    async (email, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("/otp/request", { email });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    });

// Async thunk for verifying OTP
export const verifyOtp = createAsyncThunk(
    "otp/verify",
    async ({ email, otp }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("/otp/verify", { email, otp });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

