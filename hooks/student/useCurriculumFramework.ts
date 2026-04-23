import { useQuery } from "@tanstack/react-query"
import { getSemeterOrderProgram, getSubjectBySemesterOrderProgram } from '@/api/studentService/curriculumFramework';
import { ISemesterOrderProgramResponse, ISubjectsBySemesterOrderProgramResponse } from '@/types/student/curriculumFramework.type';

export const useGetSemesterOrderProgram = () => {
    return useQuery<ISemesterOrderProgramResponse>({
        queryKey: ['get-semester-order-program'],
        queryFn: () => getSemeterOrderProgram(),
        staleTime: 5 * 60 * 1000,
    })
};
export const useGetSubjetsBySemesterOrderProgram = (semesterOrder: number) => {
    return useQuery<ISubjectsBySemesterOrderProgramResponse>({
        queryKey: ['get-subjects-by-semester-order-program', semesterOrder],
        queryFn: () => getSubjectBySemesterOrderProgram(semesterOrder),
        staleTime: 5 * 60 * 1000,
        enabled: !!semesterOrder,
        placeholderData: (prevData) => prevData
    })
};