export interface IScheduleEnrollmentParams {
    date?: string;
    type?: "STUDY" | "EXAM";
}
export interface IScheduleEnrollmentDataProps {
    data: IScheduleEnrollmentData;
}
export interface IScheduleEnrollmentData {
    weekStart: string;
    weekEnd: string;
    studySchedules: IStudySchedules[];
    examSchedules: IExamSchedules[];
};
export interface IStudySchedules {
    subjectCode: string;
    subjectName: string;
    semester: string;
    academicYear: string;
    dayOfWeek: number;
    startTime: number;
    endTime: number;
    startDate: string;
    endDate: string;
    type: TTypeOfStudySchedules,
    room: string;
};
export type TTypeOfStudySchedules = "THEORY" | "PRACTICE" | "ONLINE";
export interface IExamSchedules {
    subjectCode: string;
    subjectName: string;
    semester: string;
    academicYear: string;
    examDate: string;
    startMinute: number;
    endMinute: number;
    room: string;
};