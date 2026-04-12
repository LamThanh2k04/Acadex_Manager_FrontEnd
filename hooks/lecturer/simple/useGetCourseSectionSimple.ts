import { useQuery } from "@tanstack/react-query"
import { getAllCourseSectionForLecturerSimple } from '@/app/api/lecturerService/simple/simple';
import { ICourseSectionSimple } from '@/app/types/lecturer/simple/courseSection.type';

export const useGetCourseSectionSimple = () => {
    return useQuery<ICourseSectionSimple[]>({
        queryKey: ['get-courseSection-simple-lecturer'],
        queryFn: () => getAllCourseSectionForLecturerSimple(),
        staleTime: 5 * 60 * 1000,
    })
};