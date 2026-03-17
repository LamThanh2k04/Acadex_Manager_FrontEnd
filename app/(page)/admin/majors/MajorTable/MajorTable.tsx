"use client"
import { IMajorDataProps } from "@/app/types/admin/major.type";
import { Pencil, CirclePlus } from 'lucide-react';
import Pagination from '@/components/Pagination';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import FacultyCreateModal from '@/app/(page)/admin/faculties/FacultyModal/FacultyCreateModal';
import FacultyUpdateModal from '@/app/(page)/admin/faculties/FacultyModal/FacultyUpdateModal';
import AlertDialogBlockFaculty from '@/app/(page)/admin/faculties/AlertDialogFaculty/AlertDialogBlockFaculty';
import AlertDialogUnBlockFaculty from '@/app/(page)/admin/faculties/AlertDialogFaculty/AlertDialogUnBlockFaculty';
import MajorSearchBar from "../MajorSearchBar/MajorSearchBar";
import { useState } from "react";
import MajorCreateModal from "../MajorModal/MajorCreateModal";

export default function MajorTable({ data }: IMajorDataProps) {
    const [isModalCreate, setIsModalCreate] = useState(false);
    return (
        <div className="mt-5 p-5 border rounded-2xl bg-white ml-3 w-[98%]">
            <div className="flex items-center justify-between mb-5">
                <h1 className="text-2xl font-bold text-gray-500">Danh sách ngành đào tạo</h1>
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
                        <th>Trạng thái</th>
                        <th className="text-center">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {data.majors.map((ma) => (
                        <tr key={ma.id} className="h-12.5 text-center hover:bg-orange-50 transition-all duration-500">
                            <td>{ma.code}</td>
                            <td>{ma.name}</td>
                            <td>{ma.isActive === true ? <span className='bg-green-400 p-2 rounded-2xl text-green-50'>Hoạt động</span> : <span className='bg-red-400 p-2 rounded-2xl text-red-50'>Tạm dừng</span>}</td>

                            <td className="text-center">
                                {/* <span className='mr-2'>{ma.isActive === true ? <AlertDialogBlockFaculty facultyId={fa.id} /> : <AlertDialogUnBlockFaculty facultyId={fa.id} />}</span> */}
                                <button onClick={() => {
                                    // setIsModalUpdate(true);
                                    // setSelectedFaculty(fa);
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
            {/* <Dialog open={isModalUpdate} onOpenChange={setIsModalUpdate}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Cập nhật thông tin sinh viên</DialogTitle>
                    </DialogHeader>
                    {isModalUpdate && selectedFaculty && (
                        <FacultyUpdateModal
                            key={selectedFaculty.id}
                            selectedFaculty={selectedFaculty}
                            onClose={() => {
                                setIsModalUpdate(false)
                                setSelectedFaculty(null)
                            }}
                        />
                    )}
                </DialogContent>
        </Dialog> */}
        </div >
    )
}