// api.ts
import axios from "axios";

// 1️⃣ API client үүсгэх
const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL || "http://localhost:4000",
    withCredentials: true, // cookie дамжуулах эсэх
});

// 2️⃣ interceptor нэмэх - бүх хүсэлтэд Bearer токен автоматаар өгөх
API.interceptors.request.use(
    (config) => {
        // localStorage (эсвэл sessionStorage) доторх токен авч байна
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// 3️⃣ API wrapper-ууд
export const authAPI = {
    logIn: (data) => API.post("/auth/login", data),
    logOut: () => API.post("/auth/logout"),
};

export const userAPI = {
    getProfile: () => API.get("/users/profile"),
};

export const employeeAPI = {
    createEmployee: (data) => API.post("/employees", data),
    getEmployees: () => API.get("/employees"),
    getEmployeeById: (id) => API.get(`/employees/${id}`),
    deleteEmployee: (id) => API.delete(`/employees/${id}`),
    updateEmployeeById: (id, data) => API.put(`/employees/${id}`, data),
};

export const activityApi = {
    getActivities: () => API.get("/activities"),
    getActivityById: (id) => API.get(`/activities/${id}`),
    deleteActivity: (id) => API.delete(`/activities/${id}`),
    updateActivityById: (id, data) => API.put(`/activities/${id}`, data),
};

export const requestAPI = {
    createRequest: (data) => API.post("/request/create", data),
    getRequests: () => API.get("/request"),
    getRequestById: (id) => API.get(`/request/${id}`),
    deleteRequest: (id) => API.delete(`/request/${id}`),
    updateRequestById: (id, data) => API.put(`/request/${id}`, data),
    shiftRequest: (data) => API.post(`/request/shift`, data),
    closeShift: (data) => API.post(`/request/close`, data),
};

// 4️⃣ Консол дээр API base URL харуулах
console.log("API base URL:", process.env.REACT_APP_API_URL);

export default API;
