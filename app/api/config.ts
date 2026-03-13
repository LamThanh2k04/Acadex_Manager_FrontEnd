import axios from "axios";
import { getCookie } from "cookies-next";


export const https = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});
https.interceptors.request.use(
    (config) => {
        const token = getCookie("accessToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error);
    }
);