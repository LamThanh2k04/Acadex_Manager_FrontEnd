import { https } from "../../config"
import { IResetPassword } from '@/app/types/lecturer/resetPassword/resetPassword.type';

export const resetPassword = async (data: IResetPassword) => {
    const res = await https.put("/api/lecturer/reset/resetPassword", data);
    return res.data;
};