import { IPagination } from "../pagination";
import { TBuildingOfRoomSchedule } from "./building.type";
import { TSemesterOfSchedule } from "./semester.type";
import { TSubjectOfCourseSectionSchedule } from "./subject.type";

export interface IScheduleDataResponseProps {
    data: IScheduleDataResponse;
};
export interface IScheduleDataResponse {
    schedules: IScheduleData[];
    pagination: IPagination;
};
export interface IScheduleData {
    id: number;
    dayOfWeek: number;
    startTimeMinutes: number;
    endTimeMinutes: number;
    startDate: string;
    endDate: string;
    type: TTypeSchedule;
    practiceGroup: number;
    maxStudents: number;
    meetingLink: string;
    courseSection: ICourseSectionOfSchedule;
    room: IRoomOfSchedule;
};
export interface ICourseSectionOfSchedule {
    semester: TSemesterOfSchedule;
    sectionCode: string;
    lecturer: ILecturerOfSchedule;
    subject: TSubjectOfCourseSectionSchedule
}
export interface IRoomOfSchedule {
    id: number;
    name: string;
    building: TBuildingOfRoomSchedule
};
export interface ILecturerOfSchedule {
    user: IUserOfLecturer;
}
export interface IUserOfLecturer {
    fullName: string
};
export type TTypeSchedule = "THEORY" | "PRACTICE" | "ONLINE";
export interface ICreateScheduleBase {
    courseSectionId: number;
    dayOfWeek: number;
    startTimeMinutes: number;
    endTimeMinutes: number;
    roomId: number;
    startDate: string;
    endDate: string;
};
export interface ISchedulePractice extends ICreateScheduleBase {
    type: "PRACTICE";
    practiceGroup?: number;
    maxStudents?: number;
};
export interface IScheduleTheory extends ICreateScheduleBase {
    type: "THEORY";
};
export interface IScheduleOnline extends ICreateScheduleBase {
    type: "ONLINE";
    meetingLink?: string;
};
export type TCreateSchedule = IScheduleTheory | ISchedulePractice | IScheduleOnline;
export interface IScheduleForm {
    courseSectionId: number;
    dayOfWeek: number;
    startTimeMinutes: number;
    endTimeMinutes: number;
    roomId: number;
    startDate: string;
    endDate: string;
    practiceGroup?: number;
    maxStudents?: number;
    meetingLink?: string;
    type: TTypeSchedule;
};
export type TUpdateSchedule = Omit<TCreateSchedule, "courseSectionId">;
export type TUpdateScheduleForm = Omit<IScheduleForm, "courseSectionId">;
export interface IScheduleFormSemester extends IScheduleForm {
    semesterId: number;
    startPeriodId: number;
    endPeriodId: number;
};

