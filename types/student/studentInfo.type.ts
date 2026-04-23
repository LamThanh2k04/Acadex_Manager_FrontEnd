export interface IStudentInfoProps {
    data: IStudentInfo;
}
export interface IStudentInfo {
    fullName: string;
    avatar: string;
    email: string;
    gender: TStudentGender;
    dateOfBirth: string;
    phoneNumber: string;
    address: string;
    isActive: boolean;
    student: IStudentOfStudentInfo;
}
export type TStudentGender = "MALE" | "FEMALE";
export interface IStudentOfStudentInfo {
    id: number;
    studentCode: string;
    personalEmail: string;
    citizenId: string;
    placeOfBirth: string;
    ethnicity: string;
    admissionYear: number;
    graduateYear: number;
    status: TStudentStatus;
    class: IClassOfStudentInfo;
    program: IProgramOfStudentInfo;
    faculty: IFacultyOfStudentInfo;
    major: IMajorOfStudentInfo;
}
export type TStudentStatus = "STUDYING" | "GRADUATE" | "TRUANT";
export interface IClassOfStudentInfo {
    homeroomLecturer: {
        user: {
            fullName: string;
        }
    };
    name: string;
}
export interface IProgramOfStudentInfo {
    code: string;
    name: string;
};
export interface IFacultyOfStudentInfo {
    code: string;
    name: string;
};
export interface IMajorOfStudentInfo {
    code: string;
    name: string;
};