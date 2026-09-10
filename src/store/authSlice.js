import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authApi, tokenStore, userStore } from "@/lib/api";
const initialState = {
    user: userStore.get(),
    token: tokenStore.get(),
    loading: !!tokenStore.get(),
    error: null,
};
export const loginThunk = createAsyncThunk("auth/login", async ({ email, password }, { rejectWithValue }) => {
    try {
        const res = await authApi.login(email, password);
        tokenStore.set(res.token);
        userStore.set(res.user);
        return res.user;
    }
    catch (err) {
        return rejectWithValue(err instanceof Error ? err.message : "Login failed");
    }
});
export const registerThunk = createAsyncThunk("auth/register", async (payload, { rejectWithValue }) => {
    try {
        const res = await authApi.register(payload);
        tokenStore.set(res.token);
        userStore.set(res.user);
        return res.user;
    }
    catch (err) {
        return rejectWithValue(err instanceof Error ? err.message : "Registration failed");
    }
});
export const fetchMeThunk = createAsyncThunk("auth/me", async (_, { rejectWithValue }) => {
    try {
        const res = await authApi.me();
        userStore.set(res.user);
        return res.user;
    }
    catch (err) {
        tokenStore.clear();
        return rejectWithValue(err instanceof Error ? err.message : "Session expired");
    }
});
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout(state) {
            tokenStore.clear();
            state.user = null;
            state.token = null;
            state.error = null;
        },
        clearError(state) {
            state.error = null;
        },
        setCredentials(state, action) {
            tokenStore.set(action.payload.token);
            userStore.set(action.payload.user);
            state.token = action.payload.token;
            state.user = action.payload.user;
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        const setUser = (state, action) => {
            state.user = action.payload;
            state.token = tokenStore.get();
            state.loading = false;
            state.error = null;
        };
        builder
            .addCase(loginThunk.pending, (s) => {
            s.loading = true;
            s.error = null;
        })
            .addCase(loginThunk.fulfilled, setUser)
            .addCase(loginThunk.rejected, (s, a) => {
            s.loading = false;
            s.error = a.payload ?? a.error.message ?? "Login failed";
        })
            .addCase(registerThunk.pending, (s) => {
            s.loading = true;
            s.error = null;
        })
            .addCase(registerThunk.fulfilled, setUser)
            .addCase(registerThunk.rejected, (s, a) => {
            s.loading = false;
            s.error = a.payload ?? a.error.message ?? "Registration failed";
        })
            .addCase(fetchMeThunk.pending, (s) => {
            s.loading = true;
        })
            .addCase(fetchMeThunk.fulfilled, setUser)
            .addCase(fetchMeThunk.rejected, (s) => {
            s.loading = false;
            s.user = null;
            s.token = null;
        });
    },
});
export const { logout, clearError, setCredentials } = authSlice.actions;
export default authSlice.reducer;
