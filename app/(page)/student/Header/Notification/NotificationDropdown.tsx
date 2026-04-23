"use client"
import { INotificationDataResponseProps } from '@/types/student/notification.type';
import { Bell } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import NotificationMessage from './NotificationMessage';
import { useState } from 'react';

export default function NotificationDropdown({ data, onSelectedId }: INotificationDataResponseProps) {
    const unreadCount = data?.countNotificationUnRead ?? 0;
    const [open, setOpen] = useState(false);
    return (
        <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
                <button className="relative p-2 rounded-xl hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-colors group">
                    <Bell
                        size={20}
                        className="text-gray-500 dark:text-gray-400 group-hover:text-[#ec5d15] transition-colors"
                    />
                    {unreadCount > 0 && (
                        <span className="absolute -top-0.5 -right-0.5 min-w-4.5 h-4.5 flex items-center justify-center
                                         bg-[#ec5d15] text-white text-[10px] font-bold rounded-full px-1 shadow-sm
                                         animate-pulse">
                            {unreadCount > 99 ? "99+" : unreadCount}
                        </span>
                    )}
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="end"
                className="w-80 p-0 rounded-2xl border border-orange-100 dark:border-gray-800 shadow-xl overflow-hidden"
            >
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
                    <div className="flex items-center gap-2">
                        <Bell size={14} className="text-[#ec5d15]" />
                        <span className="text-sm font-bold text-gray-800 dark:text-gray-100">
                            Thông báo
                        </span>
                    </div>
                    {unreadCount > 0 && (
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-orange-50 text-[#ec5d15] border border-orange-200">
                            {unreadCount} chưa đọc
                        </span>
                    )}
                </div>
                <div className="max-h-90 overflow-y-auto bg-white dark:bg-gray-900">
                    {!data?.notifications?.length ? (
                        <div className="flex flex-col items-center justify-center py-10 gap-2">
                            <Bell size={28} className="text-gray-200 dark:text-gray-700" />
                            <p className="text-xs text-gray-400 italic">Chưa có thông báo nào</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-50 dark:divide-gray-800">
                            {data.notifications.map((noti) => (
                                <NotificationMessage
                                    key={noti.notification.id}
                                    noti={noti}
                                    onSelect={() => {
                                        onSelectedId(noti.notification.id);
                                        setOpen(false);
                                    }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}