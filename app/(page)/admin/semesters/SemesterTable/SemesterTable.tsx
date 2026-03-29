"use client"
import { ISemesterData, ISemesterDataResponseProps } from "@/app/types/admin/semester.type"
import { Pencil, CirclePlus } from 'lucide-react';
import Pagination from '@/components/Pagination';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useState } from "react";
import SemesterSearchBar from "../SemesterSearchBar/SemesterSearchBar";
import SemesterCreateModal from "../SemesterModal/SemesterCreateModal";
import SemesterUpdateModal from "../SemesterModal/SemesterUpdateModal";
import AlertDialogBlockSemester from "../AlertDialogSemester/AlertDialogBlockSemester";
import AlertDialogUnBlockSemester from "../AlertDialogSemester/AlertDialogUnBlockSemester";
export default function SemesterTable({ data }: ISemesterDataResponseProps) {
    const [isModalCreate, setIsModalCreate] = useState(false);
    const [isModalUpdate, setIsModalUpdate] = useState(false);
    const [selectedSemester, setSelectedSemester] = useState<ISemesterData | null>(null);
    return (
        <div className="mt-5 p-5 border rounded-2xl bg-white ml-3 w-[98%]">
            <div className="flex items-center justify-between mb-5">
                <div>
                    <h1 className="text-2xl font-bold text-gray-700">
                        Danh sách học kì
                    </h1>
                    <p className="mt-1 text-sm text-gray-400">
                        Quản lý học kì dành cho sinh viên.
                    </p>
                </div>
                <div className="flex items-center justify-center gap-3">
                    <SemesterSearchBar />
                    <button onClick={() => setIsModalCreate(true)} className="border-none hover:bg-orange-400 cursor-pointer hover:text-white transition duration-500 p-2 rounded-full bg-orange-100 text-gray-400 text-sm"><CirclePlus /></button>
                </div>
            </div>
            <table className="w-full border-separate border border-gray-100 border-spacing-0 rounded-xl overflow-hidden ">
                <thead className="bg-orange-100 text-gray-500 uppercase text-sm tracking-wide">
                    <tr className="h-12.5 text-center font-medium rounded-tl-xl">
                        <th>Học kì</th>
                        <th>Niên khóa</th>
                        <th>Học kì bắt đầu</th>
                        <th>Học kì kết thúc</th>
                        <th>Trạng thái</th>
                        <th className="text-center">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {data.semesters.map((se) => (
                        <tr key={se.id} className="h-12.5 text-center hover:bg-orange-50 transition-all duration-500">
                            <td>{se.name}</td>
                            <td>{se.academicYear}</td>
                            <td>{new Date(se.startDate).toLocaleDateString("vi-VN")}</td>
                            <td>{new Date(se.endDate).toLocaleDateString("vi-VN")}</td>
                            <td>{se.isActive === true ? <span className='bg-green-100 p-2 rounded-2xl text-green-400'>Hoạt động</span> : <span className='bg-red-100 p-2 rounded-2xl text-red-400'>Tạm dừng</span>}</td>
                            <td className="text-center">
                                <span className='mr-2'>{se.isActive === true ? <AlertDialogBlockSemester semesterId={se.id} /> : <AlertDialogUnBlockSemester semesterId={se.id} />}</span>
                                <button onClick={() => {
                                    setIsModalUpdate(true);
                                    setSelectedSemester(se);
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
                    <SemesterCreateModal onClose={() => setIsModalCreate(false)} />
                </DialogContent>
            </Dialog>
            <Dialog open={isModalUpdate} onOpenChange={setIsModalUpdate}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Cập nhật thông tin học kì</DialogTitle>
                    </DialogHeader>
                    {isModalUpdate && selectedSemester && (
                        <SemesterUpdateModal
                            key={selectedSemester.id}
                            selectedSemester={selectedSemester}
                            onClose={() => {
                                setIsModalUpdate(false)
                                setSelectedSemester(null)
                            }}
                        />
                    )}
                </DialogContent>
            </Dialog>
        </div >
    )
}