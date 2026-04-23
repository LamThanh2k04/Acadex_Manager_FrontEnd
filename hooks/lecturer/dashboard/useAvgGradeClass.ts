import { useQuery } from "@tanstack/react-query"
import { getAvgGradeClass } from '@/api/lecturerService/dashboard/avgClassGrade';
import { IAvgGradeClass } from '@/types/lecturer/dashboard/avgGradeClass.type';

export const useAvgGradeClass = (courseSectionId: number) => {
    return useQuery<IAvgGradeClass[]>({
        queryKey: ['get-avg-grade-class', courseSectionId],
        queryFn: () => getAvgGradeClass(courseSectionId),
        staleTime: 5 * 60 * 1000,
        enabled: !!courseSectionId,
        placeholderData: (prevData) => prevData,
    })
};