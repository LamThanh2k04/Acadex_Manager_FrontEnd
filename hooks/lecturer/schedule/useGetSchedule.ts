import { useQuery } from "@tanstack/react-query"
import { getScheduleLecturer } from '@/app/api/lecturerService/schedule/schedule';

export const useGetSchedule = (date: string) => {
    return useQuery({
        queryKey: ['get-schedule-lecturer'],
        queryFn: () => getScheduleLecturer(date),
        staleTime: 5 * 60 * 1000,
    })
};