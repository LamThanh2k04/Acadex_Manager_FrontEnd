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