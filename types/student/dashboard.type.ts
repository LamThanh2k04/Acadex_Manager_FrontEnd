import { ISemesterSimple } from "./simple.type";
// student info
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
// enrollment
export interface IEnrollmentSemesterProps {
    enrollments: IEnrollmentSemester[];
    semesters: ISemesterSimple[];
    selectedSemesterId: number | null;
    onChangeSemester: (semesterId: number) => void;

}
export interface IEnrollmentSemester {
    courseSection: ICourseSectionOfEnrollment;
}
export interface ICourseSectionOfEnrollment {
    sectionCode: string;
    subject: ISubjectOfCourseSection;
}
export interface ISubjectOfCourseSection {
    name: string;
    credits: number;
};
// total score for chart
export interface ITotalScoreForChartProps {
    data: ITotalScoreForChart[];
    semesters: ISemesterSimple[];
    selectedSemesterId: number | null;
    onChangeSemester: (semesterId: number) => void;
}
export interface ITotalScoreForChart {
    subject: string;
    totalScore: number;
    classAverage: number;
};
// result study credits for pie chart
export interface IResultStudyCreditsForPieChart {
    creditsIsStudy: number;
    totalRequiredCredits: number;
};
export interface IResultStudyCreditsForPieChartProps {
    data: IResultStudyCreditsForPieChart;
}