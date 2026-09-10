import axios from "axios";

export const API_BASE_URL =
  (typeof process !== "undefined" && process.env && (process.env.NEXT_PUBLIC_API_URL || process.env.VITE_API_URL)) ||
  "http://localhost:4000/api";

const TOKEN_KEY = "dv_auth_token";
const USER_KEY = "dv_auth_user";

export const tokenStore = {
  get: () => (typeof window !== "undefined" ? localStorage.getItem(TOKEN_KEY) : null),
  set: (t) => {
    if (typeof window !== "undefined") localStorage.setItem(TOKEN_KEY, t);
  },
  clear: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    }
  },
};

export const userStore = {
  get: () => {
    if (typeof window === "undefined") return null;
    const raw = localStorage.getItem(USER_KEY);
    try {
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },
  set: (u) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(USER_KEY, JSON.stringify(u));
    }
  },
};

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = tokenStore.get();
  if (token) {
    config.headers.set("Authorization", `Bearer ${token}`);
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response) {
      const data = error.response.data;
      const message =
        (data && typeof data === "object" && (data.message || data.errors?.[0]?.msg)) ||
        (typeof data === "string" && data) ||
        `Request failed (${error.response.status})`;
      return Promise.reject(new Error(message));
    }
    if (error.request) {
      return Promise.reject(
        new Error(`Cannot reach API at ${API_BASE_URL}. Is the backend running?`)
      );
    }
    return Promise.reject(error);
  }
);

export default api;
