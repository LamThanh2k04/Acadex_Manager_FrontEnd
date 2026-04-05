import { useQuery } from "@tanstack/react-query"
import { getDetailedStudyResult } from '@/app/api/studentService/studyResult';

export const useGetDetailedStudyResult = () => {
    return useQuery({
        queryKey: ['get-detailed-study-result'],
        queryFn: () => getDetailedStudyResult(),
        staleTime: 5 * 60 * 1000,
    })
};
