import { ILecturer } from "./lecturer.type";
import { IMajorData } from "./major.type";
import { ISubjectData } from "./subject.type";

export interface ILecturerSimple {
    fullName: string;
    lecturer: TLecturerInfoOfSimple;
    major: IMajorInfoOfSimple;
};
export type TLecturerInfoOfSimple = Pick<ILecturer, "id" | "lecturerCode">;
export type IMajorInfoOfSimple = Pick<IMajorData, "id" | "name">;
export interface ISemesterSimple {
    id: number;
    name: string;
    academicYear: string;
    startDate: string;
    endDate: string;
};
export interface ISubjectBySemesterOrder {
    semesterOrder: number;
    subject: TSubjectBySemester;
};
export type TSubjectBySemester = Pick<ISubjectData, "id" | "code" | "name" | "credits">;
export interface ISemeterOrderByProgram {
    semesterOrder: number;
}
export interface IRoomSimple {
    id: number;
    name: string;
    building: IBuidlingOfRoomSimple;
};
export interface IBuidlingOfRoomSimple {
    name: string;
    location: string;
    symbol: string;
};
export interface IPeriodSimple {
    id: number;
    period: number;
    startTime: number;
    endTime: number;
    startHour: string;
    endHour: string;
};
export interface ICourseSectionBySemester {
    id: number;
    sectionCode: string;
    maxStudents: number;
    isActive: boolean;
    subject: TSubjectOfCourseSectionBySemester;
};
export type TSubjectOfCourseSectionBySemester = Pick<ISubjectData, "name">;
export interface ISubjectSimple {
    id: number;
    name: string;
    isActive: boolean;
};
export interface ICertificateSimple {
    id: number;
    name: string;
    description: string;
};
