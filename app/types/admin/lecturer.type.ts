import { TGender } from "../gender.type";
import { IPagination } from "../pagination";

type TDegreeLecturer = "BACHELOR" | "MASTER" | "DOCTOR" | "ASSOCIATE_PROFESSOR" | "PROFESSOR";
type TPositionLecturer = "LECTURER" | "HEAD_SUBJECT" | "HEAD_DEPARTMENT";
export interface ILecturerDataProps {
    data: ILecturerDataResponse;
};
export interface ILecturerDataResponse {
    lecturers: ILecturerManager[];
    pagination: IPagination;
};
export interface ILecturerManager {
    address: string;
    avatar: string;
    dateOfBirth: string;
    email: string;
    fullName: string;
    gender: TGender;
    isActive: boolean;
    lecturer: ILecturer;
    phoneNumber: string;
}
export interface ILecturer {
    id: number
    citizenId: string;
    degree: string;
    ethnicity: string;
    faculty: IFacultyLecturer;
    lecturerCode: string;
    major: IMajorLecturer;
    personalEmail: string;
    placeOfBirth: string;
    position: string;
    status: TStatusLecturer;

}
export interface IFacultyLecturer {
    name: string
};
export interface IMajorLecturer {
    id: number;
    name: string;
};
export interface ICreateLecturer {
    fullName: string;
    email: string;
    password: string;
    lecturerCode: string;
    avatar: FileList;
    gender: TGender;
    majorId: number;
};
export interface IUpdateLecturerInfo {
    fullName: string;
    email: string;
    lecturerCode: string;
    personalEmail: string;
    placeOfBirth: string;
    ethnicity: string;
    address: string;
    phoneNumber: string;
    citizenId: string;
    majorId: number;
    dateOfBirth: string;
    gender: TGender;
    degree: TDegreeLecturer
    position: TPositionLecturer
    status: TStatusLecturer
    avatar: FileList
}
export interface IMajorSimple {
    id: number;
    name: string;
};
export interface IResetPasswordLecturer {
    newPassword: string;
}
export type TStatusLecturer = "WORKING" | "TRUANT";
