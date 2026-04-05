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
    DialogTrigger,
} from "@/components/ui/dialog"
import StudentAddModal from '@/app/(page)/admin/students/StudentModal/StudentAddModal';
import CertificationSubmitModal from "./CertificationSubmitModal";
const STATUS_CONFIG: Record<TStatusOfCertificateStudent, {
    label: string;
    className: string;
    btnLabel: string;
    btnIcon: React.ReactNode;
    disabled: boolean;
}> = {
    REVOKED: {
        label: "Từ chối duyệt",
        className: "bg-red-50 text-red-500 border border-red-200",
        btnLabel: "Nộp lại chứng chỉ",
        btnIcon: <Upload size={14} />,
        disabled: false,
    },
    ISSUED: {
        label: "Đã xét duyệt",
        className: "bg-green-50 text-green-600 border border-green-200",
        btnLabel: "Đã xét duyệt chứng chỉ",
        btnIcon: <CircleCheck size={14} />,
        disabled: true,
    },
    PENDING: {
        label: "Đang chờ duyệt",
        className: "bg-gray-100 text-gray-500 border border-gray-200",
        btnLabel: "Đang chờ xét duyệt",
        btnIcon: <Hourglass size={14} />,
        disabled: true,
    },
};
export default function CertificationStudent({ data }: ICertificicateStudentDataProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    if (data.certificates.length === 0) {
        return (
            <p className="text-sm text-gray-400 text-center py-8">
                Hiện tại sinh viên vẫn chưa nộp yêu cầu duyệt chứng chỉ nào
            </p>
        );
    }
    return (
        <div className="space-y-4 p-5">
            {data.certificates.map((ce, index) => {
                const config = STATUS_CONFIG[ce.status];
                return (
                    <div
                        key={index}
                        className="flex flex-col sm:flex-row gap-4 bg-white border border-gray-100 rounded-2xl p-4 shadow-sm"
                    >
                        <div className="shrink-0">
                            <Image
                                src={ce.fileUrl}
                                alt={ce.template.name}
                                width={100}
                                height={100}
                                className="rounded-xl object-cover w-25 h-25"
                                loading="lazy"
                            />
                        </div>
                        <div className="flex-1 min-w-0 space-y-1">
                            <div className="flex items-start justify-between gap-2 flex-wrap">
                                <h2 className="text-sm font-bold text-gray-800">
                                    {ce.template.code} - {ce.template.name}
                                </h2>
                                <span className={`text-xs font-medium px-3 py-1 rounded-full shrink-0 ${config.className}`}>
                                    {config.label}
                                </span>
                            </div>

                            <p className="text-xs text-gray-500">
                                <span className="font-medium">Ngày cấp:</span>{" "}
                                {new Date(ce.issueDate).toLocaleDateString("vi-VN")}
                            </p>
                            <p className="text-xs text-gray-500">
                                <span className="font-medium">Người duyệt:</span>{" "}
                                {ce.admin.fullName}
                            </p>
                            {ce.note && (
                                <p className="text-xs text-gray-500">
                                    <span className="font-medium">Ghi chú:</span>{" "}
                                    {ce.note}
                                </p>
                            )}
                            <div className="pt-2">
                                <button
                                    disabled={config.disabled}
                                    onClick={() => setIsModalOpen(true)}
                                    className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl border transition-all
                                        ${config.disabled
                                            ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200"
                                            : "bg-[#ec5d15] text-white border-[#ec5d15] hover:bg-[#d44d0f] active:scale-95 shadow-md shadow-orange-200"
                                        }`}
                                >
                                    {config.btnIcon}
                                    {config.btnLabel}
                                </button>
                            </div>
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