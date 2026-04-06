import { https } from "../config"
import { IResetPassword } from '@/app/types/student/resetPassword.type';

export const resetPassword = async (data: IResetPassword) => {
    const res = await https.put("/api/student/reset/resetPassword", data);
    return res.data;
}