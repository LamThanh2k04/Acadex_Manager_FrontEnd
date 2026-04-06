export type TNotificationType = "BROADCAST" | "PERSONAL";
export type TTargetRole = "STUDENT" | "LECTURER" | "ADMIN";
export interface INotificationDataResponseProps {
    data?: INotificationDataResponse;
    onSelectedId: (notificationId: number) => void
};
export interface INotificationDataResponse {
    notifications: INotificationData[];
    countNotificationUnRead: number;
}
export interface INotificationData {
    isRead: boolean,
    readAt: string | null;
    notification: INotification;
}
export interface INotification {
    id: number;
    title: string;
    message: string;
    type: TNotificationType;
    targetRole: TTargetRole;
};
export interface INotificationInfoData {
    target: ITargetNotification;
};
export interface ITargetNotification {
    id: number;
    isRead: boolean;
    readAt: string;
    notification: INotification;
};
