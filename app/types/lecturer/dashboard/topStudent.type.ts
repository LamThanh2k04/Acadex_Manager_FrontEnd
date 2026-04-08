export interface ITopStudent {
    student: IStudentOfTopStudent;
    grade: IGradeOfTopStudent;
};
export interface IStudentOfTopStudent {
    studentCode: string;
    user: IUserOfStudent;
};
export interface IUserOfStudent {
    fullName: string;
    avatar: string;
};
export interface IGradeOfTopStudent {
    totalScore: number;
}