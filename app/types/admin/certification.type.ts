import { IPagination } from "../pagination";

export interface ICertificationDataResponesProps {
    data: ICertificationDataRespones;
};
export interface ICertificationDataRespones {
    certificates: ICertificationData[];
    pagination: IPagination;
};
export interface ICertificationData {
    id: number;
    code: string;
    name: string;
    description: string;
    isActive: boolean
};
export interface ICreateCertification {
    name: string;
    description: string;
}
export type TUpdateCertificationInfo = ICreateCertification;