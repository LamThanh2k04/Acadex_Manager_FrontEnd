export interface IStudentManagerProps {
    data: IStudentManagerRespone;
}
export interface IStudentManagerRespone {
    pagination: IPagination;
    students: IStudentManager[]
}
export interface IPagination {
    limit: number;
    page: number;
    total: number;
    totalPages: number;
};
export interface IStudentManager {
    address: string;
    avatar: string;
    dateOfBirth: string;
    email: string;
    fullName: string;
    gender: string;
    phoneNumber: string;
    isActive: boolean;
    student: IStudent;
};
export interface IStudent {
    id: number
    admissionYear: number;
    citizenId: string;
    creditsEarned: number;
    ethnicity: string;
    gpa: number;
    graduateYear: number;
    personalEmail: string;
    placeOfBirth: string;
    status: "STUDYING" | "GRADUATE" | "TRUANT";
    studentCode: string;
    class: IClassStudent;
    faculty: IFacultyStudent;
    major: IMajorStudent
    program: IProgramStudent;

};
export interface IClassStudent {
    id: number;
    name: string;
    homeroomLecturer: IHomeRoomLecturer
};
export interface IHomeRoomLecturer {
    user: {
        fullName: string;
    }
};
export interface IFacultyStudent {
    name: string;
};
export interface IMajorStudent {
    name: string
};
export interface IProgramStudent {
    id: number
    name: string;
};
export interface IAddStudent {
    fullName: string;
    email: string;
    password: string;
    studentCode: string;
    gender: "MALE" | "FEMALE";
    avatar: FileList;
    classId: string;
    programId: string;
};
export interface IProgramSimple {
    id: number;
    name: string;
}
export interface IClassSimple {
    id: number;
    name: string;
};
export interface IUpdateStudentInfo {
    fullName: string;
    email: string;
    phoneNumber: string;
    address: string;
    studentCode: string;
    personalEmail: string;
    citizenId: string;
    placeOfBirth: string;
    ethnicity: string
    gender: "MALE" | "FEMALE";
    dateOfBirth: string;
    admissionYear: number;
    graduateYear: number;
    classId: number;
    status: "STUDYING" | "GRADUATE" | "TRUANT";
    avatar: FileList;
};
export interface INewPasswordForStudent {
    newPassword: string;
};