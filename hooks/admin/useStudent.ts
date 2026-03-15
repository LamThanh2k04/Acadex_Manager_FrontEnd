import { adminService } from "@/app/api/adminService"
import { IAddStudent, IClassSimple, IProgramSimple, IStudentManagerRespone } from "@/app/types/admin/student.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast";

export const useGetAllStudent = (search: string, page: number) => {
    return useQuery<IStudentManagerRespone>({
        queryKey: ["get-all-student", search, page],
        queryFn: () => adminService.getAllStudent(search, page),
        staleTime: 6 * 50 * 1000,
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
export const useProgramSimple = () => {
    return useQuery<IProgramSimple[]>({
        queryKey: ["program-simple"],
        queryFn: () => adminService.getAllProgramSimple(),
    })
};
export const useClassSimple = () => {
    return useQuery<IClassSimple[]>({
        queryKey: ["class-simple"],
        queryFn: () => adminService.getAllClassSimple(),
    })
};
export const useUpdateStudentStatusActive = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["update-status-active"],
        mutationFn: (studentId: number) => adminService.updateStudentStatusActive(studentId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["get-all-student"] })
            toast.success("Cập nhật trạng thái thành công");
        },
        onError: () => {
            toast.error("Cập nhật trạng thái thất bại")
        }
    })
}