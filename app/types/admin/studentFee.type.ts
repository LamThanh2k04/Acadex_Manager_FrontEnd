import { IPagination } from "../pagination";

export interface IStudentTuitionStatusDataResponseProps {
    data: IStudentTuitionStatusDataResponse
};
export interface IStudentTuitionStatusDataResponse {
    students: IStudentTuitionStatusData[];
    pagination: IPagination;
};
export interface IStudentTuitionStatusData {
    avatar: string;
    studentCode: string;
    fullName: string;
    semester: string;
    totalCourseFee: number;
    paidAmount: number;
    remainingAmout: number;
    status: TStatusOfStudentFee
};
export type TStatusOfStudentFee = "PAID" | "UNPAID"