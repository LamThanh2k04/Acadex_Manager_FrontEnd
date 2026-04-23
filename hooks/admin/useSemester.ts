import { adminService } from "@/api/adminService"
import { ICreateSemester, TUpdateSemester } from "@/types/admin/semester.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast";

export const useGetAllSemester = (search: string, page: number) => {
    return useQuery({
        queryKey: ['get-all-semester', search, page],
        queryFn: () => adminService.getAllSemester(search, page),
        staleTime: 5 * 60 * 1000,
        placeholderData: (prevData) => prevData
    });
};
export const useCreateSemester = (onClose: () => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['create-semester'],
        mutationFn: (data: ICreateSemester) => adminService.createSemester(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['get-all-semester'] });
            toast.success("Thêm học kì thành công");
            onClose();
        },
        onError: (error: any) => {
            const message = error.response?.data?.message ?? "Thêm học kì thất bại";
            toast.error(message);
        }
    });
};
export const useUpdateSemesterInfo = (onClose: () => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['update-semester-info'],
        mutationFn: ({ semesterId, data }: { semesterId: number, data: TUpdateSemester }) => adminService.updateSemesterInfo(semesterId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['get-all-semester'] });
            toast.success("Đã cập nhật thông tin học kì");
            onClose();
        },
        onError: (error: any) => {
            const message = error.response?.data?.message ?? "Chưa cập nhật thông tin học kì";
            toast.error(message);
        }
    })
}
export const useUpdateSemesterStatus = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['update-semester-status'],
        mutationFn: (semesterId: number) => adminService.updateSemesterStatus(semesterId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['get-all-semester'] });
            toast.success("Đã cập nhật trạng thái học kì");
        },
        onError: (error: any) => {
            const message = error.response?.data?.message ?? "Chưa cập nhật trạng thái học kì";
            toast.error(message);
        }
    });
};