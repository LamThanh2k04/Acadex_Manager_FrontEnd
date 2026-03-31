import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getSubjectsBySemester, getCourseSectionsBySubject, getScheduleByCourseSection, registerCourseSection, cancelCourseSection, getAllEnrollmentCourseSection, getAllSchedulesByCourseSectionRegister } from '@/app/api/studentService/courseSection';
import { IRegisterCourseSection, ISchedulesByCourseSectionRegisterData, IEnrollmentCourseSectionData, IScheduleByCourseSection, ICourseSectionBySubjectData, ISubjectsBySemesterData } from '@/app/types/student/courseSection.type';
import toast from "react-hot-toast";

export const useGetSubjectsBySemester = (semesterId: number) => {
    return useQuery<ISubjectsBySemesterData>({
        queryKey: ['get-subjects-by-semester', semesterId],
        queryFn: () => getSubjectsBySemester(semesterId),
        staleTime: 5 * 60 * 1000,
        enabled: !!semesterId
    })
};
export const useGetCourseSectionsBySubject = (subjectId: number, semesterId: number) => {
    return useQuery<ICourseSectionBySubjectData>({
        queryKey: ['get-courseSections-by-subject', subjectId, semesterId],
        queryFn: () => getCourseSectionsBySubject(subjectId, semesterId),
        staleTime: 5 * 60 * 1000,
        enabled: !!subjectId && !!semesterId
    })
};
export const useGetScheduleByCourseSection = (courseSectionId: number) => {
    return useQuery<IScheduleByCourseSection>({
        queryKey: ['get-schedule-by-courseSection'],
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
            toast.success("Hủy đăng kí học phần thành công");
        },
        onError: (error: any) => {
            const message = error.response?.data?.message ?? "Hủy bỏ học phần thất bại";
            toast.error(message);
        }
    })
};
export const useGetAllEnrollmentCourseSection = () => {
    return useQuery<IEnrollmentCourseSectionData>({
        queryKey: ['get-all-enrollment-courseSection'],
        queryFn: () => getAllEnrollmentCourseSection(),
        staleTime: 5 * 60 * 1000,
    })
};
export const useGetAllSchedulesByCourseSectionRegister = (courseSectionId: number) => {
    return useQuery<ISchedulesByCourseSectionRegisterData>({
        queryKey: ['get-all-schedules-by-courseSection', courseSectionId],
        queryFn: () => getAllSchedulesByCourseSectionRegister(courseSectionId),
        staleTime: 5 * 60 * 1000,
    })
}