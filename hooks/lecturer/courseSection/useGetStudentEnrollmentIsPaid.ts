import { useQuery } from '@tanstack/react-query';
import { getEnrollmentIsPaid } from '@/app/api/lecturerService/courseSection/courseSection';
export const useGetStudentEnrollmentIsPaid = (search: string, courseSectionId: number) => {
    return useQuery({
        queryKey: ['get-student-enrollment-is-paid'],
        queryFn: () => getEnrollmentIsPaid(search, courseSectionId),
        staleTime: 5 * 60 * 1000,
    })
};