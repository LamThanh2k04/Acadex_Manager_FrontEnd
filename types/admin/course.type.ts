import { IPagination } from "../pagination";

export interface ICourseDataResponseProps {
    data: ICourseDataResponse;
};
export interface ICourseDataResponse {
    courseSections: ICourseData[];
    pagination: IPagination;
};
export interface ICourseData {
    id: number;
    sectionCode: string;
    maxStudents: number;
    isActive: boolean;
    subject: ISubjectOfCourse;
    plannedClass: IPlannedClassOfCourse;
    lecturer: ILecturerOfCourse;
    semester: ISemesterOfCourse;
};
export interface ISubjectOfCourse {
    name: string
}
export interface IPlannedClassOfCourse {
    id: number;
    name: string;
};
export interface ILecturerOfCourse {
    id: number;
    user: IUserOfLecturer;
};
export interface IUserOfLecturer {
    fullName: string;
};
export interface ISemesterOfCourse {
    name: string;
    academicYear: string;
};
export interface ICreateCourse {
    maxStudents: number;
    subjectId: number;
    lecturerId: number;
    semesterId: number;
    plannedClassId: number;
};
export type TUpdateCourse = Pick<ICreateCourse, "maxStudents" | "lecturerId" | "plannedClassId">;
export interface ICourseForm extends ICreateCourse {
    programId: number;
    semesterOrderId: number;
};