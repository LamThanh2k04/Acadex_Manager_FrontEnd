import { IPagination } from "../pagination";

export interface ISemesterDataResponseProps {
    data: ISemesterDataResponse;
};
export interface ISemesterDataResponse {
    semesters: ISemesterData[];
    pagination: IPagination;
}
export interface ISemesterData {
    id: number;
    name: string;
    academicYear: string;
    startDate: string;
    endDate: string;
    isActive: boolean
};
export interface ICreateSemester {
    name: string;
    academicYear: string;
    startDate: string;
    endDate: string;
};
export type TUpdateSemester = ICreateSemester;
export type TSemesterOfSchedule = Pick<ISemesterData, "name" | "academicYear">;