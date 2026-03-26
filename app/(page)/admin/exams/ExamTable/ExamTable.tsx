import { IExamScheduleData, IExamScheduleDataResponseProps } from "@/app/types/admin/exam.type";
import { Pencil, CalendarPlus } from 'lucide-react';
import Pagination from '@/components/Pagination';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { minutestoHour } from '@/app/utils/schedule';
import ExamSearchBar from "../ExamSearchBar/ExamSearchBar";
import { useState } from "react";
import ExamCreateModal from "../ExamModal/ExamCreateModal";
import ExamUpdateModal from "../ExamModal/ExamUpdateModal";
import AlertDialogBlockExam from "../AlertDialogExam/AlertDialoBlockExam";
import AlertDialogUnBlockExam from "../AlertDialogExam/AlertDialogUnBlockExam";

export default function ExamTable({ data }: IExamScheduleDataResponseProps) {
    const [isModalCreate, setIsModalCreate] = useState(false);
    const [isModalUpdate, setIsModalUpdate] = useState(false);
    const [selectedExamSchedule, setSelectedExamSchedule] = useState<IExamScheduleData | null>(null);
    return (
        <div className="mt-5 p-5 border rounded-2xl bg-white ml-3 w-[98%]">
            <div className="flex items-center justify-between mb-5">
                <h1 className="text-2xl font-bold text-gray-500">Danh sách lịch thi</h1>
                <div className="flex items-center justify-center gap-3">
                    <ExamSearchBar />
                    <button onClick={() => setIsModalCreate(true)} className="border-none hover:bg-orange-400 cursor-pointer hover:text-white transition duration-500 p-2 rounded-full bg-orange-100 text-gray-400 text-sm"><CalendarPlus /></button>
                </div>
            </div>
            <table className="w-full border-separate border border-gray-100 border-spacing-0 rounded-xl overflow-hidden ">
                <thead className="bg-orange-100 text-gray-500 uppercase text-sm tracking-wide">
                    <tr className="h-12.5 text-center font-medium rounded-tl-xl">
                        <th>Mã học phần</th>
                        <th>Môn học</th>
                        <th>Ngày thi</th>
                        <th>Thời gian thi</th>
                        <th>Phòng học</th>
                        <th>Cơ sở</th>
                        <th>Trạng thái</th>
                        <th className="text-center">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {data.examSchedules.map((exam) => (
                        <tr key={exam.id} className="h-12.5 text-center hover:bg-orange-50 transition-all duration-500">
                            <td>{exam.courseSection.sectionCode}</td>
                            <td>{exam.courseSection.subject.name}</td>
                            <td>{new Date(exam.examDate).toLocaleDateString("vi-VN")}</td>
                            <td>({minutestoHour(exam.startMinute)} - {minutestoHour(exam.endMinute)})</td>
                            <td>{exam.room.name}</td>
                            <td>{exam.room.building.symbol}</td>
                            <td>{exam.isActive === true ? <span className='bg-green-100 p-2 rounded-2xl text-green-400'>Hoạt động</span> : <span className='bg-red-100 p-2 rounded-2xl text-red-400'>Tạm dừng</span>}</td>
                            <td className="text-center">
                                <span className='mr-2'>{exam.isActive === true ? <AlertDialogBlockExam examScheduleId={exam.id} /> : <AlertDialogUnBlockExam examScheduleId={exam.id} />}</span>
                                <button onClick={() => {
                                    setIsModalUpdate(true);
                                    setSelectedExamSchedule(exam);
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
                    <ExamCreateModal onClose={() => setIsModalCreate(false)} />
                </DialogContent>
            </Dialog>
            <Dialog open={isModalUpdate} onOpenChange={setIsModalUpdate}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Cập nhật thông tin lịch thi</DialogTitle>
                    </DialogHeader>
                    {isModalUpdate && selectedExamSchedule && (
                        <ExamUpdateModal
                            key={selectedExamSchedule.id}
                            selectedExamSchedule={selectedExamSchedule}
                            onClose={() => {
                                setIsModalUpdate(false)
                                setSelectedExamSchedule(null)
                            }}
                        />
                    )}
                </DialogContent>
            </Dialog>
        </div >
    )
}