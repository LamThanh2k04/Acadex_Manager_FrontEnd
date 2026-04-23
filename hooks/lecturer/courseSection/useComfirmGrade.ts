import { useMutation, useQueryClient } from '@tanstack/react-query';
import { confirmGrade } from '@/api/lecturerService/courseSection/courseSection';
import { IConfirmGrade } from '@/app/types/lecturer/courseSection/courseSection.type';
import toast from 'react-hot-toast';
export const useComfirmGrade = (onClose: () => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: IConfirmGrade[]) => confirmGrade(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['get-student-enrollment-is-paid'] });
            queryClient.invalidateQueries({ queryKey: ['get-courseSection'] });
            toast.success("Nhập điểm thành công");
            onClose();
        },
        onError: (error: any) => {
            const message = error.response?.data?.message ?? "Nhập điểm thất bại";
            toast.error(message);
        }
    })
};