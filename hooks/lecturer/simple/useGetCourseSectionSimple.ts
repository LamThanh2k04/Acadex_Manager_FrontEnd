import { useQuery } from "@tanstack/react-query"
import { getAllCourseSectionForLecturerSimple } from '@/app/api/lecturerService/simple/simple';

export const useGetCourseSectionSimple = () => {
    return useQuery({
        queryKey: ['get-courseSection-simple-lecturer'],
        queryFn: () => getAllCourseSectionForLecturerSimple(),
        staleTime: 5 * 60 * 1000,
    })
};