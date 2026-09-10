import { useEffect } from "react";
import { fetchMeThunk, loginThunk, registerThunk, logout as logoutAction, } from "@/store/authSlice";
import { useAppDispatch, useAppSelector } from "@/store";
import { tokenStore } from "@/lib/api";
export const AuthProvider = ({ children }) => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (tokenStore.get()) {
            dispatch(fetchMeThunk());
        }
    }, [dispatch]);
    return <>{children}</>;
};
export const useAuth = () => {
    const dispatch = useAppDispatch();
    const { user, token, loading, error } = useAppSelector((s) => s.auth);
    const login = async (email, password) => {
        const result = await dispatch(loginThunk({ email, password }));
        if (loginThunk.rejected.match(result)) {
            throw new Error(result.payload ?? "Login failed");
        }
        return result.payload;
    };
    const register = async (payload) => {
        const result = await dispatch(registerThunk(payload));
        if (registerThunk.rejected.match(result)) {
            throw new Error(result.payload ?? "Registration failed");
        }
        return result.payload;
    };
    const logout = () => dispatch(logoutAction());
    const hasRole = (...roles) => !!user && roles.includes(user.role);
    return { user, token, loading, error, login, register, logout, hasRole };
};
