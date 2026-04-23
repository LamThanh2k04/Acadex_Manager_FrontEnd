import { IPagination } from "../../pagination";

export interface IHomeroomClass {
    lecturerName: string;
    lecturerCode: string;
    avatarLecturer: string;
    lecturerFaculty: string;
    lecturerMajor: string;
    students: IStudentOfHomeroomClass[];
    pagination: IPagination;
};
export interface IStudentOfHomeroomClass {
    studentCode: string;
    falcuty: IFalcutyOfStudent;
    major: IMajorOfStudent;
    user: IUserOfStudent;
};
export interface IFalcutyOfStudent {
    name: string;
};
export interface IMajorOfStudent {
    name: string;
};
export interface IUserOfStudent {
    fullName: string;
    avatar: string;
    email: string;
}