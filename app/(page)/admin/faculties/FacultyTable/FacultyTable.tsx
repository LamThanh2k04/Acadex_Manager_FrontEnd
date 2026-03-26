import { IFaculty, IFacultyProps } from "@/app/types/admin/faculty.type";
import { Pencil, CirclePlus } from 'lucide-react';
import Pagination from '@/components/Pagination';
import FacultySearchBar from "../FacultySearchBar/FacultySearchBar";
import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import FacultyCreateModal from "../FacultyModal/FacultyCreateModal";
import FacultyUpdateModal from "../FacultyModal/FacultyUpdateModal";
import AlertDialogBlockFaculty from "../AlertDialogFaculty/AlertDialogBlockFaculty";
import AlertDialogUnBlockFaculty from "../AlertDialogFaculty/AlertDialogUnBlockFaculty";

export default function FacultyTable({ data }: IFacultyProps) {
    const [isModalCreate, setIsModalCreate] = useState(false);
    const [isModalUpdate, setIsModalUpdate] = useState(false);
    const [selectedFaculty, setSelectedFaculty] = useState<IFaculty | null>(null);
    return (
        <div className="mt-5 p-5 border rounded-2xl bg-white ml-3 w-[98%]">
            <div className="flex items-center justify-between mb-5">
                <h1 className="text-2xl font-bold text-gray-500">Danh sách khoa đào tạo</h1>
                <div className="flex items-center justify-center gap-3">
                    <FacultySearchBar />
                    <button onClick={() => setIsModalCreate(true)} className="border-none hover:bg-orange-400 cursor-pointer hover:text-white transition duration-500 p-2 rounded-full bg-orange-100 text-gray-400 text-sm"><CirclePlus /></button>
                </div>
            </div>
            <table className="w-full border-separate border border-gray-100 border-spacing-0 rounded-xl overflow-hidden ">
                <thead className="bg-orange-100 text-gray-500 uppercase text-sm tracking-wide">
                    <tr className="h-12.5 text-center font-medium rounded-tl-xl">
                        <th>Mã khoa</th>
                        <th>Khoa</th>
                        <th>Trạng thái</th>
                        <th className="text-center">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {data.faculties.map((fa) => (
                        <tr key={fa.id} className="h-12.5 text-center hover:bg-orange-50 transition-all duration-500">
                            <td>{fa.code}</td>
                            <td>{fa.name}</td>
                            <td>{fa.isActive === true ? <span className='bg-green-100 p-2 rounded-2xl text-green-400'>Hoạt động</span> : <span className='bg-red-100 p-2 rounded-2xl text-red-400'>Tạm dừng</span>}</td>

                            <td className="text-center">
                                <span className='mr-2'>{fa.isActive === true ? <AlertDialogBlockFaculty facultyId={fa.id} /> : <AlertDialogUnBlockFaculty facultyId={fa.id} />}</span>
                                <button onClick={() => {
                                    setIsModalUpdate(true);
                                    setSelectedFaculty(fa);
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
                    <FacultyCreateModal onClose={() => setIsModalCreate(false)} />
                </DialogContent>
            </Dialog>
            <Dialog open={isModalUpdate} onOpenChange={setIsModalUpdate}>
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
            </Dialog>
        </div>
    )
}