import { IProgramData, IProgramDataResponseProps } from "@/app/types/admin/program.type";
import { Pencil, CirclePlus, Info } from 'lucide-react';
import Pagination from '@/components/Pagination';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import ProgramSearchBar from "../ProgramSearchBar/ProgramSearchBar";
import { useState } from "react";
import ProgramCreateModal from "../ProgramModal/ProgramCreateModal";
import ProgramUpdateModal from "../ProgramModal/ProgramUpdateModal";
import AlertDialogBlockProgram from "../AlertDialogProgram/AlertDialogBlockProgram";
import AlertDialogUnBlockProgram from "../AlertDialogProgram/AlertDialogUnBlockProgram";
import Link from "next/link";
export default function ProgramTable({ data }: IProgramDataResponseProps) {
    console.log(data);
    const [isModalCreate, setIsModalCreate] = useState(false);
    const [isModalUpdate, setIsModalUpdate] = useState(false);
    const [selectedProgram, setSelectedProgram] = useState<IProgramData | null>(null);
    const trainingLevelRender = {
        "BACHELOR": <span className="bg-blue-100 py-2 px-3 rounded-2xl text-blue-300">Cử nhân</span>,
        "COLLEGE": <span className="bg-orange-100 p-2 rounded-2xl text-orange-300">Cao đẳng</span>,
        "MASTER": <span className="bg-green-100 py-2 px-4 rounded-2xl text-green-300">Thạc sĩ</span>
    };
    const educationTypeRender = {
        "FULL_TIME": <span className="bg-purple-100 py-2 px-5 rounded-2xl text-purple-300">Chính quy</span>,
        "PART_TIME": <span className="bg-red-100 p-2 rounded-2xl text-red-300">Bán thời gian</span>,
        "DISTANCE_LEARNING": <span className="bg-pink-100 py-2 px-5 rounded-2xl text-pink-300">Học từ xa</span>
    };
    return (
        <div className="mt-5 p-5 border rounded-2xl bg-white ml-3 w-[98%]">
            <div className="flex items-center justify-between mb-5">
                <div>
                    <h1 className="text-2xl font-bold text-gray-700">
                        Danh sách chương trình
                    </h1>
                    <p className="mt-1 text-sm text-gray-400">
                        Quản lý chương trình đào tạo dành cho sinh viên.
                    </p>
                </div>
                <div className="flex items-center justify-center gap-3">
                    <ProgramSearchBar />
                    <button onClick={() => setIsModalCreate(true)} className="border-none hover:bg-orange-400 cursor-pointer hover:text-white transition duration-500 p-2 rounded-full bg-orange-100 text-gray-400 text-sm"><CirclePlus /></button>
                </div>
            </div>
            <table className="w-full border-separate border border-gray-100 border-spacing-0 rounded-xl overflow-hidden ">
                <thead className="bg-orange-100 text-gray-500 uppercase text-sm tracking-wide">
                    <tr className="h-12.5 text-center font-medium rounded-tl-xl">
                        <th>Mã chương trình</th>
                        <th>Chương trình</th>
                        <th>Bằng cấp</th>
                        <th>Loại đào tạo</th>
                        <th>Thời gian đào tạo</th>
                        <th>Tiền một tín chỉ</th>
                        <th>Trạng thái</th>
                        <th className="text-center">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {data.programs.map((pr) => (
                        <tr key={pr.id} className="h-12.5 text-center hover:bg-orange-50 transition-all duration-500">
                            <td>{pr.code}</td>
                            <td>{pr.name}</td>
                            <td>{trainingLevelRender[pr.trainingLevel] ?? <span className="bg-gray-500">{pr.trainingLevel}</span>}</td>
                            <td>{educationTypeRender[pr.educationType] ?? <span className="bg-gray-500">{pr.educationType}</span>}</td>
                            <td>{pr.plannedEducationYear} năm</td>
                            <td>{pr.feePerCredit.toLocaleString("vi-VN")}VNĐ</td>
                            <td>{pr.isActive === true ? <span className='bg-green-100 p-2 rounded-2xl text-green-400'>Hoạt động</span> : <span className='bg-red-100 p-2 rounded-2xl text-red-400'>Tạm dừng</span>}</td>
                            <td className="text-center flex items-center justify-center gap-2">
                                <span>{pr.isActive === true ? <AlertDialogBlockProgram programId={pr.id} /> : <AlertDialogUnBlockProgram programId={pr.id} />}</span>
                                <button onClick={() => {
                                    setIsModalUpdate(true);
                                    setSelectedProgram(pr);
                                }}><Pencil className="text-gray-300 hover:text-blue-400 cursor-pointer duration-300 transition-all" /></button>
                                <Link className="text-gray-300 hover:text-gray-500 cursor-pointer duration-300 transition-all" href={`/admin/programs/${pr.id}`}>
                                    <Info />
                                </Link>
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
                    <ProgramCreateModal onClose={() => setIsModalCreate(false)} />
                </DialogContent>
            </Dialog>
            <Dialog open={isModalUpdate} onOpenChange={setIsModalUpdate}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Cập nhật thông tin lịch học</DialogTitle>
                    </DialogHeader>
                    {isModalUpdate && selectedProgram && (
                        <ProgramUpdateModal
                            key={selectedProgram.id}
                            selectedProgram={selectedProgram}
                            onClose={() => {
                                setIsModalUpdate(false)
                                setSelectedProgram(null)
                            }}
                        />
                    )}
                </DialogContent>
            </Dialog>
        </div >
    )
}