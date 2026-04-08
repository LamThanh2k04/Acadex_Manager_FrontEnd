import { useQuery } from "@tanstack/react-query"
import { getInfoLecturer } from '@/app/api/lecturerService/info/lecturerInfo';

export const useGetInfoLecturer = () => {
    return useQuery({
        queryKey: ['get-info-lecturer'],
        queryFn: () => getInfoLecturer(),
        staleTime: 5 * 60 * 1000,
    })
};