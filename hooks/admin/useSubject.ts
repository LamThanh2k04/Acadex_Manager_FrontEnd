import { adminService } from "@/app/api/adminService"
import { ICreateSubject, TUpdateSubject } from "@/app/types/admin/subject.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast";

export const useGetAllSubjects = (search: string, page: number) => {
    return useQuery({
        queryKey: ['get-all-subject', search, page],
        queryFn: () => adminService.getAllSubject(search, page)
    })
};
export const useCreateSubject = (onClose: () => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['create-subject'],
        mutationFn: (data: ICreateSubject) => adminService.createSubject(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['get-all-subject'] });
            toast.success("Thêm môn học thành công");
            onClose()
        },
        onError: (error: any) => {
            const message = error.response?.data?.message ?? "Thêm môn học thất bại";
            toast.error(message);
        }
    });
};
export const useUpdateSubjectInfo = (onClose: () => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['update-subject-info'],
        mutationFn: ({ subjectId, data }: { subjectId: number, data: TUpdateSubject }) => adminService.updateSubjectInfo(subjectId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['get-all-subject'] });
            toast.success("Cập nhật thông tin môn học thành công");
            onClose()
        },
        onError: (error: any) => {
            const message = error.response?.data?.message;
            toast.error(message);
        }
    });
};
export const useUpdateSubjectStatus = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['update-subject-status'],
        mutationFn: (subjectId: number) => adminService.updateSubjectStatus(subjectId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['get-all-subject'] });
            toast.success("Cập nhật trạng thái môn học thành công");
        },
        onError: (error: any) => {
            const message = error.response?.data?.message || "Cập nhật trạng thái môn học thất bại";
            toast.error(message);
        }
    });
};