import { useQuery } from "@tanstack/react-query"
import { getHomeRoomClass } from '@/api/lecturerService/homeroomClass/homeroomClass';
import { IHomeroomClass } from '@/types/lecturer/homeroomClass/homeroomClass.type';

export const useGetHomeroomClass = (search: string, page: number) => {
    return useQuery<IHomeroomClass>({
        queryKey: ['home-room-class', search, page],
        queryFn: () => getHomeRoomClass(search, page),
        staleTime: 5 * 60 * 1000,
        placeholderData: (prevData) => prevData,
    })
};