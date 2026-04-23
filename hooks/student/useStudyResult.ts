import { useQuery } from "@tanstack/react-query"
import { getDetailedStudyResult } from '@/api/studentService/studyResult';
import { IStudyResultDataResponse } from '@/types/student/studyResult.type';

export const useGetDetailedStudyResult = () => {
    return useQuery<IStudyResultDataResponse>({
        queryKey: ['get-detailed-study-result'],
        queryFn: () => getDetailedStudyResult(),
        staleTime: 5 * 60 * 1000,
    })
};
