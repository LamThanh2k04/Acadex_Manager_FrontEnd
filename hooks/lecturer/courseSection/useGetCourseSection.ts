import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getCourseSection, getEnrollmentIsPaid, confirmGrade } from '@/app/api/lecturerService/courseSection/courseSection';
import { IConfirmGrade } from '@/app/types/lecturer/courseSection/courseSection.type';
import toast from "react-hot-toast";

export const useGetCourseSection = (semesterId: number, search: string) => {
    return useQuery({
        queryKey: ['get-courseSection', semesterId, search],
        queryFn: () => getCourseSection(semesterId, search),
        staleTime: 5 * 60 * 1000,
        enabled: !!semesterId
    })
};