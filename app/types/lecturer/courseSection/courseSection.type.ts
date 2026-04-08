import { IPagination } from "../../pagination";

export interface ICourseSectionResponse {
    courseSections: ICourseSection[];
    pagination: IPagination;
}
export interface ICourseSection {
    id: number;
    sectionCode: string;
    maxStudents: number;
    isActive: boolean;
    subject: ISubjectCourseSection;
    plannedClass: IPlannedClassCourseSection;
    semester: ISemesterCourseSection;
};
export interface ISubjectCourseSection {
    name: string;
    credits: number
};
export interface IPlannedClassCourseSection {
    name: string;
};
export interface ISemesterCourseSection {
    id: number;
    name: string;
    academicYear: string;
};
export interface IStudentEnrollmentIsPaid {
    students: IStudentEnrollmentIsPaid[];
    pagination: IPagination;
}
export interface IStudentEnrollmentIsPaid {
    enrollmentId: number;
    sectionCode: string;
    subjectName: string;
    studentCode: string;
    fullName: string;
    avatar: string;
    theory1: number;
    theory2: number;
    practice1: number | null;
    practice2: number | null;
    practice3: number | null;
    midterm: number;
    final: number;
    totalScore: number;
};
export interface IConfirmGrade {
    enrollmentId: number;
    theory1: number;
    theory2: number;
    midterm: number;
    final: number;
}