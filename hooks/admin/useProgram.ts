import { adminService } from "@/app/api/adminService"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { ISemeterOrderByProgram } from '@/app/types/admin/simpleOrOther.type';
import { ICreateCertificateOfProgram, ICreateProgram, ICreateSubjectOfProgram, IProgramDataResponse, IProgramInfoResponse, TUpdateProgramInfo, IUpdateSubjectOfProgram, ISubjectToProgram, ICertificateToProgram } from '@/app/types/admin/program.type';
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
            queryClient.invalidateQueries({ queryKey: ['get-program-info'] });
            toast.success("Đã cập nhật trạng thái chương trình");
        },
        onError: (error: any) => {
            const message = error.response?.data?.message ?? "Chưa cập nhật trạng thái chương trình";
            toast.error(message);
        }
    })
};
export const useGetProgramInfo = (programId: number) => {
    return useQuery<IProgramInfoResponse>({
        queryKey: ['get-program-info', programId],
        queryFn: () => adminService.getProgramInfo(programId),
        staleTime: 5 * 60 * 1000
    })
};
export const useCreateSubjectToProgram = (onClose: () => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ programId, data }: { programId: number, data: ICreateSubjectOfProgram }) => adminService.createSubjectToProgram(programId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['get-program-info'] });
            queryClient.invalidateQueries({ queryKey: ['get-all-subject-to-program'] });
            toast.success("Đã thêm môn học cho chương trình");
            onClose()
        },
        onError: (error: any) => {
            const message = error.response?.data?.message ?? "Chưa môn học cho chương trình";
            toast.error(message);
        }
    })
};
export const useUpdateSubjectToProgram = (onClose: () => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ programSubjectId, data }: { programSubjectId: number, data: IUpdateSubjectOfProgram }) => adminService.updateSubjectToProgram(programSubjectId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['get-program-info'] });
            toast.success("Đã cập nhật môn học cho chương trình");
            onClose()
        },
        onError: (error: any) => {
            const message = error.response?.data?.message ?? "Chưa cập nhật môn học cho chương trình";
            toast.error(message);
        }
    })
};
export const useCreateCertificateToProgram = (onClose: () => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ programId, data }: { programId: number, data: ICreateCertificateOfProgram }) => adminService.createCertificateToProgram(programId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['get-program-info'] });
            queryClient.invalidateQueries({ queryKey: ['get-all-certificate-to-program'] });
            toast.success("Đã thêm chứng chỉ cho chương trình");
            onClose();
        },
        onError: (error: any) => {
            const message = error.response?.data?.message ?? "Chưa thêm chứng chỉ cho chương trình";
            toast.error(message);
        }
    })
};
export const useUpdateCertificationToProgram = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (programCertificateId: number) => adminService.updateCertificateToProgram(programCertificateId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['get-program-info'] });
            toast.success("Đã cập nhật chứng chỉ cho chương trình");
        },
        onError: (error: any) => {
            const message = error.response?.data?.message ?? "Chưa cập nhật chứng chỉ cho chương trình";
            toast.error(message);
        }
    })
};
export const useGetAllSubjectToProgram = (programId: number) => {
    return useQuery<ISubjectToProgram[]>({
        queryKey: ['get-all-subject-to-program', programId],
        queryFn: () => adminService.getAllSubjectToProgram(programId),
        staleTime: 5 * 60 * 1000,
    })
};
export const useGetAllCertificateToProgram = (programId: number) => {
    return useQuery<ICertificateToProgram[]>({
        queryKey: ['get-all-certificate-to-program', programId],
        queryFn: () => adminService.getAllCertificateToProgram(programId),
        staleTime: 5 * 60 * 1000,
    })
}
