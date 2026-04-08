import { useQuery } from "@tanstack/react-query"
import { getTopStudent } from '@/app/api/lecturerService/dashboard/topStudent';

export const useGetTopStudent = (courseSectionId: number) => {
    return useQuery({
        queryKey: ['get-top-student'],
        queryFn: () => getTopStudent(courseSectionId),
        staleTime: 5 * 60 * 1000,
    })
};