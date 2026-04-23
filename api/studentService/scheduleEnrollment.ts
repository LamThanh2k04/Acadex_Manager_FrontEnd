import { https } from "../config"
import { IScheduleEnrollmentParams } from '@/types/student/scheduleEnrollment.type';
export const getAllScheduleEnrollment = async ({ type, date }: IScheduleEnrollmentParams) => {
    const params = new URLSearchParams();
    if (type) params.set("type", type);
    if (date) params.set("date", date);
    const queryString = params.toString();
    const url = queryString ? `/api/student/schedule/getAllScheduleEnrollment?${queryString}` : '/api/student/schedule/getAllScheduleEnrollment'
    const res = await https.get(url);
    return res.data.data;
};