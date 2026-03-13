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
        console.log("Backend trả về", res);
        console.log("Backend trả về user", res.data.token.user);
        return {
            success: true,
            role: res.data.token.user.role,
            message: res.message,
            user: res.data.token.user,
        };
    } catch (error) {
        return { success: false, error: "Tài khoản hoặc mật khẩu không đúng" }
    };
}   