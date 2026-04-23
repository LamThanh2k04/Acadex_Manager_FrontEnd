import { adminService } from "@/api/adminService"
import { ICreateCertification, TUpdateCertificationInfo } from "@/types/admin/certification.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast";

export const useGetAllCertification = (search: string, page: number) => {
    return useQuery({
        queryKey: ['get-all-certification', search, page],
        queryFn: () => adminService.getAllCertification(search, page),
        staleTime: 5 * 60 * 1000,
        placeholderData: (prevData) => prevData
    });
};
export const useCreateCertification = (onClose: () => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['create-certification'],
        mutationFn: (data: ICreateCertification) => adminService.createCertification(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['get-all-certification'] });
            toast.success("Thêm chứng chỉ thành công");
            onClose();
        },
        onError: (error: any) => {
            const message = error.response?.data?.message ?? "Thêm chứng chỉ thất bại";
            toast.error(message);
        }
    });
};
export const useUpdateCertificationInfo = (onClose: () => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['update-certification-info'],
        mutationFn: ({ certificateId, data }: { certificateId: number, data: TUpdateCertificationInfo }) => adminService.updateCertificationInfo(certificateId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['get-all-certification'] });
            toast.success("Đã cập nhật thông tin chứng chỉ");
            onClose();
        },
        onError: (error: any) => {
            const message = error.response?.data?.message ?? "Chưa cập nhật thông tin chứng chỉ";
            toast.error(message)
        }
    });
};
export const useUpdateCertificationStatus = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['update-certification-status'],
        mutationFn: (certificateId: number) => adminService.updateCertificationStatus(certificateId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['get-all-certification'] });
            toast.success("Đã cập nhật trạng thái chứng chỉ");
        },
        onError: (error: any) => {
            const message = error.response?.data?.message ?? "Chưa cập nhật trạng thái chứng chỉ";
            toast.error(message)
        }
    });
};