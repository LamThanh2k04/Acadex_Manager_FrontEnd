import { adminService } from "@/app/api/adminService"
import { ICreateNotification, IGetStudentBySearch, TUpdateNotification } from "@/app/types/admin/notification.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast";

export const useGetAllNotification = (search: string, page: number) => {
    return useQuery({
        queryKey: ['get-all-notification', search, page],
        queryFn: () => adminService.getAllNotifications(search, page),
        staleTime: 5 * 60 * 1000,
        placeholderData: (prevData) => prevData
    })
};
export const useSendNotification = (onClose: () => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: ICreateNotification) => adminService.sendNotification(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['get-all-notification'] });
            toast.success("Gửi thông báo thành công");
            onClose()
        },
        onError: (error: any) => {
            const message = error.response?.data?.message ?? "Gửi thông báo thất bại";
            toast.error(message);
        }
    })
};
export const useUpdateNotification = (onClose: () => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ notificationId, data }: { notificationId: number, data: TUpdateNotification }) => adminService.updateNotification(notificationId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['get-all-notification'] });
            toast.success("Đã cập nhật thông báo");
            onClose();
        },
        onError: (error: any) => {
            const message = error.response?.data?.message ?? "Chưa cập nhật thông báo";
            toast.error(message);
        }
    })
};
export const useRemoveNotification = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (notificationId: number) => adminService.removeNotification(notificationId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['get-all-notification'] });
            toast.success("Xóa thông báo thành công");
        },
        onError: (error: any) => {
            const message = error.response?.data?.message;
            toast.error(message);
        }
    })
};
export const useGetStudentBySearch = () => {
    return useQuery<IGetStudentBySearch[]>({
        queryKey: ['get-student-search'],
        queryFn: () => adminService.getStudentBySearch(),
        staleTime: 5 * 60 * 1000
    })
}