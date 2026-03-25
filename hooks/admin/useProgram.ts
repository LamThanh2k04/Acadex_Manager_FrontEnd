import { adminService } from "@/app/api/adminService"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { ISemeterOrderByProgram } from '@/app/types/admin/simpleOrOther.type';
import { ICreateProgram, IProgramDataResponse, TUpdateProgramInfo } from "@/app/types/admin/program.type";
import toast from "react-hot-toast";

export const useGetSemesterByProgram = (programId: number) => {
    return useQuery<ISemeterOrderByProgram[]>({
        queryKey: ['get-semester-program', programId],
        queryFn: () => adminService.getSemeterByProgram(programId),
        enabled: !!programId,
        staleTime: 5 * 60 * 1000,
    })
};
export const useGetAllProgram = (search: string, page: number) => {
    return useQuery<IProgramDataResponse>({
        queryKey: ['get-all-program', search, page],
        queryFn: () => adminService.getAllPrograms(search, page),
        staleTime: 5 * 60 * 1000,
        placeholderData: (prevData) => prevData
    })
};
export const useCreateProgram = (onClose: () => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: ICreateProgram) => adminService.createProgram(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['get-all-program'] });
            toast.success("Thêm chương trình thành công");
            onClose();
        },
        onError: (error: any) => {
            const message = error.response?.data?.message ?? "Thêm chương trình thất bại";
            toast.error(message);
        }
    })
};
export const useUpdateProgramInfo = (onClose: () => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ programId, data }: { programId: number, data: TUpdateProgramInfo }) => adminService.updateProgramInfo(programId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['get-all-program'] });
            toast.success("Đã cập nhật thông tin chương trình");
            onClose();
        },
        onError: (error: any) => {
            const message = error.response?.data?.message ?? "Chưa cập nhật thông tin chương trình";
            toast.error(message);
        }
    })
};
export const useUpdateProgramStatus = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (programId: number) => adminService.updateProgramStatus(programId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['get-all-program'] });
            toast.success("Đã cập nhật trạng thái chương trình");
        },
        onError: (error: any) => {
            const message = error.response?.data?.message ?? "Chưa cập nhật trạng thái chương trình";
            toast.error(message);
        }
    })
};
