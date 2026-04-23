import { useQuery } from "@tanstack/react-query"
import { getAllScheduleEnrollment } from '@/api/studentService/scheduleEnrollment';
import { IScheduleEnrollmentParams, IScheduleEnrollmentData } from '@/types/student/scheduleEnrollment.type';

export const useGetScheduleEnrollment = (params: IScheduleEnrollmentParams) => {
    const { type, date } = params;
    return useQuery<IScheduleEnrollmentData>({
        queryKey: ['schedule-enrollment', type ?? null, date ?? null],
        queryFn: () => getAllScheduleEnrollment(params),
        staleTime: 5 * 60 * 1000,
        placeholderData: (prevData) => prevData,
    })
}