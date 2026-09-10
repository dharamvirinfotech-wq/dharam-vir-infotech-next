// Axios-based API client. State is managed via Redux Toolkit (see src/store/authSlice.ts).
import api, { API_BASE_URL, tokenStore, userStore } from "./axios";
export { API_BASE_URL, tokenStore, userStore };
export const authApi = {
    login: (email, password) => api.post("/auth/login", { email, password }).then((r) => r.data),
    register: (payload) => api.post("/auth/register", payload).then((r) => r.data),
    me: () => api.get("/auth/me").then((r) => r.data),
};
export const contactApi = {
    submit: (payload) => api.post("/contact", payload).then((r) => r.data),
    list: (params) => api
        .get("/contact", { params })
        .then((r) => r.data),
    get: (id) => api.get(`/contact/${id}`).then((r) => r.data),
    update: (id, payload) => api.patch(`/contact/${id}`, payload).then((r) => r.data),
    remove: (id) => api.delete(`/contact/${id}`).then((r) => r.data),
};
export const expertsApi = {
    submit: (payload) => api.post("/experts", payload).then((r) => r.data),
    list: (params) => api.get("/experts", { params }).then((r) => r.data),
    get: (id) => api.get(`/experts/${id}`).then((r) => r.data),
    update: (id, payload) => api.patch(`/experts/${id}`, payload).then((r) => r.data),
    remove: (id) => api.delete(`/experts/${id}`).then((r) => r.data),
};
export const hireApi = {
    submit: (payload) => api
        .post("/hire", payload)
        .then((r) => r.data),
    list: (params) => api.get("/hire", { params }).then((r) => r.data),
    get: (id) => api.get(`/hire/${id}`).then((r) => r.data),
    update: (id, payload) => api.patch(`/hire/${id}`, payload).then((r) => r.data),
    remove: (id) => api.delete(`/hire/${id}`).then((r) => r.data),
};
export default api;
export const developersApi = {
    list: (params) => api
        .get("/developers", {
        params: { ...params, featured: params?.featured ? "true" : undefined },
    })
        .then((r) => r.data),
    get: (key) => api.get(`/developers/${key}`).then((r) => r.data),
    create: (payload) => api.post("/developers", payload).then((r) => r.data),
    update: (id, payload) => api.patch(`/developers/${id}`, payload).then((r) => r.data),
    remove: (id) => api.delete(`/developers/${id}`).then((r) => r.data),
};
