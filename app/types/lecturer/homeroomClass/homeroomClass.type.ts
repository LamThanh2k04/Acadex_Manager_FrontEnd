export interface IHomeroomClass {
    lecturerName: string;
    lecturerCode: string;
    avatarLecturer: string;
    lecturerFalcuty: string;
    lecturerMajor: string;
    students: IStudentOfHomeroomClass[];
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