import { useQuery } from "@tanstack/react-query"
import { getTopStudent } from '@/api/lecturerService/dashboard/topStudent';
import { ITopStudent } from '@/app/types/lecturer/dashboard/topStudent.type';

export const useGetTopStudent = (courseSectionId: number) => {
    return useQuery<ITopStudent[]>({
        queryKey: ['get-top-student', courseSectionId],
        queryFn: () => getTopStudent(courseSectionId),
        staleTime: 5 * 60 * 1000,
        enabled: !!courseSectionId,
        placeholderData: (prevData) => prevData
    })
};