import { adminService } from "@/app/api/adminService"
import { ICreatePeriod, TUpdatePeriod } from "@/app/types/admin/period.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast";

export const useGetAllPeriod = (search: string, page: number) => {
    return useQuery({
        queryKey: ['get-all-period', search, page],
        queryFn: () => adminService.getAllPeriod(search, page),
        staleTime: 5 * 60 * 1000,
    })
};
export const useCreatePeriod = (onClose: () => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['create-period'],
        mutationFn: (data: ICreatePeriod) => adminService.createPeriod(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['get-all-period'] });
            toast.success("Thêm tiết học thành công");
            onClose();
        },
        onError: (error: any) => {
            const message = error.response?.data?.message;
            toast.error(message);
        }
    });
};
export const useUpdatePeriodInfo = (onClose: () => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['update-period-info'],
        mutationFn: ({ periodId, data }: { periodId: number, data: TUpdatePeriod }) => adminService.updatePeriodInfo(periodId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['get-all-period'] });
            toast.success("Cập nhật thông tin tiết học thành công");
            onClose();
        },
        onError: (error: any) => {
            const message = error.response?.data?.message;
            toast.error(message);
        }
    });
};
export const useUpdatePeriodStatus = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['update-period-status'],
        mutationFn: (periodId: number) => adminService.updatePeriodStatus(periodId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['get-all-period'] });
            toast.success("Cập nhật trạng thái tiết học thành công");
        },
        onError: (error: any) => {
            const message = error.response?.data?.message;
            toast.error(message);
        }
    });
};