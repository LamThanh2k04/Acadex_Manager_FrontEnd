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
    name: string;
};