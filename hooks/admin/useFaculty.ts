import { adminService } from "@/app/api/adminService"
import { ICreateFalcuty, IFacultyResponse } from "@/app/types/admin/faculty.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast";

export const useGetAllFaculties = (search: string, page: number) => {
    return useQuery<IFacultyResponse>({
        queryKey: ['get-all-faculty', search, page],
        queryFn: () => adminService.getAllFaculties(search, page),
        staleTime: 6 * 50 * 1000,
    })
};
export const useCreateFaculties = (onClose: () => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['create-faculties'],
        mutationFn: (name: string) => adminService.createFaculties(name),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['get-all-faculty'] });
            toast.success("Thêm khoa thành công");
            onClose()
        },
        onError: (error: any) => {
            const message = error.response?.data?.message;
            toast.error(message);
        },
    });
};
export const useUpdateFacultiesInfo = (onClose: () => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['update-faculties-info'],
        mutationFn: ({ facultyId, name }: { facultyId: number, name: string }) => adminService.updateFacultiesInfo(facultyId, name),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['get-all-faculty'] });
            toast.success("Cập nhật khoa thành công");
            onClose()
        },
        onError: (error: any) => {
            const message = error.response?.data?.message ?? "Cập nhật khoa thất bại";
            toast.error(message);
        }
    });
};
export const useUpdateFacultiesStatus = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['update-faculties-status'],
        mutationFn: (facultyId: number) => adminService.updateFacultiesStatus(facultyId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["get-all-faculty"] });
            toast.success("Cập nhật trạng thái khoa thành công");
        },
        onError: (error: any) => {
            const message = error.response?.data?.message;
            toast.error(message);
        }
    });
};