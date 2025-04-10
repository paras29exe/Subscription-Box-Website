import { createAsyncThunk } from "@reduxjs/toolkit";
import { fulfilled, rejected } from "../../utils/responses";
import axiosInstance from "../../utils/axiosInstance.js";

// Signup Thunk (Direct Appwrite Call)
export const signupUser = createAsyncThunk(
    "auth/signupUser",
    async ({ email, password, name, dob }, { rejectWithValue }) => {
        email = email.toLowerCase().trim()

        try {
            const response = await axiosInstance.post("/auth/signup", { email, password, name, dob });
            return fulfilled(response.data);
        } catch (error) {
            return rejectWithValue(rejected(error.response.data));            
        }
    }
);

// Login Thunk
export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async ({ email, password }, { rejectWithValue }) => {
        email = email.toLowerCase().trim()
        try {
            const response = await axiosInstance.post("/auth/login", { email, password });
            return fulfilled(response.data);
        } catch (error) {
            return rejectWithValue(rejected(error.response?.data));
        }
    }
);

// Auto Login Thunk
export const autoLogin = createAsyncThunk(
    "auth/autoLogin",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("/auth/auto-login");
            return fulfilled(response.data);
        } catch (error) {
            return rejectWithValue(rejected(error.response.data));
        }
    }
);

export const changePassword = createAsyncThunk(
    "auth/changePassword",
    async ({ currentPassword, newPassword }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("/auth/change-password", { oldPassword : currentPassword, newPassword });
            return fulfilled(response.data);
        } catch (error) {
            return rejectWithValue(rejected(error.response.data));
        }
    }
)

// Logout Thunk
export const logoutUser = createAsyncThunk(
    "auth/logoutUser",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("/auth/logout");
            return true;
        } catch (error) {
            return rejectWithValue(rejected(error.response.data));
        }
    }
);
