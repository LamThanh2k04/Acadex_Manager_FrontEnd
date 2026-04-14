import axios from "axios";
import toast from "react-hot-toast";
export const https = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true
});
https.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            toast.error("Phiên đăng nhập hết hạn, vui lòng đăng nhập lại");
            setTimeout(() => {
                window.location.href = "/";
            }, 1500);
        } else if (error.code === 'NETWORK_ERROR') {
            toast.error("Lỗi kết nối mạng, vui lòng kiểm tra internet");
        }
        return Promise.reject(error);
    }
);