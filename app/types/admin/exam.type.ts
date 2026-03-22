import { IPagination } from "../pagination";
import { ICourseData } from "./course.type";
import { IRoomData } from "./room.type";

export interface IExamScheduleDataResponseProps {
    data: IExamScheduleDataResponse;
};
export interface IExamScheduleDataResponse {
    examSchedules: IExamScheduleData[];
    pagination: IPagination;
}
export interface IExamScheduleData {
    id: number;
    examDate: string;
    startMinute: number;
    endMinute: number;
    note: string;
    courseSection: TCourseSectionOfExamSchedule;
    room: TRoomOfExamSchedule;
};
export type TCourseSectionOfExamSchedule = Pick<ICourseData, "sectionCode" | "subject">;
export type TRoomOfExamSchedule = Pick<IRoomData, "id" | "name" | "building">;
export interface ICreateExamSchedule {
    courseSectionId: number;
    examDate: string;
    startMinute: number;
    endMinute: number;
    roomId: number;
    note: string
};
export type TUpdateExamScheduleInfo = Omit<ICreateExamSchedule, "courseSectionId">;
