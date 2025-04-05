import { createAsyncThunk } from "@reduxjs/toolkit";
import { account, ID } from "../../appwriteAuth/appwrite.config.js";
import { fulfilled, rejected } from "../../utils/responses";

// Signup Thunk (Direct Appwrite Call)
export const signupUser = createAsyncThunk(
    "auth/signupUser",
    async ({ email, password, name, dob }, { rejectWithValue }) => {
        email = email.toLowerCase().trim()

        try {
            const newUser = await account.create(ID.unique(), email, password, name);
            try {
                account.deleteSessions()
            } catch (error) {

            }
            await account.createEmailPasswordSession(email, password);
            await account.createJWT();
            const user = await account.get();
            // const pwHash = await bcrypt.hash(password, 10)

            await account.updatePrefs({
                dob,
                avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${name}&backgroundType=gradientLinear`,
                key: password
            });

            return user;
        } catch (error) {
            return rejectWithValue(rejected(error || "Signup failed"));
        }
    }
);

// Login Thunk
export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async ({ email, password }, { rejectWithValue }) => {
        email = email.toLowerCase().trim()
        try {
            const session = await account.getSession('current');

            if (session) {
                const loggedUser = await account.get();
                const isPwSame = password === loggedUser.prefs.key

                if (loggedUser.email === email && !isPwSame) {
                    return rejectWithValue(rejected({ message: "Wrong Password entered. Please Retry" }));
                } else if (loggedUser.email === email && isPwSame) {
                    return loggedUser;
                } else {
                    await account.deleteSession(session.$id)
                }
            }
        } catch (error) {

        }

        try {

            await account.createEmailPasswordSession(email, password);
            await account.createJWT();
            const user = await account.get();

            console.log(user)
            return user;
        } catch (error) {
            return rejectWithValue(rejected(error || "Login failed"));
        }
    }
);

// Auto Login Thunk
export const autoLogin = createAsyncThunk(
    "auth/autoLogin",
    async (_, { rejectWithValue }) => {
        try {
            const user = await account.get();
            return user;
        } catch (error) {
            return rejectWithValue(rejected(error || "Auto Login Failed"));
        }
    }
);

// Logout Thunk
export const logoutUser = createAsyncThunk(
    "auth/logoutUser",
    async (_, { rejectWithValue }) => {
        try {
            await account.deleteSessions();
            return true;
        } catch (error) {
            return rejectWithValue(rejected(error || "Logout failed"));
        }
    }
);
