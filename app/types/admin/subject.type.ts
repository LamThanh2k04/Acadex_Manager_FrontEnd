import { IPagination } from "../pagination";
export interface ISubjectDataResponseProps {
    data: ISubjectDataResponse;
}
export interface ISubjectDataResponse {
    subjects: ISubjectData[];
    pagination: IPagination;
}
export interface ISubjectData {
    id: number;
    code: string;
    name: string;
    credits: number;
    theoryMinutes: number;
    practiceMinutes: number;
    countToGpa: boolean;
    isActive: boolean;
    theoryPeriods: number;
    practicePeriods: number;
    theoryHours: number;
    practiceHours: number;
};
export interface ICreateSubject {
    name: string;
    credits: number;
    theoryPeriods: number;
    practicePeriods: number;
    countToGpa: boolean
};
export type TUpdateSubject = ICreateSubject;
export type TSubjectOfCourseSectionSchedule = Pick<ISubjectData, "name">;