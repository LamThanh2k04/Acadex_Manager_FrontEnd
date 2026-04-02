import { https } from "../config"
import { ICreatePayment } from '@/app/types/student/payment.type';

export const getUnpaidEnrollment = async () => {
    const res = await https.get("/api/student/payment/getUnpaidEnrollments");
    return res.data.data.enrollments;
};
export const createPayment = async (data: ICreatePayment) => {
    const res = await https.post("/api/student/payment/createPayment", data);
    return res.data;
};
export const getPaidEnrollment = async () => {
    const res = await https.get("/api/student/payment/getAllEnrollmentIsPaid");
    return res.data.data;
};