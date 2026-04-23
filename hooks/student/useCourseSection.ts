import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getSubjectsBySemester, getCourseSectionsBySubject, getScheduleByCourseSection, registerCourseSection, cancelCourseSection, getAllEnrollmentCourseSection, getAllSchedulesByCourseSectionRegister } from '@/api/studentService/courseSection';
import { IRegisterCourseSection, ISchedulesByCourseSectionRegister, IEnrollmentCourseSectionData, IScheduleByCourseSection, INewCourseSectionBySubject, ISubjectOfSubjectsBySemester } from '@/types/student/courseSection.type';
import toast from "react-hot-toast";

export const useGetSubjectsBySemester = (semesterId: number) => {
    return useQuery<ISubjectOfSubjectsBySemester[]>({
        queryKey: ['get-subjects-by-semester', semesterId],
        queryFn: () => getSubjectsBySemester(semesterId),
        staleTime: 5 * 60 * 1000,
        enabled: !!semesterId
    })
};
export const useGetCourseSectionsBySubject = (subjectId: number, semesterId: number) => {
    return useQuery<INewCourseSectionBySubject[]>({
        queryKey: ['get-courseSections-by-subject', subjectId, semesterId],
        queryFn: () => getCourseSectionsBySubject(subjectId, semesterId),
        staleTime: 5 * 60 * 1000,
        enabled: !!subjectId && !!semesterId
    })
};
export const useGetScheduleByCourseSection = (courseSectionId: number) => {
    return useQuery<IScheduleByCourseSection>({
        queryKey: ['get-schedule-by-courseSection', courseSectionId],
        queryFn: () => getScheduleByCourseSection(courseSectionId),
        staleTime: 5 * 60 * 1000,
        enabled: !!courseSectionId
    })
};
export const useRegisterCourseSection = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: IRegisterCourseSection) => registerCourseSection(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['get-subjects-by-semester'] });
            queryClient.invalidateQueries({ queryKey: ['get-courseSections-by-subject'] });
            queryClient.invalidateQueries({ queryKey: ['get-schedule-by-courseSection'] });
            queryClient.invalidateQueries({ queryKey: ['get-all-enrollment-courseSection'] });
            queryClient.invalidateQueries({ queryKey: ['get-unpaid-enrollment'] });
            toast.success("Đăng ký học phần thành công");
        },
        onError: (error: any) => {
            const message = error.response?.data?.message ?? "Đăng ký học phần thất bại";
            toast.error(message);
        }
    })
};
export const useCancelCourseSection = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (enrollmentId: number) => cancelCourseSection(enrollmentId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['get-subjects-by-semester'] });
            queryClient.invalidateQueries({ queryKey: ['get-courseSections-by-subject'] });
            queryClient.invalidateQueries({ queryKey: ['get-schedule-by-courseSection'] });
            queryClient.invalidateQueries({ queryKey: ['get-all-enrollment-courseSection'] });
            toast.success("Hủy đăng kí học phần thành công");
        },
        onError: (error: any) => {
            const message = error.response?.data?.message ?? "Hủy bỏ học phần thất bại";
            toast.error(message);
        }
    })
};
export const useGetAllEnrollmentCourseSection = (semesterId: number) => {
    return useQuery<IEnrollmentCourseSectionData>({
        queryKey: ['get-all-enrollment-courseSection', semesterId],
        queryFn: () => getAllEnrollmentCourseSection(semesterId),
        staleTime: 5 * 60 * 1000,
        enabled: !!semesterId,
    })
};
export const useGetAllSchedulesByCourseSectionRegister = (courseSectionId: number) => {
    return useQuery<ISchedulesByCourseSectionRegister[]>({
        queryKey: ['get-all-schedules-by-courseSection', courseSectionId],
        queryFn: () => getAllSchedulesByCourseSectionRegister(courseSectionId),
        staleTime: 5 * 60 * 1000,
        enabled: !!courseSectionId,
    })
}