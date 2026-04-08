import { useQuery } from "@tanstack/react-query"
import { getHomeRoomClass } from '@/app/api/lecturerService/homeroomClass/homeroomClass';

export const useGetHomeroomClass = (search: string) => {
    return useQuery({
        queryKey: ['home-room-class'],
        queryFn: () => getHomeRoomClass(search),
        staleTime: 5 * 60 * 1000,
    })
};