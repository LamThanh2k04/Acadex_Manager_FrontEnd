import { IPagination } from "../pagination";

export interface INotificationDataResponseProps {
    data: INotificationDataResponse;
};
export interface INotificationDataResponse {
    notifications: INotificationData[];
    pagination: IPagination;
}
export interface INotificationData {
    id: number;
    title: string;
    message: string;
    type: TTypeNotification;
    targetRole: TTargetRoleNotification;
    senderId: number
};
export type TTypeNotification = "PERSONAL" | "BROADCAST";
export type TTargetRoleNotification = "STUDENT" | "LECTURER";
export interface ICreateNotification {
    title: string;
    message: string;
    userIds?: number[];
};
export type TRecipientMode = "all" | "selected";
export type TUpdateNotification = Omit<ICreateNotification, "userId">;
export interface IGetStudentBySearch {
    id: number;
    fullName: string;
    student: {
        studentCode: string;
    };
}