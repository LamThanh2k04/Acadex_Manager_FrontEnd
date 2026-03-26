"use client"
import { INotificationData, INotificationDataResponseProps } from "@/app/types/admin/notification.type";
import { Pencil, BellPlus, CircleX } from 'lucide-react';
import Pagination from '@/components/Pagination';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import NotificationSearchBar from "../NotificationSearchBar/NotificationSearchBar";
import { useState } from "react";
import NotificationCreateModal from "../NotificationModal/NotificationCreateModal";
import NotificationUpdateModal from "../NotificationModal/NotificationUpdateModal";
import AlertDialogDeleteNotification from "../AlertDialogNotification/AlertDialogDeleteNotification";

export default function NotificationTable({ data }: INotificationDataResponseProps) {
    const [isModalCreate, setIsModalCreate] = useState(false);
    const [isModalUpdate, setIsModalUpdate] = useState(false);
    const [selectedNotification, setSelectedNotification] = useState<INotificationData | null>(null);
    const typeRender = {
        "PERSONAL": <span className="bg-green-100 py-2 px-5 rounded-2xl text-green-400">Cá nhân</span>,
        "BROADCAST": <span className="bg-orange-100 p-2 rounded-2xl text-orange-400">Theo nhóm</span>,
    };
    const targetRoleRender = {
        "STUDENT": <span className="bg-purple-100 p-2 rounded-2xl text-purple-400">Sinh viên</span>,
        "LECTURER": <span className="bg-yellow-100 p-2 rounded-2xl text-orange-400">Giảng viên</span>,
    };
    return (
        <div className="mt-5 p-5 border rounded-2xl bg-white ml-3 w-[98%]">
            <div className="flex items-center justify-between mb-5">
                <h1 className="text-2xl font-bold text-gray-500">Danh sách thông báo</h1>
                <div className="flex items-center justify-center gap-3">
                    <NotificationSearchBar />
                    <button onClick={() => setIsModalCreate(true)} className="border-none hover:bg-orange-400 cursor-pointer hover:text-white transition duration-500 p-2 rounded-full bg-orange-100 text-gray-400 text-sm"><BellPlus /></button>
                </div>
            </div>
            <table className="w-full border-separate border border-gray-100 border-spacing-0 rounded-xl overflow-hidden ">
                <thead className="bg-orange-100 text-gray-500 uppercase text-sm tracking-wide">
                    <tr className="h-12.5 text-center font-medium rounded-tl-xl">
                        <th>Tiêu đề</th>
                        <th>Thông báo</th>
                        <th>Loại thông báo</th>
                        <th>Người nhận</th>
                        <th className="text-center">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {data.notifications.map((noti) => (
                        <tr key={noti.id} className="h-12.5 text-center hover:bg-orange-50 transition-all duration-500">
                            <td>{noti.title}</td>
                            <td>{noti.message}</td>
                            <td>{typeRender[noti.type] ?? <span className="bg-gray-500">{noti.type}</span>}</td>
                            <td>{targetRoleRender[noti.targetRole] ?? <span className="bg-gray-500">{noti.targetRole}</span>}</td>
                            <td className="text-center">
                                <button onClick={() => {
                                    setIsModalUpdate(true);
                                    setSelectedNotification(noti);
                                }}><Pencil className="text-gray-300 hover:text-blue-400 cursor-pointer duration-300 transition-all" /></button>
                                <span className="ml-2"><AlertDialogDeleteNotification notificationId={noti.id} /></span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination pagination={data.pagination} />
            <Dialog open={isModalCreate} onOpenChange={setIsModalCreate}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Thông tin chung</DialogTitle>
                    </DialogHeader>
                    <NotificationCreateModal onClose={() => setIsModalCreate(false)} />
                </DialogContent>
            </Dialog>
            <Dialog open={isModalUpdate} onOpenChange={setIsModalUpdate}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Cập nhật thông tin thông báo</DialogTitle>
                    </DialogHeader>
                    {isModalUpdate && selectedNotification && (
                        <NotificationUpdateModal
                            key={selectedNotification.id}
                            selectedNotification={selectedNotification}
                            onClose={() => {
                                setIsModalUpdate(false)
                                setSelectedNotification(null)
                            }}
                        />
                    )}
                </DialogContent>
            </Dialog>
        </div >
    )
}