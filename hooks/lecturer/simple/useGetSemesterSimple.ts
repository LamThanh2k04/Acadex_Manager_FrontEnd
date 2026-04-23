import { useQuery } from "@tanstack/react-query"
import { getAllSemesterSimple } from '@/api/lecturerService/simple/simple';
import { ISemesterSimple } from '@/app/types/lecturer/simple/semester.type';

export const useGetSemesterSimple = () => {
    return useQuery<ISemesterSimple[]>({
        queryKey: ['get-semester-simple'],
        queryFn: () => getAllSemesterSimple(),
        staleTime: 5 * 60 * 1000,
    })
};