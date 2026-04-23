import { adminService } from "@/api/adminService"
import { IAddStudent, IClassSimple, INewPasswordForStudent, IProgramSimple, IStudentManagerRespone, IUpdateStudentInfo } from "@/app/types/admin/student.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast";

export const useGetAllStudent = (search: string, page: number) => {
    return useQuery<IStudentManagerRespone>({
        queryKey: ["get-all-student", search, page],
        queryFn: () => adminService.getAllStudent(search, page),
        staleTime: 6 * 50 * 1000,
        placeholderData: (prevData) => prevData
    });
};
export const useCreateStudent = (onClose: () => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["create-student"],
        mutationFn: (formData: FormData) => adminService.createStudent(formData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["get-all-student"] });
            toast.success("Thêm sinh viên thành công");
            onClose();
        },
        onError: (error: any) => {
            const message = error?.response?.data?.message ?? "Thêm sinh viên thất bại"
            toast.error(message);
        }
    })
};
export const useClassedByProgram = (programId: number) => {
    return useQuery({
        queryKey: ["class-by-programId", programId],
        queryFn: () => adminService.getClassesByProgram(programId),
        staleTime: 6 * 50 * 1000,
    })
}
export const useUpdateStudentStatusActive = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["update-status-active"],
        mutationFn: (studentId: number) => adminService.updateStudentStatusActive(studentId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["get-all-student"] })
            toast.success("Đã cập nhật trạng thái sinh viên");
        },
        onError: (error: any) => {
            const message = error.response?.data?.message ?? "Chưa cập nhật trạng thái sinh viên";
            toast.error(message)
        }
    })
};
export const useUpdateStudentInfo = (onClose: () => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["update-student-info"],
        mutationFn: ({ studentId, formData }: { studentId: number, formData: FormData }) => adminService.updateStudentInfo(studentId, formData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["get-all-student"] });
            toast.success("Đã cập nhật thông tin sinh viên"),
                onClose()
        },

        onError: (error: any) => {
            const message = error.response?.data?.message ?? "Chưa cập nhật thông tin sinh viên"
            toast.error(message)
        }
    })
};
export const useUpdatePasswordStudent = (onClose: () => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['update-password-student'],
        mutationFn: ({ studentId, newPassword }: { studentId: number, newPassword: string }) => adminService.updateResetPasswordStudent(studentId, newPassword),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["get-all-student"] });
            toast.success("Cập nhật mật khẩu thành công");
            onClose()
        },
        onError: (error: any) => {
            const message = error.response?.data?.message ?? "Cập nhật mật khẩu thất bại";
            toast.error(message);
        }
    })
}