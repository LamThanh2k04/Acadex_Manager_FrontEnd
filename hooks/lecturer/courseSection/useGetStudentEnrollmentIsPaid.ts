import { useQuery } from '@tanstack/react-query';
import { getEnrollmentIsPaid } from '@/api/lecturerService/courseSection/courseSection';
export const useGetStudentEnrollmentIsPaid = (courseSectionId: number, search: string,) => {
    return useQuery({
        queryKey: ['get-student-enrollment-is-paid', courseSectionId, search],
        queryFn: () => getEnrollmentIsPaid(courseSectionId, search),
        staleTime: 5 * 60 * 1000,
        enabled: !!courseSectionId,
    })
};