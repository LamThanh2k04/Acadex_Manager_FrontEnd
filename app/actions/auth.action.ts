"use server"
import { cookies } from "next/headers";
import { authService } from "../api/authService"
import { ILoginUser } from "../types/auth.type";
export const loginUserAction = async (data: ILoginUser) => {
    try {
        const res = await authService.login(data);
        const cookieStore = await cookies();
        cookieStore.set("token", res.data.token.accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24,
            path: "/"
        });
        cookieStore.set("userRole", res.data.token.user.role, {
            httpOnly: true,
            maxAge: 60 * 60 * 24,
            path: "/"
        })
        return {
            success: true,
            role: res.data.token.user.role,
            message: res.message,
            user: res.data.token.user,
        };
    } catch (error) {
        return { success: false, error: "Tài khoản hoặc mật khẩu không đúng" }
    };
};
export const logoutUserAction = async () => {
    try {
        const cookiesStore = await cookies();
        cookiesStore.delete("token");
        cookiesStore.delete("userRole");
        return { success: true };
    } catch (error) {
        return { success: false, error: "Có lỗi xảy ra khi đăng xuất" };
    }
};