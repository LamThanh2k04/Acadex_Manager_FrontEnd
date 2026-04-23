import { adminService } from "@/api/adminService"
import { IBuildingDataResponse, ICreateBuilding, TUpdateBuilding } from "@/types/admin/building.type"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"

export const useGetAllBuilding = (search: string, page: number) => {
    return useQuery<IBuildingDataResponse>({
        queryKey: ['get-all-building', search, page],
        queryFn: () => adminService.getAllBuilding(search, page),
        staleTime: 6 * 50 * 1000,
        placeholderData: (prevData) => prevData
    })
};
export const useCreateBuilding = (onClose: () => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['create-building'],
        mutationFn: (data: ICreateBuilding) => adminService.createBuilding(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['get-all-building'] });
            toast.success("Thêm cơ sở thành công");
            onClose()
        },
        onError: (error: any) => {
            const message = error.response?.data?.message ?? "Thêm cơ sở thất bại";
            toast.error(message);
        }
    });
};
export const useUpdateBuildingInfo = (onClose: () => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['update-building-info'],
        mutationFn: ({ buildingId, data }: { buildingId: number, data: TUpdateBuilding }) => adminService.updateBuildingInfo(buildingId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['get-all-building'] });
            toast.success("Đã cập nhật thông tin cơ sở");
            onClose()
        },
        onError: (error: any) => {
            const message = error.response?.data?.message ?? "Chưa cập nhật thông tin cơ sở";
            toast.error(message);
        }
    });
};
export const useUpdateBuildingStatus = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['update-building-status'],
        mutationFn: (buildingId: number) => adminService.updateBuildingStatus(buildingId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['get-all-building'] });
            toast.success("Đã cập nhật trạng thái cơ sở");
        },
        onError: (error: any) => {
            const message = error.response?.data?.message ?? "Chưa cập nhật trạng thái cơ sở";
            toast.error(message);
        }
    });
};