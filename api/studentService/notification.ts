import { https } from "../config"
import { INotificationDataResponse } from '@/app/types/student/notification.type';

export const getAllNotifications = async (): Promise<INotificationDataResponse> => {
    const res = await https.get("/api/student/notification/getAllNotifications");
    return res.data.data;
};
export const getInfoNotification = async (notificationId: number) => {
    const res = await https.get(`/api/student/notification/getInfoNotification/${notificationId}`);
    return res.data.data;
}