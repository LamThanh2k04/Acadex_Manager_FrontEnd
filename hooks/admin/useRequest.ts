import { adminService } from "@/api/adminService"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast";
export const useGetAllRequest = (status: string, page: number) => {
    return useQuery({
        queryKey: ['get-all-request', status, page],
        queryFn: () => adminService.getAllRequest(status, page),
        staleTime: 5 * 60 * 1000,
        placeholderData: (prevData) => prevData,
    })
};
export const useGetRequestInfo = (certificateId: number) => {
    return useQuery({
        queryKey: ['get-request-info', certificateId],
        queryFn: () => adminService.getInfoRequest(certificateId),
        staleTime: 5 * 60 * 1000,
    })
};
export const useApproveRequest = (onClose: () => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ certificateId, note }: { certificateId: number, note: string }) => adminService.approveRequest(certificateId, note),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['get-all-request'] });
            queryClient.invalidateQueries({ queryKey: ['get-request-info'] });
            toast.success("Chấp nhận yêu cầu thành công");
            onClose();
        },
        onError: (error: any) => {
            const message = error.response?.data?.message ?? "Chấp nhận yêu cầu thất bại";
            toast.error(message);
        }
    })
};
export const useRejectRequest = (onClose: () => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ certificateId, note }: { certificateId: number, note: string }) => adminService.rejectRequest(certificateId, note),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['get-all-request'] });
            queryClient.invalidateQueries({ queryKey: ['get-request-info'] });
            toast.success("Từ chối yêu cầu thành công");
            onClose();
        },
        onError: (error: any) => {
            const message = error.response?.data?.message ?? "Từ chối yêu cầu thất bại";
            toast.error(message);
        }
    })
};