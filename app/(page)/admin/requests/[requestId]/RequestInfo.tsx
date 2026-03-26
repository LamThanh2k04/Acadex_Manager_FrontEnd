"use client";
import { useGetRequestInfo } from "@/hooks/admin/useRequest";
import Image from "next/image";
import { CalendarDays, FileText, GraduationCap, UserRound, BadgeCheck, BookOpen, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
export default function RequestInfo({ requestId }: { requestId: number }) {
    const { data, isLoading } = useGetRequestInfo(requestId);
    const certificateInfo = data?.certificateInfo;
    const statusRender = {
        PENDING: (
            <span className="inline-flex items-center rounded-full border border-purple-200 bg-purple-100 px-4 py-1.5 text-xs font-semibold text-purple-600">
                Đang chờ duyệt
            </span>
        ),
        ISSUED: (
            <span className="inline-flex items-center rounded-full border border-yellow-200 bg-yellow-100 px-4 py-1.5 text-xs font-semibold text-yellow-600">
                Đã duyệt
            </span>
        ),
        REVOKED: (
            <span className="inline-flex items-center rounded-full border border-gray-200 bg-gray-100 px-4 py-1.5 text-xs font-semibold text-gray-500">
                Từ chối
            </span>
        ),
    }
    if (!certificateInfo) {
        return (
            <div className="mt-5 ml-3 w-[98%] rounded-3xl border border-orange-100 bg-white p-8 shadow-sm">
                <div className="rounded-2xl border border-dashed border-orange-200 bg-orange-50 py-12 text-center">
                    <p className="text-sm font-medium text-gray-500">
                        Không tìm thấy thông tin yêu cầu chứng chỉ.
                    </p>
                </div>
            </div>
        );
    }
    return (
        <div className="mt-5 ml-3 w-[98%] rounded-3xl border border-orange-100 bg-white p-6 shadow-sm">
            <div className="mb-6">
                <Link
                    href="/admin/requests"
                    className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-orange-500 transition mb-3 w-fit"
                >
                    <ArrowLeft className="size-4" /> Quay lại
                </Link>
            </div>
            <div className="mb-6 flex flex-col gap-4 border-b border-orange-100 pb-5 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-700">
                        Chi tiết yêu cầu chứng chỉ
                    </h1>
                    <p className="mt-1 text-sm text-gray-400">
                        Xem đầy đủ thông tin yêu cầu mà sinh viên đã gửi lên hệ thống
                    </p>
                </div>

                <div>
                    {statusRender[certificateInfo.status as keyof typeof statusRender] ?? (
                        <span className="inline-flex items-center rounded-full bg-gray-100 px-4 py-1.5 text-xs font-medium text-gray-500">
                            {certificateInfo.status}
                        </span>
                    )}
                </div>
            </div>
            <div className="grid grid-cols-3 gap-6">
                <div className="rounded-3xl border border-orange-100 bg-orange-50 p-4">
                    <div className="mb-4 flex items-center gap-2">
                        <BadgeCheck className="text-orange-400" size={18} />
                        <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-600">
                            Hình ảnh chứng chỉ
                        </h2>
                    </div>
                    <div className="overflow-hidden rounded-2xl border border-orange-100 bg-white p-2 shadow-sm">
                        <Image
                            src={certificateInfo.fileUrl}
                            alt={certificateInfo.template.name}
                            width={400}
                            height={400}
                            className="h-80 w-full rounded-xl object-cover"
                        />
                    </div>
                </div>
                <div className="space-y-6 lg:col-span-2">
                    <div className="rounded-3xl border border-orange-100 bg-white p-5 shadow-sm">
                        <div className="mb-4 flex items-center gap-2">
                            <FileText className="text-orange-400" size={18} />
                            <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-600">
                                Thông tin yêu cầu
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="rounded-2xl border border-orange-100 bg-orange-50 p-4">
                                <div className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-500">
                                    <CalendarDays size={16} className="text-orange-400" />
                                    Ngày cấp / ngày nộp
                                </div>
                                <p className="text-sm font-semibold text-gray-700">
                                    {new Date(certificateInfo.issueDate).toLocaleDateString("vi-VN")}
                                </p>
                            </div>

                            <div className="rounded-2xl border border-orange-100 bg-orange-50 p-4">
                                <div className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-500">
                                    <BadgeCheck size={16} className="text-orange-400" />
                                    Trạng thái xử lý
                                </div>
                                <div>
                                    {statusRender[certificateInfo.status as keyof typeof statusRender] ?? (
                                        <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-500">
                                            {certificateInfo.status}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="rounded-2xl border border-orange-100 bg-orange-50 p-4 md:col-span-2">
                                <div className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-500">
                                    <FileText size={16} className="text-orange-400" />
                                    Mô tả
                                </div>
                                <p className="text-sm leading-6 text-gray-700">
                                    {certificateInfo.description ?? "Hiện chưa có mô tả cho yêu cầu này."}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-3xl border border-orange-100 bg-white p-5 shadow-sm">
                        <div className="mb-4 flex items-center gap-2">
                            <UserRound className="text-orange-400" size={18} />
                            <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-600">
                                Thông tin sinh viên
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                            <div className="rounded-2xl border border-orange-100 bg-orange-50 p-4">
                                <p className="mb-2 text-sm font-medium text-gray-500">Họ và tên</p>
                                <p className="text-sm font-semibold text-gray-700">
                                    {certificateInfo.student.user.fullName}
                                </p>
                            </div>

                            <div className="rounded-2xl border border-orange-100 bg-orange-50 p-4">
                                <p className="mb-2 text-sm font-medium text-gray-500">Mã sinh viên</p>
                                <p className="text-sm font-semibold text-gray-700">
                                    {certificateInfo.student.studentCode}
                                </p>
                            </div>

                            <div className="rounded-2xl border border-orange-100 bg-orange-50 p-4">
                                <p className="mb-2 text-sm font-medium text-gray-500">Ngành học</p>
                                <p className="text-sm font-semibold text-gray-700">
                                    {certificateInfo.student.major.name}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-3xl border border-orange-100 bg-white p-5 shadow-sm">
                        <div className="mb-4 flex items-center gap-2">
                            <GraduationCap className="text-orange-400" size={18} />
                            <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-600">
                                Thông tin chứng chỉ
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="rounded-2xl border border-orange-100 bg-orange-50 p-4">
                                <div className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-500">
                                    <BookOpen size={16} className="text-orange-400" />
                                    Mã chứng chỉ
                                </div>
                                <p className="text-sm font-semibold text-orange-500">
                                    {certificateInfo.template.code}
                                </p>
                            </div>

                            <div className="rounded-2xl border border-orange-100 bg-orange-50 p-4">
                                <p className="mb-2 text-sm font-medium text-gray-500">Tên chứng chỉ</p>
                                <p className="text-sm font-semibold text-gray-700">
                                    {certificateInfo.template.name}
                                </p>
                            </div>

                            <div className="rounded-2xl border border-orange-100 bg-orange-50 p-4 md:col-span-2">
                                <p className="mb-2 text-sm font-medium text-gray-500">Mô tả chứng chỉ</p>
                                <p className="text-sm leading-6 text-gray-700">
                                    {certificateInfo.template.description || "Hiện chưa có mô tả cho chứng chỉ này."}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}