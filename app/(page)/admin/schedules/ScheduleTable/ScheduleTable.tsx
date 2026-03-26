import { IScheduleData, IScheduleDataResponseProps } from "@/app/types/admin/schedule.type";
import { Pencil, CalendarPlus } from 'lucide-react';
import Pagination from '@/components/Pagination';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { dayOfWeekToString, minutestoHour } from "@/app/utils/schedule";
import ScheduleSearchBar from "../ScheduleSearchBar/ScheduleSearchBar";
import { useState } from "react";
import ScheduleCreateModal from "../ScheduleModal/ScheduleCreateModal";
import ScheduleUpdateModal from "../ScheduleModal/ScheduleUpdateModal";
import AlertDialogBlockSchedule from "../AlertDialogSchedule/AlertDialogBlockSchedule";
import AlertDialogUnBlockSchedule from "../AlertDialogSchedule/AlertDialogUnBlockSchedule";

export default function ScheduleTable({ data }: IScheduleDataResponseProps) {
    console.log(data);
    const [isModalCreate, setIsModalCreate] = useState(false);
    const [isModalUpdate, setIsModalUpdate] = useState(false);
    const [selectedSchedule, setSelectedSchedule] = useState<IScheduleData | null>(null);
    const typeRender = {
        "THEORY": <span className="bg-blue-100 py-2 px-3 rounded-2xl text-blue-300">Lý thuyết</span>,
        "PRACTICE": <span className="bg-orange-100 p-2 rounded-2xl text-orange-300">Thực hành</span>,
        "ONLINE": <span className="bg-green-100 p-2 rounded-2xl text-green-300">Trực tuyến</span>
    }
    return (
        <div className="mt-5 p-5 border rounded-2xl bg-white ml-3 w-[98%]">
            <div className="flex items-center justify-between mb-5">
                <h1 className="text-2xl font-bold text-gray-500">Danh sách lịch học</h1>
                <div className="flex items-center justify-center gap-3">
                    <ScheduleSearchBar />
                    <button onClick={() => setIsModalCreate(true)} className="border-none hover:bg-orange-400 cursor-pointer hover:text-white transition duration-500 p-2 rounded-full bg-orange-100 text-gray-400 text-sm"><CalendarPlus /></button>
                </div>
            </div>
            <table className="w-full border-separate border border-gray-100 border-spacing-0 rounded-xl overflow-hidden ">
                <thead className="bg-orange-100 text-gray-500 uppercase text-sm tracking-wide">
                    <tr className="h-12.5 text-center font-medium rounded-tl-xl">
                        <th>Loại</th>
                        <th>Thời gian</th>
                        <th>Môn học</th>
                        <th>Ngày áp dụng</th>
                        <th>Phòng học</th>
                        <th>Sỉ số</th>
                        <th>Trạng thái</th>
                        <th className="text-center">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {data.schedules.map((sche) => (
                        <tr key={sche.id} className="h-12.5 text-center hover:bg-orange-50 transition-all duration-500">
                            <td>{typeRender[sche.type] ?? <span className="bg-gray-500">{sche.type}</span>}</td>
                            <td>{dayOfWeekToString(sche.dayOfWeek)} ({minutestoHour(sche.startTimeMinutes)} - {minutestoHour(sche.endTimeMinutes)})</td>
                            <td>{sche.courseSection.subject.name}</td>
                            <td>{new Date(sche.startDate).toLocaleDateString("vi-VN")} - {new Date(sche.endDate).toLocaleDateString("vi-VN")}</td>
                            <td>{sche.room.name}</td>
                            <td>{sche.maxStudents}</td>
                            <td>{sche.isActive === true ? <span className='bg-green-100 p-2 rounded-2xl text-green-400'>Hoạt động</span> : <span className='bg-red-100 p-2 rounded-2xl text-red-400'>Tạm dừng</span>}</td>
                            <td className="text-center">
                                <span className='mr-2'>{sche.isActive === true ? <AlertDialogBlockSchedule scheduleId={sche.id} /> : <AlertDialogUnBlockSchedule scheduleId={sche.id} />}</span>
                                <button onClick={() => {
                                    setIsModalUpdate(true);
                                    setSelectedSchedule(sche);
                                }}><Pencil className="text-gray-300 hover:text-blue-400 cursor-pointer duration-300 transition-all" /></button>
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
                    <ScheduleCreateModal onClose={() => setIsModalCreate(false)} />
                </DialogContent>
            </Dialog>
            <Dialog open={isModalUpdate} onOpenChange={setIsModalUpdate}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Cập nhật thông tin lịch học</DialogTitle>
                    </DialogHeader>
                    {isModalUpdate && selectedSchedule && (
                        <ScheduleUpdateModal
                            key={selectedSchedule.id}
                            selectedSchedule={selectedSchedule}
                            onClose={() => {
                                setIsModalUpdate(false)
                                setSelectedSchedule(null)
                            }}
                        />
                    )}
                </DialogContent>
            </Dialog>
        </div >
    )
}