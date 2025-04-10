import { createSlice } from "@reduxjs/toolkit";
import { loginUser, signupUser, logoutUser, autoLogin, changePassword } from '../asyncThunk/authThunk.js';

const initialState = {
    userData: null,
    role: 'user', // Default role
    error: null,
    loading: false,
    autoLogin: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Signup Cases
            .addCase(signupUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signupUser.fulfilled, (state, action) => {
                state.loading = false;
                state.userData = action.payload.data; // Store user data
                state.error = null;
            })
            .addCase(signupUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // autoLogin case
            .addCase(autoLogin.pending, (state) => {
                state.autoLogin = true;
                state.error = null;
            })
            .addCase(autoLogin.fulfilled, (state, action) => {
                state.autoLogin = false;
                state.userData = action.payload.data;
                state.error = null;
                state.role = action.payload.user?.role || 'user'; // Assign role if available
            })
            .addCase(autoLogin.rejected, (state, action) => {
                state.autoLogin = false;
                state.userData = null;
                state.error = action.payload;
            })

            // Login Cases
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.userData = action.payload.data;
                state.error = null;
                state.role = action.payload.user?.role || 'user'; // Assign role if available
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // change password case
            .addCase(changePassword.pending, (state) => {
                state.loading = true;
            })
            .addCase(changePassword.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(changePassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Logout Cases
            .addCase(logoutUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.loading = false;
                state.userData = null;
                state.error = null;
                state.role = 'user';
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default authSlice.reducer;
