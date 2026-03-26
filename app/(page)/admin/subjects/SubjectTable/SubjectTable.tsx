"use client"
import { ISubjectData, ISubjectDataResponseProps } from "@/app/types/admin/subject.type";
import { Pencil, CirclePlus } from 'lucide-react';
import Pagination from '@/components/Pagination';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import MajorSearchBar from '@/app/(page)/admin/majors/MajorSearchBar/MajorSearchBar';
import { useState } from "react";
import SubjectCreateModal from "../SubjectModal/SubjectCreateModal";
import SubjectUpdateModal from "../SubjectModal/SubjectUpdateModal";
import AlertDialogBlockSubject from "../AlertDialogSubject/AlertDialogBlockSubject";
import AlertDialogUnBlockSubject from "../AlertDialogSubject/AlertDialogUnBlockSubject";

export default function SubjectTable({ data }: ISubjectDataResponseProps) {
    const [isModalCreate, setIsModalCreate] = useState(false);
    const [isModalUpdate, setIsModalUpdate] = useState(false);
    const [selectedSubject, setSelectedSubject] = useState<ISubjectData | null>(null);
    return (
        <div className="mt-5 p-5 border rounded-2xl bg-white ml-3 w-[98%]">
            <div className="flex items-center justify-between mb-5">
                <h1 className="text-2xl font-bold text-gray-500">Danh sách môn học</h1>
                <div className="flex items-center justify-center gap-3">
                    <MajorSearchBar />
                    <button onClick={() => setIsModalCreate(true)} className="border-none hover:bg-orange-400 cursor-pointer hover:text-white transition duration-500 p-2 rounded-full bg-orange-100 text-gray-400 text-sm"><CirclePlus /></button>
                </div>
            </div>
            <table className="w-full border-separate border border-gray-100 border-spacing-0 rounded-xl overflow-hidden ">
                <thead className="bg-orange-100 text-gray-500 uppercase text-sm tracking-wide">
                    <tr className="h-12.5 text-center font-medium rounded-tl-xl">
                        <th>Mã môn học</th>
                        <th>Môn học</th>
                        <th>Tín chỉ</th>
                        <th>Lý thuyết</th>
                        <th>Thực hành</th>
                        <th>GPA</th>
                        <th>Trạng thái</th>
                        <th className="text-center">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {data.subjects.map((sb) => (
                        <tr key={sb.id} className="h-12.5 text-center hover:bg-orange-50 transition-all duration-500">
                            <td>{sb.code}</td>
                            <td>{sb.name}</td>
                            <td>{sb.credits}</td>
                            <td>{sb.theoryPeriods}</td>
                            <td>{sb.practicePeriods}</td>
                            <td>{sb.countToGpa === true ? <span className='bg-purple-100 p-2 rounded-2xl text-purple-400'>Có tính GPA</span> : <span className='bg-yellow-100 p-2 rounded-2xl text-yellow-400'>Không tính GPA</span>}</td>
                            <td>{sb.isActive === true ? <span className='bg-green-100 p-2 rounded-2xl text-green-400'>Hoạt động</span> : <span className='bg-red-100 p-2 rounded-2xl text-red-400'>Tạm dừng</span>}</td>
                            <td className="text-center">
                                <span className='mr-2'>{sb.isActive === true ? <AlertDialogBlockSubject subjectId={sb.id} /> : <AlertDialogUnBlockSubject subjectId={sb.id} />}</span>
                                <button onClick={() => {
                                    setIsModalUpdate(true);
                                    setSelectedSubject(sb);
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
                    <SubjectCreateModal onClose={() => setIsModalCreate(false)} />
                </DialogContent>
            </Dialog>
            <Dialog open={isModalUpdate} onOpenChange={setIsModalUpdate}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Cập nhật thông tin chuyên ngành</DialogTitle>
                    </DialogHeader>
                    {isModalUpdate && selectedSubject && (
                        <SubjectUpdateModal
                            key={selectedSubject.id}
                            selectedSubject={selectedSubject}
                            onClose={() => {
                                setIsModalUpdate(false)
                                setSelectedSubject(null)
                            }}
                        />
                    )}
                </DialogContent>
            </Dialog>
        </div >
    )
}