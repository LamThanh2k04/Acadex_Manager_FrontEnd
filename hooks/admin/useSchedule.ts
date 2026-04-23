import { adminService } from "@/api/adminService"
import { TCreateSchedule, TUpdateSchedule } from "@/types/admin/schedule.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast";

export const useGetAllSchedule = (search: string, page: number) => {
    return useQuery({
        queryKey: ['get-all-schedule', search, page],
        queryFn: () => adminService.getAllSchedule(search, page),
        placeholderData: (prevData) => prevData
    })
};
export const useCreateSchedule = (onClose: () => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['create-schedule'],
        mutationFn: (data: TCreateSchedule) => adminService.createSchedule(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['get-all-schedule'] });
            toast.success("Thêm lịch học thành công");
            onClose()
        },
        onError: (error: any) => {
            const message = error.response?.data?.error ?? "Thêm lịch học thất bại";
            toast.error(message);
        }
    })
};
export const useUpdateScheduleInfo = (onClose: () => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['update-schedule-info'],
        mutationFn: ({ scheduleId, data }: { scheduleId: number, data: TUpdateSchedule }) => adminService.updateScheduleInfo(scheduleId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['get-all-schedule'] });
            toast.success("Đã cập nhật thông tin lịch học");
            onClose();
        },
        onError: (error: any) => {
            const message = error.response?.data?.message ?? "Chưa cập nhật thông tin lịch học";
            toast.error(message);
        }
    })
};
export const useUpdateScheduleStatus = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (scheduleId: number) => adminService.updateScheduleStatus(scheduleId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['get-all-schedule'] });
            toast.success("Đã cập nhật trạng thái lịch học");
        },
        onError: (error: any) => {
            const message = error.response?.data?.message ?? "Chưa cập nhật trạng thái lịch học";
            toast.error(message);
        }
    })
};