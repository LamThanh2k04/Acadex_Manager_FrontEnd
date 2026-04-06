"use client"
import { useState } from "react"
import NotificationDropdown from "./NotificationDropdown";
import { useGetAllNotification } from "@/hooks/student/useNotification";
import NotificationDetail from "./NotificationDetail";
export default function Notification() {
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const { data: allNotificationData } = useGetAllNotification();
    return (
        <div>
            <NotificationDropdown
                data={allNotificationData}
                onSelectedId={setSelectedId}
            />
            {selectedId && (
                <NotificationDetail
                    notificationId={selectedId}
                    onClose={() => setSelectedId(null)}

                />
            )}
        </div>
    )
}