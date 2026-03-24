import { IPagination } from "../pagination";
import { IBuildingData } from "./building.type";
import { ICourseData } from "./course.type";
import { IRoomData } from "./room.type";
import { ISubjectData } from "./subject.type";

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
    isActive: boolean
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
export interface ICreateExamScheduleForm extends ICreateExamSchedule {
    semesterId: number;
}
export type TUpdateExamScheduleInfo = Omit<ICreateExamSchedule, "courseSectionId">;
export interface ICourseSectionHaveSchedule {
    id: number;
    sectionCode: string;
    subject: TSubjectOfCourseSectionHaveSchedule;
    lecturer: ILecturerOfCourseSectionHaveSchedule;
};
export type TSubjectOfCourseSectionHaveSchedule = Pick<ISubjectData, "name">;
export interface ILecturerOfCourseSectionHaveSchedule {
    user: {
        fullName: string
    }
};
export interface ISuggestExamSchedule {
    lastStudyDate: string;
    suggestedExamDate: string;
};
export interface IAvailableRoomOfExamSchedule {
    id: number;
    name: string;
    building: TBuildingOfAvailabelRoom;
};
export type TBuildingOfAvailabelRoom = Pick<IBuildingData, "id" | "name" | "symbol">;