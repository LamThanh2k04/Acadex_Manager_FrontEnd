"use client"
import { IMajorData, IMajorDataProps } from "@/app/types/admin/major.type";
import { Pencil, CirclePlus } from 'lucide-react';
import Pagination from '@/components/Pagination';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import MajorSearchBar from "../MajorSearchBar/MajorSearchBar";
import { useState } from "react";
import MajorCreateModal from "../MajorModal/MajorCreateModal";
import MajorUpdateModal from "../MajorModal/MajorUpdateModal";
import AlertDialogBlockMajor from "../AlertDialogMajor/AlertDialogBlockMajor";
import AlertDialogUnBlockMajor from "../AlertDialogMajor/AlertDialogUnBlockMajor";
export default function MajorTable({ data }: IMajorDataProps) {
    const [isModalCreate, setIsModalCreate] = useState(false);
    const [isModalUpdate, setIsModalUpdate] = useState(false);
    const [selectedMajor, setSelectedMajor] = useState<IMajorData | null>(null);
    return (
        <div className="mt-5 p-5 border rounded-2xl bg-white ml-3 w-[98%]">
            <div className="flex items-center justify-between mb-5">
                <div>
                    <h1 className="text-2xl font-bold text-gray-700">
                        Danh sách ngành đào tạo
                    </h1>
                    <p className="mt-1 text-sm text-gray-400">
                        Quản lý ngành đào tạo dành cho sinh viên.
                    </p>
                </div>
                <div className="flex items-center justify-center gap-3">
                    <MajorSearchBar />
                    <button onClick={() => setIsModalCreate(true)} className="border-none hover:bg-orange-400 cursor-pointer hover:text-white transition duration-500 p-2 rounded-full bg-orange-100 text-gray-400 text-sm"><CirclePlus /></button>
                </div>
            </div>
            <table className="w-full border-separate border border-gray-100 border-spacing-0 rounded-xl overflow-hidden ">
                <thead className="bg-orange-100 text-gray-500 uppercase text-sm tracking-wide">
                    <tr className="h-12.5 text-center font-medium rounded-tl-xl">
                        <th>Mã ngành</th>
                        <th>Ngành</th>
                        <th>Ngành thuộc khoa</th>
                        <th>Trạng thái</th>
                        <th className="text-center">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {data.majors.map((ma) => (
                        <tr key={ma.id} className="h-12.5 text-center hover:bg-orange-50 transition-all duration-500">
                            <td>{ma.code}</td>
                            <td>{ma.name}</td>
                            <td>{ma.faculty.name}</td>
                            <td>{ma.isActive === true ? <span className='bg-green-100 p-2 rounded-2xl text-green-400'>Hoạt động</span> : <span className='bg-red-100 p-2 rounded-2xl text-red-400'>Tạm dừng</span>}</td>
                            <td className="text-center">
                                <span className='mr-2'>{ma.isActive === true ? <AlertDialogBlockMajor majorId={ma.id} /> : <AlertDialogUnBlockMajor majorId={ma.id} />}</span>
                                <button onClick={() => {
                                    setIsModalUpdate(true);
                                    setSelectedMajor(ma);
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
                    <MajorCreateModal onClose={() => setIsModalCreate(false)} />
                </DialogContent>
            </Dialog>
            <Dialog open={isModalUpdate} onOpenChange={setIsModalUpdate}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Cập nhật thông tin chuyên ngành</DialogTitle>
                    </DialogHeader>
                    {isModalUpdate && selectedMajor && (
                        <MajorUpdateModal
                            key={selectedMajor.id}
                            selectedMajor={selectedMajor}
                            onClose={() => {
                                setIsModalUpdate(false)
                                setSelectedMajor(null)
                            }}
                        />
                    )}
                </DialogContent>
            </Dialog>
        </div >
    )
}