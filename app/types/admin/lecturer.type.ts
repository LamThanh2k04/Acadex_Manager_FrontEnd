export interface ILecturerDataProps {
    data: ILecturerDataResponse;
}
export interface ILecturerDataResponse {
    lecturers: ILecturerManager[];
    pagination: IPagination;
}
export interface IPagination {
    limit: number;
    page: number;
    total: number;
    totalPages: number;
};
export interface ILecturerManager {
    address: string;
    avatar: string;
    dateOfBirth: string;
    email: string;
    fullName: string;
    gender: "MALE" | "FEMALE";
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
    status: "WORKING" | "TRUANT";

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
    gender: "MALE" | "FEMALE";
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
    gender: "MALE" | "FEMALE";
    degree: "BACHELOR" | "MASTER" | "DOCTOR" | "ASSOCIATE_PROFESSOR" | "PROFESSOR";
    position: "LECTURER" | "HEAD_SUBJECT" | "HEAD_DEPARTMENT";
    status: "WORKING" | "TRUANT";
    avatar: FileList
}
export interface IMajorSimple {
    id: number;
    name: string;
};
export interface IResetPasswordLecturer {
    newPassword: string;
}