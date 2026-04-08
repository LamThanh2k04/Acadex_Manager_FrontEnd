import { useMutation } from "@tanstack/react-query"
import { resetPassword } from '@/app/api/lecturerService/resetPassword/resetPassword';
import { IResetPassword } from "@/app/types/lecturer/resetPassword/resetPassword.type";
import toast from "react-hot-toast";

export const useResetPassword = (onClose: () => void) => {
    return useMutation({
        mutationFn: (data: IResetPassword) => resetPassword(data),
        onSuccess: () => {
            toast.success("Cập nhật mật khẩu thành công");
            onClose();
        },
        onError: (error: any) => {
            const message = error.response?.data?.message ?? "Cập nhật mật khẩu thất bại";
            toast.error(message);
        }
    })
};