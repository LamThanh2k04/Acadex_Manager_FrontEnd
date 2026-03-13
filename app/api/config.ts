import axios from "axios";
export const https = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true
});
// https.interceptors.request.use(
//     (config) => {
//         const token = getCookie("accessToken");
//         console.log("token: ", token)
//         console.log(getCookie("accessToken"))
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`
//         }
//         return config
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );