import { getAllNotifications, getInfoNotification } from "@/app/api/studentService/notification"
import { INotificationData, INotificationDataResponse } from "@/app/types/student/notification.type";
import { disconnectSocket, getSocket } from "@/lib/socket";
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react";
import toast from "react-hot-toast";

export const useGetAllNotification = () => {
    const queryClient = useQueryClient();
    const query = useQuery({
        queryKey: ['get-all-notification'],
        queryFn: getAllNotifications,
    });
    useEffect(() => {
        const socket = getSocket();
        socket.connect();
        socket.on("new-notification", (newNotification: INotificationData) => {
            queryClient.invalidateQueries({ queryKey: ['get-all-notification'] });
            toast(newNotification.notification.title, { icon: "🔔" });
        })
        return () => {
            socket.off("new-notification");
            disconnectSocket();
        };

    }, [queryClient]);
    return query;
};
export const useGetNotificationInfo = (notificationId: number) => {
    return useQuery({
        queryKey: ['get-notification-info', notificationId],
        queryFn: () => getInfoNotification(notificationId),
        enabled: !!notificationId,
    })
}