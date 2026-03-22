import { IExamScheduleDataResponseProps } from "@/app/types/admin/exam.type";
import { Pencil, CirclePlus } from 'lucide-react';
import Pagination from '@/components/Pagination';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { minutestoHour } from '@/app/utils/schedule';
import ExamSearchBar from "../ExamSearchBar/ExamSearchBar";

export default function ExamTable({ data }: IExamScheduleDataResponseProps) {
    return (
        <div className="mt-5 p-5 border rounded-2xl bg-white ml-3 w-[98%]">
            <div className="flex items-center justify-between mb-5">
                <h1 className="text-2xl font-bold text-gray-500">Danh sách lịch thi</h1>
                <div className="flex items-center justify-center gap-3">
                    <ExamSearchBar />
                    <button className="border-none hover:bg-orange-400 cursor-pointer hover:text-white transition duration-500 p-2 rounded-full bg-orange-100 text-gray-400 text-sm"><CirclePlus /></button>
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
                            <td className="text-center">
                                {/* <span className='mr-2'>{sche.isActive === true ? <AlertDialogBlockSubject subjectId={sb.id} /> : <AlertDialogUnBlockSubject subjectId={sb.id} />}</span> */}
                                <button onClick={() => {
                                    // setIsModalUpdate(true);
                                    // setSelectedSchedule(sche);
                                }}><Pencil className="text-gray-300 hover:text-blue-400 cursor-pointer duration-300 transition-all" /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination pagination={data.pagination} />
            {/* <Dialog open={isModalCreate} onOpenChange={setIsModalCreate}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Thông tin chung</DialogTitle>
                    </DialogHeader>
                    <ScheduleCreateModal onClose={() => setIsModalCreate(false)} />
                </DialogContent>
            </Dialog> */}
            {/* <Dialog open={isModalUpdate} onOpenChange={setIsModalUpdate}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Cập nhật thông tin chuyên ngành</DialogTitle>
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
            </Dialog> */}
        </div >
    )
}