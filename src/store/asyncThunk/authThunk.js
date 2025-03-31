import { createAsyncThunk } from "@reduxjs/toolkit";
import { account, ID } from "../../appwriteAuth/appwrite.config";
import Cookies from 'js-cookie';

export const signupUser = createAsyncThunk(
    "auth/signup",
    async (userInfo, { rejectWithValue }) => {
        try {
            await account.create(ID.unique(), userInfo.email, userInfo.password, userInfo.name)
            await account.createEmailPasswordSession(userInfo.email, userInfo.password)
            await account.updatePrefs({ dob: userInfo.dob })
      
            // Step 2: Generate JWT
            const jwtResponse = await account.createJWT();
            console.log("JWT Token:", jwtResponse.jwt);
      
            // Step 3: Store JWT in Cookies
            Cookies.set('accessToken', jwtResponse.jwt, {
              expires: 7 * 24 * 60 * 60, // Expires in 7 days
              secure: true, // Ensures it is sent over HTTPS
              sameSite: 'Strict', // Prevents CSRF attacks
            });

            return true;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)