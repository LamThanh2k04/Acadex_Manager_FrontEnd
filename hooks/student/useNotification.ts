import { getAllNotifications, getInfoNotification } from "@/api/studentService/notification"
import { INotificationDataResponse } from '@/types/student/notification.type';
import { useAppSelector } from "@/lib/hook";
import { disconnectSocket, getSocket } from "@/lib/socket";
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react";
import toast from "react-hot-toast";

export const useGetAllNotification = () => {
    const queryClient = useQueryClient();
    const user = useAppSelector((state) => state.user.userInfo);
    const userId = user?.id;
    const query = useQuery<INotificationDataResponse>({
        queryKey: ['get-all-notification'],
        queryFn: getAllNotifications,
    });
    useEffect(() => {
        const socket = getSocket(userId);
        socket.connect();
        socket.on("notification:new", () => {
            queryClient.invalidateQueries({ queryKey: ['get-all-notification'] });
            toast("Bạn có thông báo mới", { icon: "🔔" });
        })
        return () => {
            socket.off("notification:new");
            disconnectSocket();
        };

    }, [userId, queryClient]);
    return query;
};
export const useGetNotificationInfo = (notificationId: number) => {
    return useQuery({
        queryKey: ['get-notification-info', notificationId],
        queryFn: () => getInfoNotification(notificationId),
        enabled: !!notificationId,
    })
}