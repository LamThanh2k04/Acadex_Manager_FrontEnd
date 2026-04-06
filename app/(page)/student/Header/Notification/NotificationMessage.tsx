import { INotificationData } from '@/app/types/student/notification.type';
export default function NotificationMessage({ noti, onSelect }: { noti: INotificationData, onSelect: () => void }) {
    return (
        <div
            onClick={onSelect}
            className={`flex items-start gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all
                ${noti.isRead
                    ? "hover:bg-gray-50 dark:hover:bg-gray-800"
                    : "bg-orange-50 dark:bg-orange-900/10 hover:bg-orange-100"
                }`}
        >
            <div className="shrink-0 mt-1.5">
                {!noti.isRead && (
                    <span className="w-2 h-2 rounded-full bg-[#ec5d15] block" />
                )}
                {noti.isRead && (
                    <span className="w-2 h-2 rounded-full bg-transparent block" />
                )}
            </div>
            <div className="flex-1 min-w-0">
                <p className={`text-xs truncate ${noti.isRead ? "font-medium text-gray-600" : "font-bold text-gray-800 dark:text-gray-100"}`}>
                    {noti.notification.title}
                </p>
                <p className="text-[11px] text-gray-400 line-clamp-2 mt-0.5">
                    {noti.notification.message}
                </p>
                {noti.readAt && (
                    <p className="text-[10px] text-gray-300 mt-1">
                        {new Date(noti.readAt).toLocaleDateString("vi-VN")}
                    </p>
                )}
            </div>
        </div>
    );
}