"use client"
import { IRequestDataResponseProps } from "@/types/admin/request.type";
import { Info } from "lucide-react";
import Pagination from "@/components/Pagination";
import Image from "next/image";
import RequestSelectStatus from "../RequestSelectStatus/RequestSelectStatus";
import Link from "next/link";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import RequestModalApprove from "../RequestModal/RequestModalApprove";
import RequestModalReject from "../RequestModal/RequestModalReject";
export default function RequestTable({ data }: IRequestDataResponseProps) {
    const [isModalApprove, setIsModalApprove] = useState(false);
    const [isModalReject, setIsModalReject] = useState(false);
    const [selectedRequestId, setSelectedRequestId] = useState<number | null>(null);
    const statusRender = {
        PENDING: (
            <span className="inline-flex items-center rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-600 border border-purple-200">
                Đang chờ
            </span>
        ),
        ISSUED: (
            <span className="inline-flex items-center rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-600 border border-yellow-200">
                Đã duyệt
            </span>
        ),
        REVOKED: (
            <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-500 border border-gray-200">
                Từ chối
            </span>
        ),
    };
    return (
        <div className="mt-5 ml-3 w-[98%] rounded-3xl border border-orange-100 bg-white p-6 shadow-sm">
            <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-700">
                        Danh sách yêu cầu từ sinh viên
                    </h1>
                    <p className="mt-1 text-sm text-gray-400">
                        Quản lý các yêu cầu chứng chỉ mà sinh viên đã gửi lên hệ thống
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <RequestSelectStatus />
                </div>
            </div>
            <div className="overflow-hidden rounded-2xl border border-orange-100">
                <div className="overflow-x-auto">
                    <table className="min-w-full border-separate border-spacing-0">
                        <thead className="bg-linear-to-r from-orange-50 to-orange-100 text-xs font-semibold uppercase tracking-wide text-gray-600">
                            <tr>
                                <th className="px-4 py-4 text-center">Hình ảnh</th>
                                <th className="px-4 py-4 text-center">Ngày nộp</th>
                                <th className="px-4 py-4 text-left">Mô tả</th>
                                <th className="px-4 py-4 text-left">Thông tin sinh viên</th>
                                <th className="px-4 py-4 text-left">Chứng chỉ</th>
                                <th className="px-4 py-4 text-center">Trạng thái</th>
                                <th className="px-4 py-4 text-center">Hành động</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {data.requestCertificates.map((request, index) => (
                                <tr
                                    key={request.id}
                                    className={`
                                        transition-all duration-300 hover:bg-orange-50/60
                                        ${index !== data.requestCertificates.length - 1 ? "border-b border-orange-50" : ""}
                                    `}
                                >
                                    <td className="px-4 py-4">
                                        <div className="flex items-center justify-center">
                                            <div className="rounded-2xl border border-orange-100 bg-orange-50 p-1 shadow-sm">
                                                <Image
                                                    src={request.fileUrl}
                                                    width={64}
                                                    height={64}
                                                    alt={request.description ?? "certificate-image"}
                                                    className="h-16 w-16 rounded-xl object-cover"
                                                />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 text-center text-sm font-medium text-gray-600">
                                        {new Date(request.issueDate).toLocaleDateString("vi-VN")}
                                    </td>
                                    <td className="max-w-65 px-4 py-4 text-left">
                                        <p className="line-clamp-2 text-sm leading-6 text-gray-600">
                                            {request.description ?? "Hiện chưa có mô tả"}
                                        </p>
                                    </td>
                                    <td className="px-4 py-4 text-left">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-semibold text-gray-700">
                                                {request.student.user.fullName}
                                            </span>
                                            <span className="text-xs text-gray-400">
                                                {request.student.studentCode}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 text-left">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-semibold text-gray-700">
                                                {request.template.name}
                                            </span>
                                            <span className="text-xs text-orange-400">
                                                {request.template.code}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 text-center">
                                        {statusRender[request.status] ?? (
                                            <span className="inline-flex rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-500">
                                                {request.status}
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-4 py-4">
                                        <div className="flex items-center justify-center gap-2">
                                            {request.status === "PENDING" &&
                                                <>
                                                    <button
                                                        onClick={() => {
                                                            setIsModalApprove(true);
                                                            setSelectedRequestId(request.id);
                                                        }}
                                                        className="rounded-xl border cursor-pointer border-green-100 bg-green-50 px-4 py-2 text-sm font-medium text-green-500 transition-all duration-300 hover:scale-105 hover:bg-green-100 hover:text-green-600"
                                                    >
                                                        Chấp nhận
                                                    </button>

                                                    <button
                                                        onClick={() => {
                                                            setIsModalReject(true);
                                                            setSelectedRequestId(request.id)
                                                        }}
                                                        className="rounded-xl border cursor-pointer border-red-100 bg-red-50 px-4 py-2 text-sm font-medium text-red-500 transition-all duration-300 hover:scale-105 hover:bg-red-100 hover:text-red-600"
                                                    >
                                                        Từ chối
                                                    </button>
                                                </>
                                            }
                                            <Link
                                                href={`/admin/requests/${request.id}`}
                                                className="flex h-10 w-10 items-center justify-center rounded-xl border border-orange-100 bg-orange-50 text-orange-400 transition-all duration-300 hover:scale-105 hover:bg-orange-100 hover:text-orange-500"
                                            >
                                                <Info size={18} />
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {selectedRequestId !== null && (
                        <Dialog open={isModalApprove} onOpenChange={setIsModalApprove}>
                            <DialogContent className="max-w-2xl rounded-2xl border-0 p-0 overflow-hidden">
                                <DialogHeader className="border-b border-orange-100 bg-orange-50 px-6 py-4">
                                    <DialogTitle className="text-lg font-semibold text-gray-800">
                                        Lý do chấp nhận yêu cầu
                                    </DialogTitle>
                                </DialogHeader>

                                <div className="p-6">
                                    <RequestModalApprove
                                        requestId={selectedRequestId}
                                        onClose={() => {
                                            setIsModalApprove(false);
                                            setSelectedRequestId(null);
                                        }}
                                    />
                                </div>
                            </DialogContent>
                        </Dialog>
                    )}
                    {selectedRequestId !== null && (
                        <Dialog open={isModalReject} onOpenChange={setIsModalReject}>
                            <DialogContent className="max-w-2xl rounded-2xl border-0 p-0 overflow-hidden">
                                <DialogHeader className="border-b border-orange-100 bg-orange-50 px-6 py-4">
                                    <DialogTitle className="text-lg font-semibold text-gray-800">
                                        Lý do từ chối yêu cầu
                                    </DialogTitle>
                                </DialogHeader>
                                <div className="p-6">
                                    <RequestModalReject
                                        requestId={selectedRequestId}
                                        onClose={() => {
                                            setIsModalReject(false);
                                            setSelectedRequestId(null);
                                        }}
                                    />
                                </div>
                            </DialogContent>
                        </Dialog>
                    )}
                </div>
            </div>
            {data.requestCertificates.length === 0 && (
                <div className="mt-6 rounded-2xl border border-dashed border-orange-200 bg-orange-50 py-10 text-center">
                    <p className="text-sm font-medium text-gray-500">
                        Hiện chưa có yêu cầu nào phù hợp với bộ lọc.
                    </p>
                </div>
            )}
            <div className="mt-6">
                <Pagination pagination={data.pagination} />
            </div>
        </div>
    );
}