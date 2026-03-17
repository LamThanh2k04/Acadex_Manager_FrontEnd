"use client"

import { IClassesData, IClassesDataResponseProps } from "@/app/types/admin/classes.type"
import { Pencil, CirclePlus } from 'lucide-react';
import Pagination from '@/components/Pagination';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import ClassesSearchBar from "../ClassesSearchBar/ClassesSearchBar";
import { useState } from "react";
import ClassesCreateModal from "../ClassesModal/ClassesCreateModal";
import ClassesUpdateModal from "../ClassesModal/ClassesUpdateModal";
import AlertDialogBlockClasses from "../AlertDialogClasses/AlertDialogBlockClasses";
import AlertDialogUnBlockClasses from "../AlertDialogClasses/AlertDialogUnBlockClasses";

export default function ClassesTable({ data }: IClassesDataResponseProps) {
    const [isModalCreate, setIsModalCreate] = useState(false);
    const [isModalUpdate, setIsModalUpdate] = useState(false);
    const [selectedClasses, setSelectedClasses] = useState<IClassesData | null>(null);
    return (
        <div className="mt-5 p-5 border rounded-2xl bg-white ml-3 w-[98%]">
            <div className="flex items-center justify-between mb-5">
                <h1 className="text-2xl font-bold text-gray-500">Danh sách lớp</h1>
                <div className="flex items-center justify-center gap-3">
                    <ClassesSearchBar />
                    <button onClick={() => setIsModalCreate(true)} className="border-none hover:bg-orange-400 cursor-pointer hover:text-white transition duration-500 p-2 rounded-full bg-orange-100 text-gray-400 text-sm"><CirclePlus /></button>
                </div>
            </div>
            <table className="w-full border-separate border border-gray-100 border-spacing-0 rounded-xl overflow-hidden ">
                <thead className="bg-orange-100 text-gray-500 uppercase text-sm tracking-wide">
                    <tr className="h-12.5 text-center font-medium rounded-tl-xl">
                        <th>Tên lớp</th>
                        <th>Lớp thuộc ngành</th>
                        <th>Giảng viên đảm nhận</th>
                        <th>Trạng thái</th>
                        <th className="text-center">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {data.classes.map((cl) => (
                        <tr key={cl.id} className="h-12.5 text-center hover:bg-orange-50 transition-all duration-500">
                            <td>{cl.name}</td>
                            <td>{cl.major.name}</td>
                            <td>{cl.homeroomLecturer?.user?.fullName ?? "Chưa có giảng viên đảm nhận"}</td>
                            <td>{cl.isActive === true ? <span className='bg-green-400 p-2 rounded-2xl text-green-50'>Hoạt động</span> : <span className='bg-red-400 p-2 rounded-2xl text-red-50'>Tạm dừng</span>}</td>
                            <td className="text-center">
                                <span className='mr-2'>{cl.isActive === true ? <AlertDialogBlockClasses classesId={cl.id} /> : <AlertDialogUnBlockClasses classesId={cl.id} />}</span>
                                <button onClick={() => {
                                    setIsModalUpdate(true);
                                    setSelectedClasses(cl);
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
                    <ClassesCreateModal onClose={() => setIsModalCreate(false)} />
                </DialogContent>
            </Dialog>
            <Dialog open={isModalUpdate} onOpenChange={setIsModalUpdate}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Cập nhật thông tin lớp học</DialogTitle>
                    </DialogHeader>
                    {isModalUpdate && selectedClasses && (
                        <ClassesUpdateModal
                            key={selectedClasses.id}
                            selectedClasses={selectedClasses}
                            onClose={() => {
                                setIsModalUpdate(false)
                                setSelectedClasses(null)
                            }}
                        />
                    )}
                </DialogContent>
            </Dialog>
        </div >
    )
}