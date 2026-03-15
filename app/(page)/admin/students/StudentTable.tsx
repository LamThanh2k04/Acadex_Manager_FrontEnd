"use client"
import { IStudentManagerProps } from '@/app/types/admin/student.type';
import { Pencil, UserRoundPlus, Settings, User } from 'lucide-react';
import StudentSearchBar from './StudentSearchBar';
import { useState } from 'react';
import StudentAddModal from './StudentAddModal';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import Pagination from '@/components/Pagination';
import Image from 'next/image';
import AlertDialogBlockUser from '@/components/AlertDialogBlockUser';
import AlertDialogUnBlockUser from '@/components/AlertDialogUnBlockUser';
export default function StudentTable({ data }: IStudentManagerProps) {
    console.log(data);
    const [isModal, setIsModal] = useState(false);
    const statusRender = {
        "STUDYING": <span className="bg-purple-400 p-2 rounded-2xl text-green-50">Đang học</span>,
        "GRADUATE": <span className="bg-yellow-400 p-2 rounded-2xl text-orange-50">Đã tốt nghiệp</span>,
        "TRUANT": <span className="bg-gray-500 p-2 rounded-2xl text-red-50">Đã bảo lưu</span>
    }
    return (
        <div className="mt-5 p-5 border rounded-2xl bg-white ml-3 w-[98%]">
            <div className="flex items-center justify-between mb-5">
                <h1 className="text-2xl font-bold">Danh sách sinh viên</h1>
                <div className="flex items-center justify-center gap-3">
                    <StudentSearchBar />
                    <button onClick={() => { setIsModal(true) }} className="border-none hover:bg-orange-400 cursor-pointer hover:text-white transition duration-500 p-2 rounded-full bg-orange-100 text-gray-400 text-sm"><UserRoundPlus /></button>
                </div>
            </div>
            <table className="w-full border-separate border border-gray-100 border-spacing-0 rounded-xl overflow-hidden ">
                <thead className="bg-orange-100 text-gray-500 uppercase text-sm tracking-wide">
                    <tr className="h-12.5 text-center font-medium rounded-tl-xl">
                        <th>Họ tên</th>
                        <th>Khoa</th>
                        <th>Ngành</th>
                        <th>Giảng viên đảm nhiệm</th>
                        <th>Tài khoản</th>
                        <th>Trạng thái</th>
                        <th className="text-center">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {data.students.map((st) => (
                        <tr key={st.student.id} className="h-12.5 text-center hover:bg-orange-50 transition-all duration-500">
                            <td className='w-55'>
                                <div className="flex items-center justify-start gap-3 py-2 ml-3">
                                    {st.avatar
                                        ? <Image
                                            src={st.avatar}
                                            width={40}
                                            height={40}
                                            alt={st.fullName}
                                            className="rounded-full object-cover w-10 h-10 border-2 border-orange-100"
                                        />
                                        : <div className="w-10 h-10 rounded-full bg-orange-100 border-2 border-orange-200
                              flex items-center justify-center shrink-0">
                                            <User className="size-5 text-[#ec5d15]" />
                                        </div>
                                    }
                                    <div className="flex flex-col items-start justify-center">
                                        <p className="font-medium text-sm text-gray-800">{st.fullName}</p>
                                        <span className="text-xs text-gray-400">{st.student.studentCode}</span>
                                    </div>
                                </div>
                            </td>
                            <td>{st.student.faculty.name}</td>
                            <td>{st.student.major.name}</td>
                            <td>{st.student.class?.homeroomLecturer?.user?.fullName ?? "Chưa có giảng viên đảm nhiệm"}</td>
                            <td>{st.isActive === true ? <span className='bg-green-400 p-2 rounded-2xl text-green-50'>Hoạt động</span> : <span className='bg-red-400 p-2 rounded-2xl text-red-50'>Bị khóa</span>}</td>
                            <td>{statusRender[st.student.status] ?? <span className="bg-gray-500">{st.student.status}</span>}</td>
                            <td className="text-center">
                                <span className='mr-2'>{st.isActive === true ? <AlertDialogBlockUser studentId={st.student.id} /> : <AlertDialogUnBlockUser studentId={st.student.id} />}</span>
                                <button><Pencil className="text-gray-300 hover:text-blue-400 cursor-pointer duration-300 transition-all" /></button>
                                <button><Settings className="text-gray-300 hover:text-gray-500 ml-2 cursor-pointer duration-300 transition-all" /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination pagination={data.pagination} />
            <Dialog open={isModal} onOpenChange={setIsModal}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Thông tin chung</DialogTitle>
                    </DialogHeader>
                    <StudentAddModal onClose={() => setIsModal(false)} />
                </DialogContent>
            </Dialog>
        </div>
    )
}