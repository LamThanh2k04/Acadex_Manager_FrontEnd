import { IPagination } from "../pagination";
import { IMajorSimple } from "./lecturer.type";

export interface IClassesDataResponseProps {
    data: IClassesDataResponse;
}
export interface IClassesDataResponse {
    classes: IClassesData[];
    pagination: IPagination
}
export interface IClassesData {
    id: number;
    name: string;
    isActive: boolean;
    major: IMajorOfClasses;
    homeroomLecturer: IHomeRoomLecturer;
};
export interface IMajorOfClasses {
    id: number;
    name: string;
};
export interface IHomeRoomLecturer {
    id: number;
    user: IUserOfHomeRoomLecturer;
};
export interface IUserOfHomeRoomLecturer {
    fullName: string
};
export interface ICreateClasses {
    name: string;
    majorId: number;
    homeroomLecturerId: number;
};
export type MajorSimpleOfClasses = IMajorSimple;
export interface IHoomroomLecturerSimple {
    id: number;
    lecturerCode: string;
    user: IUserOfHomeRoomLecturer;
}
export interface IUpdateClassesInfo {
    name: string;
    majorId: number;
    homeroomLecturerId: number
}