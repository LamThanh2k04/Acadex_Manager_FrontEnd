import { useQuery } from "@tanstack/react-query"
import { getDetailedStudyResult } from '@/app/api/studentService/studyResult';
import { IStudyResultData } from '@/app/types/student/studyResult.type';

export const useGetDetailedStudyResult = () => {
    return useQuery<IStudyResultData[]>({
        queryKey: ['get-detailed-study-result'],
        queryFn: () => getDetailedStudyResult(),
        staleTime: 5 * 60 * 1000,
    })
};
