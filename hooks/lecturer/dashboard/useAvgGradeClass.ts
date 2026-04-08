import { useQuery } from "@tanstack/react-query"
import { getAvgGradeClass } from '@/app/api/lecturerService/dashboard/avgClassGrade';

export const useAvgGradeClass = (courseSectionId: number) => {
    return useQuery({
        queryKey: ['get-avg-grade-class'],
        queryFn: () => getAvgGradeClass(courseSectionId),
        staleTime: 5 * 60 * 1000,
    })
};