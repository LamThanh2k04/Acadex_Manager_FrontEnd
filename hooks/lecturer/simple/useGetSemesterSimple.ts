import { useQuery } from "@tanstack/react-query"
import { getAllSemesterSimple } from '@/app/api/lecturerService/simple/simple';

export const useGetSemesterSimple = () => {
    return useQuery({
        queryKey: ['get-semester-simple'],
        queryFn: () => getAllSemesterSimple(),
        staleTime: 5 * 60 * 1000,
    })
};