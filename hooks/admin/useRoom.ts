import { adminService } from "@/app/api/adminService"
import { IBuildingOfRoomSimple, ICreateRoom, IRoomDataResponse, TUpdateRoom } from "@/app/types/admin/room.type"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast";

export const useGetAllRoom = (search: string, page: number) => {
    return useQuery<IRoomDataResponse>({
        queryKey: ['get-all-room', search, page],
        queryFn: () => adminService.getAllRoom(search, page),
        staleTime: 6 * 50 * 1000,
        placeholderData: (prevData) => prevData
    })
};
export const useCreateRoom = (onClose: () => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['create-room'],
        mutationFn: (data: ICreateRoom) => adminService.createRoom(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['get-all-room'] });
            toast.success("Thêm phòng học thành công");
            onClose()
        },
        onError: (error: any) => {
            const message = error.response?.data?.message;
            toast.error(message);
        }
    });
};
export const useGetAllBuildingSimple = () => {
    return useQuery<IBuildingOfRoomSimple[]>({
        queryKey: ['get-all-building-simple'],
        queryFn: () => adminService.getAllBuildingSimple(),
        staleTime: 6 * 50 * 1000
    })
};
export const useUpdateRoomInfo = (onClose: () => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['update-room-info'],
        mutationFn: ({ roomId, data }: { roomId: number, data: TUpdateRoom }) => adminService.updateRoomInfo(roomId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['get-all-room'] });
            toast.success("Đã cập nhật thông tin phòng học");
            onClose()
        },
        onError: (error: any) => {
            const message = error.response?.data?.message ?? "Chưa cập nhật thông tin phòng học";
            toast.error(message)
        }
    })
};
export const useUpdateRoomStatus = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['update-room-status'],
        mutationFn: (roomId: number) => adminService.updateRoomStatus(roomId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['get-all-room'] });
            toast.success("Đã cập nhật trạng thái phòng học");
        }, onError: (error: any) => {
            const message = error.response?.data?.message ?? "Chưa cập nhật trạng thái phòng học";
            toast.error(message);
        }
    });
};