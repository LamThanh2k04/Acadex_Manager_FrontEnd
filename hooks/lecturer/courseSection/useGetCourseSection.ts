import { useQuery } from "@tanstack/react-query"
import { getCourseSection } from '@/api/lecturerService/courseSection/courseSection';

export const useGetCourseSection = (semesterId: number, search: string) => {
    return useQuery({
        queryKey: ['get-courseSection', semesterId, search],
        queryFn: () => getCourseSection(semesterId, search),
        staleTime: 5 * 60 * 1000,
        enabled: !!semesterId,
    })
};