"use client"
import { INotificationDataResponse, INotificationDataResponseProps } from '@/app/types/student/notification.type';
import { Bell } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import NotificationMessage from './NotificationMessage';
export default function NotificationDropdown({ data, onSelectedId }: INotificationDataResponseProps) {
    console.log(data);
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button><Bell /></button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {data?.notifications.map((noti) => (
                    <NotificationMessage
                        key={noti.notification.id}
                        noti={noti}
                        onSelect={() => onSelectedId(noti.notification.id)}
                    />
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}