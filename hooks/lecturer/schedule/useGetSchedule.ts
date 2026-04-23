import { useQuery } from "@tanstack/react-query"
import { getScheduleLecturer } from '@/api/lecturerService/schedule/schedule';
import { IScheduleLecturer } from '@/app/types/lecturer/schedule/schedule.type';

export const useGetSchedule = (date: string) => {
    return useQuery<IScheduleLecturer>({
        queryKey: ['get-schedule-lecturer', date],
        queryFn: () => getScheduleLecturer(date),
        staleTime: 5 * 60 * 1000,
        placeholderData: (prevData) => prevData,
    })
};