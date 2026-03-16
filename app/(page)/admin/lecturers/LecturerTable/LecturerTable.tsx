"use client"
import { ILecturerDataProps, ILecturerDataResponse, ILecturerManager } from "@/app/types/admin/lecturer.type";
import { Pencil, UserRoundPlus, Settings, User } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Pagination from '@/components/Pagination';
import Image from 'next/image';
import AlertDialogBlockUser from '@/app/(page)/admin/students/AlertDialogStudent/AlertDialogBlockStudent';
import AlertDialogUnBlockUser from '@/app/(page)/admin/students/AlertDialogStudent/AlertDialogUnBlockStudent';
import LecturerSearchBar from "../LecturerSearchBar/LecturerSearchBar";
import { useState } from "react";
import LecturerCreateModal from "../LecturerModal/LecturerCreateModal";
import LecturerUpdateModal from "../LecturerModal/LecturerUpdateModal";
import AlertDialogBlockLecturer from "../AlertDialogLecturer/AlertDialogBlockLecturer";
import AlertDialogUnBlockLecturer from "../AlertDialogLecturer/AlertDialogUnBlockLecturer";
import LecturerResetPasswordModal from "../LecturerModal/LecturerResetPasswordModal";
export default function LecturerTable({ data }: ILecturerDataProps) {
    console.log(data);
    const [isModalCreate, setIsModalCreate] = useState(false);
    const [isModalUpdate, setIsModalUpdate] = useState(false);
    const [isModalReset, setIsModalReset] = useState(false);
    const [selectedLecturerId, setSelectedLecturerId] = useState(0);
    const [selectedLecturer, setSelectedLecturer] = useState<ILecturerManager | null>(null);
    const statusRender = {
        "WORKING": <span className="bg-purple-400 p-2 rounded-2xl text-green-50">Đang làm việc</span>,
        "TRUANT": <span className="bg-yellow-500 p-2 rounded-2xl text-yellow-50">Đã nghỉ việc</span>
    }
    return (
        <div className="mt-5 p-5 border rounded-2xl bg-white ml-3 w-[98%]">
            <div className="flex items-center justify-between mb-5">
                <h1 className="text-2xl font-bold text-gray-500">Danh sách giảng viên</h1>
                <div className="flex items-center justify-center gap-3">
                    <LecturerSearchBar />
                    <button onClick={() => { setIsModalCreate(true) }} className="border-none hover:bg-orange-400 cursor-pointer hover:text-white transition duration-500 p-2 rounded-full bg-orange-100 text-gray-400 text-sm"><UserRoundPlus /></button>
                </div>
            </div>
            <table className="w-full border-separate border border-gray-100 border-spacing-0 rounded-xl overflow-hidden ">
                <thead className="bg-orange-100 text-gray-500 uppercase text-sm tracking-wide">
                    <tr className="h-12.5 text-center font-medium rounded-tl-xl">
                        <th>Họ tên</th>
                        <th>Khoa</th>
                        <th>Ngành đảm nhận</th>
                        <th>Tài khoản</th>
                        <th>Trạng thái</th>
                        <th className="text-center">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {data.lecturers.map((lc) => (
                        <tr key={lc.lecturer.id} className="h-12.5 text-center hover:bg-orange-50 transition-all duration-500">
                            <td className='w-55'>
                                <div className="flex items-center justify-start gap-3 py-2 ml-3">
                                    {lc.avatar
                                        ? <Image
                                            src={lc.avatar}
                                            width={40}
                                            height={40}
                                            alt={lc.fullName}
                                            className="rounded-full object-cover w-10 h-10 border-2 border-orange-100"
                                        />
                                        : <div className="w-10 h-10 rounded-full bg-orange-100 border-2 border-orange-200
                              flex items-center justify-center shrink-0">
                                            <User className="size-5 text-[#ec5d15]" />
                                        </div>
                                    }
                                    <div className="flex flex-col items-start justify-center">
                                        <p className="font-medium text-sm text-gray-800">{lc.fullName}</p>
                                        <span className="text-xs text-gray-400">{lc.lecturer.lecturerCode}</span>
                                    </div>
                                </div>
                            </td>
                            <td>{lc.lecturer.faculty.name}</td>
                            <td>{lc.lecturer.major.name}</td>
                            <td>{lc.isActive === true ? <span className='bg-green-400 p-2 rounded-2xl text-green-50'>Hoạt động</span> : <span className='bg-red-400 p-2 rounded-2xl text-red-50'>Bị khóa</span>}</td>
                            <td>{statusRender[lc.lecturer.status] ?? <span className="bg-gray-500">{lc.lecturer.status}</span>}</td>
                            <td className="text-center">
                                <span className='mr-2'>{lc.isActive === true ? <AlertDialogBlockLecturer lecturerId={lc.lecturer.id} /> : <AlertDialogUnBlockLecturer lecturerId={lc.lecturer.id} />}</span>
                                <button onClick={() => {
                                    setIsModalUpdate(true);
                                    setSelectedLecturer(lc);
                                }}><Pencil className="text-gray-300 hover:text-blue-400 cursor-pointer duration-300 transition-all" /></button>
                                <button onClick={() => {
                                    setIsModalReset(true)
                                    setSelectedLecturerId(lc.lecturer.id)
                                }}><Settings className="text-gray-300 hover:text-gray-500 ml-2 cursor-pointer duration-300 transition-all" /></button>
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
                    <LecturerCreateModal onClose={() => setIsModalCreate(false)} />
                </DialogContent>
            </Dialog>
            <Dialog open={isModalUpdate} onOpenChange={setIsModalUpdate}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Cập nhật thông tin sinh viên</DialogTitle>
                    </DialogHeader>
                    {isModalUpdate && selectedLecturer && (
                        <LecturerUpdateModal
                            key={selectedLecturer.lecturer.id}
                            selectedLecturer={selectedLecturer}
                            onClose={() => {
                                setIsModalUpdate(false)
                                setSelectedLecturer(null)
                            }}
                        />
                    )}
                </DialogContent>
            </Dialog>
            <Dialog open={isModalReset} onOpenChange={setIsModalReset}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Cập nhật mật khẩu dành cho giảng viên</DialogTitle>
                    </DialogHeader>
                    <LecturerResetPasswordModal lecturerId={selectedLecturerId} onClose={() => setIsModalReset(false)} />
                </DialogContent>
            </Dialog>
        </div>
    )
}