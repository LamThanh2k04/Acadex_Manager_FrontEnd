import { useQuery } from "@tanstack/react-query"
import { getInfoLecturer } from '@/api/lecturerService/info/lecturerInfo';
import { ILecturerInfoResponse } from '@/types/lecturer/info/info.type';

export const useGetInfoLecturer = () => {
    return useQuery<ILecturerInfoResponse>({
        queryKey: ['get-info-lecturer'],
        queryFn: () => getInfoLecturer(),
        staleTime: 5 * 60 * 1000,
    })
};