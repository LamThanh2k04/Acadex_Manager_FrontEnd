import { adminService } from "@/api/adminService"
import { ICreateCourse, TUpdateCourse } from "@/types/admin/course.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast";
import { ICourseSectionBySemester } from '@/types/admin/simpleOrOther.type';

export const useGetAllCourse = (search: string, page: number) => {
    return useQuery({
        queryKey: ['get-all-course', search, page],
        queryFn: () => adminService.getAllCourse(search, page),
        staleTime: 5 * 60 * 1000,
        placeholderData: (prevData) => prevData
    })
};
export const useCreateCourse = (onClose: () => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['create-course'],
        mutationFn: (data: ICreateCourse) => adminService.createCourse(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['get-all-course'] });
            toast.success("Thêm học phần thành công");
            onClose()
        },
        onError: (error: any) => {
            const message = error.response?.data?.message ?? "Thêm học phần thất bại";
            toast.error(message);
        }
    });
};
export const useUpdateCourseInfo = (onClose: () => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['update-course-info'],
        mutationFn: ({ courseSectionId, data }: { courseSectionId: number, data: TUpdateCourse }) => adminService.updateCourseInfo(courseSectionId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['get-all-course'] });
            toast.success("Đã cập nhật thông tin học phần");
            onClose()
        },
        onError: (error: any) => {
            const message = error?.response?.data?.message ?? "Chưa cập nhật thông tin học phần";
            toast.error(message);
        }
    });
};
export const useUpdateCourseStatus = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['update-course-status'],
        mutationFn: (courseSectionId: number) => adminService.updateCourseStatus(courseSectionId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['get-all-course'] });
            toast.success("Đã cập nhật trạng thái học phần")
        },
        onError: (error: any) => {
            const message = error.response?.data?.message ?? "Chưa cập nhật trạng thái học phần";
            toast.error(message);
        }
    });
};
export const useGetCourseSectionBySemester = (semesterId: number) => {
    return useQuery<ICourseSectionBySemester[]>({
        queryKey: ['courseSection-semeter', semesterId],
        queryFn: () => adminService.getCourseSectionBySemester(semesterId),
        enabled: !!semesterId,
        staleTime: 5 * 60 * 1000
    })
};
