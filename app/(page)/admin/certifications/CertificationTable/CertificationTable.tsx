"use client"
import { ICertificationData, ICertificationDataResponesProps } from "@/app/types/admin/certification.type";
import { Pencil, CirclePlus } from 'lucide-react';
import Pagination from '@/components/Pagination';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import CertificationSearchBar from "../CertificationSearchBar/CertificationSearchBar";
import { useState } from "react";
import CertificationCreateModal from "../CertificationModal/CertificationCreateModal";
import CertificationUpdateModal from "../CertificationModal/CertificationUpdateModal";
import AlertDialogBlockCertification from "../AlertDialogCertification/AlertDialogBlockCertification";
import AlertDialogUnBlockCertification from "../AlertDialogCertification/AlertDialogUnBlockCertification";

export default function CertificationTable({ data }: ICertificationDataResponesProps) {
    const [isModalCreate, setIsModalCreate] = useState(false);
    const [isModalUpdate, setIsModalUpdate] = useState(false);
    const [selectedCertification, setSelectedCertification] = useState<ICertificationData | null>(null);
    return (
        <div className="mt-5 p-5 border rounded-2xl bg-white ml-3 w-[98%]">
            <div className="flex items-center justify-between mb-5">
                <h1 className="text-2xl font-bold text-gray-500">Danh sách chứng chỉ</h1>
                <div className="flex items-center justify-center gap-3">
                    <CertificationSearchBar />
                    <button onClick={() => setIsModalCreate(true)} className="border-none hover:bg-orange-400 cursor-pointer hover:text-white transition duration-500 p-2 rounded-full bg-orange-100 text-gray-400 text-sm"><CirclePlus /></button>
                </div>
            </div>
            <table className="w-full border-separate border border-gray-100 border-spacing-0 rounded-xl overflow-hidden ">
                <thead className="bg-orange-100 text-gray-500 uppercase text-sm tracking-wide">
                    <tr className="h-12.5 text-center font-medium rounded-tl-xl">
                        <th>Mã chứng chỉ</th>
                        <th>Chứng chỉ</th>
                        <th>Mô tả</th>
                        <th>Trạng thái</th>
                        <th className="text-center">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {data.certificates.map((ce) => (
                        <tr key={ce.id} className="h-12.5 text-center hover:bg-orange-50 transition-all duration-500">
                            <td>{ce.code}</td>
                            <td>{ce.name}</td>
                            <td>{ce.description}</td>
                            <td>{ce.isActive === true ? <span className='bg-green-100 p-2 rounded-2xl text-green-400'>Đang mở</span> : <span className='bg-red-100 p-2 rounded-2xl text-red-400'>Tạm đóng</span>}</td>
                            <td className="text-center">
                                <span className='mr-2'>{ce.isActive === true ? <AlertDialogBlockCertification certificateId={ce.id} /> : <AlertDialogUnBlockCertification certificateId={ce.id} />}</span>
                                <button onClick={() => {
                                    setIsModalUpdate(true);
                                    setSelectedCertification(ce);
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
                    <CertificationCreateModal onClose={() => setIsModalCreate(false)} />
                </DialogContent>
            </Dialog>
            <Dialog open={isModalUpdate} onOpenChange={setIsModalUpdate}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Cập nhật thông tin chứng chỉ</DialogTitle>
                    </DialogHeader>
                    {isModalUpdate && selectedCertification && (
                        <CertificationUpdateModal
                            key={selectedCertification.id}
                            selectedCertification={selectedCertification}
                            onClose={() => {
                                setIsModalUpdate(false)
                                setSelectedCertification(null)
                            }}
                        />
                    )}
                </DialogContent>
            </Dialog>
        </div >
    )
}