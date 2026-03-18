import { adminService } from "@/app/api/adminService"
import { ILecturerDataResponse, IMajorSimple } from "@/app/types/admin/lecturer.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast";

export const useGetAllLecturer = (search: string, page: number) => {
    return useQuery<ILecturerDataResponse>({
        queryKey: ["get-all-lecturer", search, page],
        queryFn: () => adminService.getAllLecturer(search, page),
        staleTime: 6 * 50 * 1000,
    });
};
export const useGetMajorsSimple = () => {
    return useQuery<IMajorSimple[]>({
        queryKey: ["get-majors-simple"],
        queryFn: () => adminService.getAllMajorsSimple(),
        staleTime: 6 * 50 * 1000
    });
};
export const useCreateLecture = (onClose: () => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["create-lecturer"],
        mutationFn: (formData: FormData) => adminService.createLecturer(formData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['get-all-lecturer'] });
            toast.success("Thêm giảng viên thành công");
            onClose();
        },
        onError: (error: any) => {
            const message = error.response?.data?.message ?? "Thêm giảng viên thất bại"
            toast.error(message)
        }
    });
};
export const useUpdateLecturer = (onClose: () => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["update-lecturer"],
        mutationFn: ({ lecturerId, formData }: { lecturerId: number, formData: FormData }) => adminService.updateLecurer(lecturerId, formData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["get-all-lecturer"] });
            toast.success("Cập nhật giảng viên thành công"),
                onClose();
        },

        onError: (error: any) => {
            const message = error.response?.data?.message ?? "Cập nhật giảng viên thất bại";
            toast.error(message);
        }
    });
};
export const useUpdateLecturerStatus = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["update-status-lecturer"],
        mutationFn: (lecturerId: number) => adminService.updateLecturerStatus(lecturerId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["get-all-lecturer"] });
            toast.success("Cập nhật trạng thái giảng viên thành công");
        },
        onError: (error: any) => {
            const message = error.response?.data?.message;
            toast.error(message);
        }
    })
};
export const useUpdatePasswordLecturer = (onClose: () => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["update-password-lecturer"],
        mutationFn: ({ lecturerId, newPassword }: { lecturerId: number, newPassword: string }) => adminService.updateLecturerPassword(lecturerId, newPassword),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["get-all-lecturer"] });
            toast.success("Cập nhật mật khẩu cho giảng viên thành");
            onClose();
        },
        onError: (error: any) => {
            const message = error.response?.data?.message;
            toast.error(message);
        }
    });
};