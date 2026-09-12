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
    sendCustomEmail: (payload) => api.post('/contact/send-custom-email', payload).then((r) => r.data),
};
export const expertsApi = {
    submit: (payload) => api.post("/experts", payload).then((r) => r.data),
    list: (params) => api.get("/experts", { params }).then((r) => r.data),
    get: (id) => api.get(`/experts/${id}`).then((r) => r.data),
    update: (id, payload) => api.patch(`/experts/${id}`, payload).then((r) => r.data),
    remove: (id) => api.delete(`/experts/${id}`).then((r) => r.data),
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
export const emailApi = {
    getLogs: (params) => api.get("/email/logs", { params }).then((r) => r.data),
    getSettings: () => api.get("/email/settings").then((r) => r.data),
    saveSettings: (payload) => api.post("/email/settings", payload).then((r) => r.data),
    testSmtp: (payload) => api.post("/email/test-smtp", payload).then((r) => r.data),
};

export const jobsApi = {
    listPublic: (params) => api.get("/jobs", { params }).then((r) => r.data),
    getPublic: (slug) => api.get(`/jobs/${slug}`).then((r) => r.data),
    apply: (formData) =>
        api
            .post("/jobs/apply", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            })
            .then((r) => r.data),
    listAdmin: () => api.get("/jobs/admin/all").then((r) => r.data),
    create: (payload) => api.post("/jobs/admin", payload).then((r) => r.data),
    update: (id, payload) => api.put(`/jobs/admin/${id}`, payload).then((r) => r.data),
    remove: (id) => api.delete(`/jobs/admin/${id}`).then((r) => r.data),
    listApplications: (params) => api.get("/jobs/admin/applications", { params }).then((r) => r.data),
    updateApplication: (id, payload) => api.patch(`/jobs/admin/applications/${id}`, payload).then((r) => r.data),
    removeApplication: (id) => api.delete(`/jobs/admin/applications/${id}`).then((r) => r.data),
};

export const visitorsApi = {
    list: (params) => api.get("/analytics/visitors", { params }).then((r) => r.data),
    remove: (id) => api.delete(`/analytics/visitors/${id}`).then((r) => r.data),
};

export const notificationsApi = {
    getRecent: () => api.get("/notifications").then((r) => r.data),
    markRead: (id) => api.patch(`/notifications/${id}/read`).then((r) => r.data),
    markAllRead: () => api.post("/notifications/mark-all-read").then((r) => r.data),
    remove: (id) => api.delete(`/notifications/${id}`).then((r) => r.data),
};

export const caseStudiesApi = {
    list: (params) => api.get("/case-studies", { params }).then((r) => r.data),
    getBySlug: (slug) => api.get(`/case-studies/slug/${slug}`).then((r) => r.data),
    adminList: () => api.get("/case-studies/admin/all").then((r) => r.data),
    create: (payload) => api.post("/case-studies/admin", payload).then((r) => r.data),
    update: (id, payload) => api.put(`/case-studies/admin/${id}`, payload).then((r) => r.data),
    remove: (id) => api.delete(`/case-studies/admin/${id}`).then((r) => r.data),
    uploadImage: (formData) =>
        api
            .post("/case-studies/admin/upload-image", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            })
            .then((r) => r.data),
};

