// NotificationDetail.tsx
"use client"
import { TTypeNotification } from "@/app/types/admin/notification.type";
import { useGetNotificationInfo } from "@/hooks/student/useNotification";
import { useQueryClient } from "@tanstack/react-query";
import { X, Bell, Clock, CheckCircle2 } from "lucide-react";
import { useEffect } from "react";

const TYPE_CONFIG = {
    BROADCAST: { label: "Thông báo chung", className: "bg-blue-50 text-blue-600 border border-blue-200" },
    PERSONAL: { label: "Cá nhân", className: "bg-orange-50 text-[#ec5d15] border border-orange-200" },
};
export default function NotificationDetail({ notificationId, onClose, }: { notificationId: number; onClose: () => void; }) {
    const { data, isLoading } = useGetNotificationInfo(notificationId);
    console.log(data);
    const target = data?.target;
    const queryClient = useQueryClient();
    useEffect(() => {
        if (data) {
            queryClient.invalidateQueries({ queryKey: ['get-all-notification'] });
        }
    }, [data]);
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4"
            onClick={onClose}
        >
            <div
                className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-800">
                    <div className="flex items-center gap-2">
                        <Bell size={15} className="text-[#ec5d15]" />
                        <span className="text-sm font-bold text-gray-800 dark:text-gray-100">
                            Chi tiết thông báo
                        </span>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                    >
                        <X size={16} />
                    </button>
                </div>
                {isLoading ? (
                    <div className="flex items-center justify-center py-12">
                        <div className="w-6 h-6 border-2 border-[#ec5d15] border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : target ? (
                    <div className="px-5 py-4 space-y-4">
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                            <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${TYPE_CONFIG[target.notification.type as TTypeNotification]?.className}`}>
                                {TYPE_CONFIG[target.notification.type as TTypeNotification]?.label}
                            </span>
                            <div className="flex items-center gap-1.5 text-[11px] text-gray-400">
                                <CheckCircle2 size={12} className="text-emerald-500" />
                                Đã đọc
                            </div>
                        </div>
                        <h2 className="text-base font-bold text-gray-800 dark:text-gray-100 leading-snug">
                            {target.notification.title}
                        </h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line">
                            {target.notification.message}
                        </p>
                        {target.readAt && (
                            <div className="flex items-center gap-1.5 text-[11px] text-gray-400 pt-2 border-t border-gray-100 dark:border-gray-800">
                                <Clock size={11} />
                                Đã đọc lúc {new Date(target.readAt).toLocaleString("vi-VN")}
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-12 gap-2">
                        <Bell size={24} className="text-gray-200" />
                        <p className="text-xs text-gray-400 italic">Không tìm thấy thông báo</p>
                    </div>
                )}
                <div className="px-5 py-3 border-t border-gray-100 dark:border-gray-800 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-xs font-bold text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors cursor-pointer"
                    >
                        Đóng
                    </button>
                </div>
            </div>
        </div>
    );
}