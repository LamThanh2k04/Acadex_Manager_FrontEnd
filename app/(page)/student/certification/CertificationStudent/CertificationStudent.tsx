"use client"
import { ICertificicateStudentDataProps, TStatusOfCertificateStudent } from "@/app/types/student/certification.type";
import { Upload, Hourglass, CircleCheck } from 'lucide-react';
import Image from "next/image";
import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import CertificationSubmitModal from "./CertificationSubmitModal";
export default function CertificationStudent({ data }: ICertificicateStudentDataProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    if (data.certificates.length === 0) {
        return (
            <p className="text-sm text-gray-400 text-center py-8">
                Hiện tại sinh viên vẫn chưa nộp yêu cầu duyệt chứng chỉ nào
            </p>
        );
    }
    const statusRender = {
        "REVOKED": <span className="bg-red-100 py-2 px-4 rounded-2xl text-red-400">Từ chối</span>,
        "ISSUED": <span className="bg-green-100 p-2 rounded-2xl text-green-400">Đã xét duyệt</span>,
        "PENDING": <span className="bg-gray-100 py-2 px-4 rounded-2xl text-gray-400">Chờ xét duyệt</span>
    }
    return (
        <div className="space-y-4 p-5">
            <div className="pt-2 flex items-center justify-end">
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl border transition-all bg-[#ec5d15] text-white border-[#ec5d15] hover:bg-[#d44d0f] active:scale-95 shadow-md shadow-orange-200 "
                >
                    <Upload size={20} />
                    Nộp chứng chỉ
                </button>
            </div>
            {data.certificates.map((ce, index) => {
                return (
                    <div
                        key={index}
                        className="flex flex-col sm:flex-row gap-4 bg-white border border-gray-100 rounded-2xl p-4 shadow-sm"
                    >
                        <div className="shrink-0 flex items-start justify-between">
                            <Image
                                src={ce.fileUrl}
                                alt={ce.template.name}
                                width={100}
                                height={100}
                                className="rounded-xl object-cover w-25 h-25"
                                loading="lazy"
                            />
                            <span className={`text-xs font-medium px-3 py-1 rounded-full shrink-0`}>
                                {statusRender[ce.status]}
                            </span>
                        </div>
                        <div className="flex-1 min-w-0 space-y-1">
                            <div className="flex items-start justify-between gap-2 flex-wrap">

                                <h2 className="text-sm font-bold text-gray-800">
                                    {ce.template.code} - {ce.template.name}
                                </h2>
                            </div>

                            <p className="text-xs text-gray-500">
                                <span className="font-medium">Ngày cấp:</span>{" "}
                                {new Date(ce.issueDate).toLocaleDateString("vi-VN")}
                            </p>
                            <p className="text-xs text-gray-500">
                                <span className="font-medium">Người duyệt:</span>{" "}
                                {ce.admin?.fullName ?? "Chưa được duỵệt"}
                            </p>
                            {ce.note && (
                                <p className="text-xs text-gray-500">
                                    <span className="font-medium">Ghi chú:</span>{" "}
                                    {ce.note}
                                </p>
                            )}
                        </div>
                    </div>
                );
            })}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Nộp lại chứng chỉ</DialogTitle>
                    </DialogHeader>
                    <CertificationSubmitModal onClose={() => setIsModalOpen(false)} />
                </DialogContent>
            </Dialog>
        </div>
    );
}