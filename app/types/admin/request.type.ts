import { IPagination } from "../pagination";

export interface IRequestDataResponseProps {
    data: IRequestDataResponse;
};
export interface IRequestDataResponse {
    requestCertificates: IRequestData[];
    pagination: IPagination;
};
export interface IRequestData {
    id: number;
    fileUrl: string;
    issueDate: string;
    description: string;
    status: TStatusOfRequest;
    student: IStudentOfRequest;
    template: ITemPlateOfRequest;
}
export type TStatusOfRequest = "PENDING" | "ISSUED" | "REVOKED";
export interface IStudentOfRequest {
    studentCode: string;
    major: {
        name: string;
    };
    user: {
        fullName: string;
        avatar: string;
    }
};
export interface ITemPlateOfRequest {
    code: string;
    name: string;
    description: string;
};
export type TRequestInfoData = IRequestData;
export interface IApproveRequest {
    note: string;
};
export type TRejectRequest = IApproveRequest;