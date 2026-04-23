import { adminService } from "@/api/adminService"
import { IHoomroomLecturerSimple, IUpdateClassesInfo } from "@/types/admin/classes.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast";

export const useGetAllClasses = (search: string, page: number) => {
    return useQuery({
        queryKey: ["get-all-classes", search, page],
        queryFn: () => adminService.getAllClasses(search, page),
        staleTime: 6 * 50 * 1000,
        placeholderData: (prevData) => prevData
    });
};
export const useCreateClasses = (onClose: () => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["create-classes"],
        mutationFn: ({ majorId, homeroomLecturerId, name }: { majorId: number, homeroomLecturerId: number, name: string }) => adminService.createClasses(majorId, homeroomLecturerId, name),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['get-all-classes'] });
            toast.success("Thêm lớp học thành công");
            onClose()
        },
        onError: (error: any) => {
            const message = error.response?.data?.message ?? "Thêm lớp họp";
            toast.error(message);
        }
    });
};
export const useUpdateClassesInfo = (onClose: () => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['update-classes-info'],
        mutationFn: ({ classId, data }: { classId: number, data: IUpdateClassesInfo }) => adminService.updateClassesInfo(classId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['get-all-classes'] });
            toast.success("Đã cập nhật thông tin lớp");
            onClose()
        },
        onError: (error: any) => {
            const message = error.response?.data?.message ?? "Chưa cập nhật thông tin lớp";
            toast.error(message);
        }
    });
};
export const useGetAllHomeroomLecturerSimple = (lecturerId: number) => {
    return useQuery<IHoomroomLecturerSimple[]>({
        queryKey: ['get-homeroomLecturer-simple', lecturerId],
        queryFn: () => adminService.getAllHomeroomLecturerSimple(lecturerId),
        enabled: !!lecturerId,
        staleTime: 5 * 60 * 1000
    })
};
export const useUpdateClassesStatus = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['update-classes-status'],
        mutationFn: (classId: number) => adminService.updateClassesStatus(classId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['get-all-classes'] });
            toast.success("Đã cập nhật trạng thái lớp học");
        },
        onError: (error: any) => {
            const message = error.response?.data?.message ?? "Chưa cập nhật trạng thái lớp học";
            toast.error(message);
        }
    });
};