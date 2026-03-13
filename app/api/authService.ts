import { ILoginUser } from "../types/auth.type";
import { https } from "./config"

export const authService = {
    login: async (data: ILoginUser) => {
        const res = await https.post("/api/auth/login", data);
        return res.data
    }
}