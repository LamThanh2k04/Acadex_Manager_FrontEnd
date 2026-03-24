import { adminService } from "@/app/api/adminService"
import { ICreateExamSchedule, IExamScheduleDataResponse, TUpdateExamScheduleInfo, ICourseSectionHaveSchedule, ISuggestExamSchedule, IAvailableRoomOfExamSchedule } from '@/app/types/admin/exam.type';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast";

export const useGetAllExamSchedule = (search: string, page: number) => {
    return useQuery<IExamScheduleDataResponse>({
        queryKey: ['get-all-examSchedule', search, page],
        queryFn: () => adminService.getAllExamsSchedule(search, page),
        staleTime: 5 * 60 * 1000,
        placeholderData: (prevData) => prevData
    })
};
export const useCreateExamSchedule = (onClose: () => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: ICreateExamSchedule) => adminService.createExamSchedule(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['get-all-examSchedule'] });
            toast.success("Thêm lịch thi thành công");
            onClose();
        },
        onError: (error: any) => {
            const message = error.response?.data?.message ?? "Thêm lịch thi thất bại";
            toast.error(message);
        }
    })
};
export const useUpdateExamScheduleInfo = (onClose: () => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ examScheduleId, data }: { examScheduleId: number, data: TUpdateExamScheduleInfo }) => adminService.updateExamSchuduleInfo(examScheduleId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['get-all-examSchedule'] });
            toast.success("Đã cập nhật thông tin lịch thi");
            onClose();
        },
        onError: (error: any) => {
            const message = error.response?.data?.message ?? "Chưa cập nhật thông tin lịch thi";
            toast.error(message);
        }
    })
};
export const useUpdateExamScheduleStatus = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (examScheduleId: number) => adminService.updateExamScheduleStatus(examScheduleId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['get-all-examSchedule'] });
            toast.success("Đã cập nhật trạng thái lịch thi");
        },
        onError: (error: any) => {
            const message = error.response?.data?.message ?? "Chưa cập nhật trạng thái lịch thi";
            toast.error(message);
        }
    })
};
export const useGetCourseSectionHaveSchedule = (semesterId: number) => {
    return useQuery<ICourseSectionHaveSchedule[]>({
        queryKey: ['get-courSection-schedule', semesterId],
        queryFn: () => adminService.getCourseSectionHaveSchedule(semesterId),
        staleTime: 5 * 60 * 1000,
        enabled: !!semesterId
    })
};
export const useGetSuggestExamSchedule = (courseSectionId: number) => {
    return useQuery<ISuggestExamSchedule>({
        queryKey: ['get-suggest-examSchedule', courseSectionId],
        queryFn: () => adminService.getSuggestExamSchedule(courseSectionId),
        staleTime: 5 * 60 * 1000,
        enabled: !!courseSectionId
    })
};
export const useGetAvailableRoomForExamSchedule = (date: string, startTime: number, endTime: number) => {
    return useQuery<IAvailableRoomOfExamSchedule[]>({
        queryKey: ['get-availableRoom-examSchedule'],
        queryFn: () => adminService.getAvailableRoomsForExamSchedule(date, startTime, endTime),
        staleTime: 5 * 60 * 1000,
        enabled: !!date && !!startTime && !!endTime && startTime < endTime,
    })
};
