"use client"
import InfoRow from "@/components/InfoRow";
import { ILecturerInfoResponse } from '@/types/lecturer/info/info.type';
import {
    Mail, Phone, MapPin, User, BookOpen,
    Building2, GraduationCap, BadgeCheck, CircleUserRound
} from "lucide-react";

const formatDate = (date: string | null) =>
    date ? new Date(date).toLocaleDateString("vi-VN") : "Chưa cập nhật";

const GENDER_MAP: Record<string, string> = {
    MALE: "Nam",
    FEMALE: "Nữ",
    OTHER: "Khác"
};

const DEGREE_MAP: Record<string, string> = {
    BACHELOR: "Cử nhân",
    MASTER: "Thạc sĩ",
    DOCTOR: "Tiến sĩ",
    PROFESSOR: "Giáo sư"
};

const STATUS_MAP: Record<string, { label: string, className: string }> = {
    WORKING: { label: "Đang làm việc", className: "bg-green-100 text-green-600" },
    TRUANT: { label: "Đã nghỉ việc", className: "bg-red-100 text-red-500" },
};

interface ILecturerInfoProps {
    data: ILecturerInfoResponse;
}

export default function LecturerInfo({ data }: ILecturerInfoProps) {
    const lecturer = data.lecturer;
    const info = data?.lecturer.lecturer;
    const status = STATUS_MAP[info.status];

    return (
        <div className="max-w-xl mx-auto px-4 py-6 space-y-4 md:grid md:grid-cols-2 md:max-w-7xl md:gap-5">
            <div className="bg-white border border-gray-100 rounded-2xl p-5 flex flex-col items-center text-center dark:border-none dark:bg-gray-900 transition-colors duration-300">
                {lecturer.avatar ? (
                    <img
                        src={lecturer.avatar}
                        alt={lecturer.fullName}
                        className="w-24 h-24 rounded-full object-cover border-4 border-orange-100 mb-3"
                    />
                ) : (
                    <div className="w-24 h-24 rounded-full bg-orange-50 border-4 border-orange-100 flex items-center justify-center mb-3">
                        <CircleUserRound className="size-12 text-orange-300" />
                    </div>
                )}
                <h1 className="text-xl font-bold text-gray-800 dark:text-white">{lecturer.fullName}</h1>
                <p className="text-sm text-gray-400 mt-0.5 dark:text-[#eebbc3]">{info.lecturerCode} • {info.faculty.name}</p>
                <span className={`mt-2 text-xs font-medium px-3 py-1 rounded-full ${status.className}`}>
                    {status.label}
                </span>
            </div>
            <div className="bg-white border dark:bg-gray-900 dark:border-none border-gray-100 rounded-2xl p-5">
                <h2 className="text-xs font-semibold text-gray-400 dark:text-[#eebbc3] uppercase tracking-wide mb-4">
                    Thông tin liên hệ
                </h2>
                <div className="space-y-3">
                    <InfoRow
                        icon={<Mail className="size-4 text-orange-400" />}
                        label="Email công việc"
                        value={lecturer.email}
                    />
                    <div className="h-px bg-gray-50" />
                    <InfoRow
                        icon={<Mail className="size-4 text-orange-400" />}
                        label="Email cá nhân"
                        value={info.personalEmail}
                    />
                    <div className="h-px bg-gray-50" />
                    <InfoRow
                        icon={<Phone className="size-4 text-orange-400" />}
                        label="Số điện thoại"
                        value={lecturer.phoneNumber ?? "Hiện chưa cập nhật"}
                    />
                    <div className="h-px bg-gray-50" />
                    <InfoRow
                        icon={<MapPin className="size-4 text-orange-400" />}
                        label="Địa chỉ"
                        value={lecturer.address ?? "Hiện chưa cập nhật"}
                    />
                </div>
            </div>
            <div className="bg-white border border-gray-100 dark:bg-gray-900 dark:border-none rounded-2xl p-5">
                <h2 className="text-xs font-semibold text-gray-400 dark:text-[#eebbc3] uppercase tracking-wide mb-4">
                    Thông tin cá nhân
                </h2>
                <div className="space-y-3">
                    <InfoRow
                        icon={<User className="size-4 text-orange-400" />}
                        label="Giới tính"
                        value={GENDER_MAP[lecturer.gender] ?? lecturer.gender}
                    />
                    <div className="h-px bg-gray-50" />
                    <InfoRow
                        icon={<BadgeCheck className="size-4 text-orange-400" />}
                        label="CCCD"
                        value={info.citizenId ?? "Hiện chưa cập nhật"}
                    />
                    <div className="h-px bg-gray-50" />
                    <InfoRow
                        icon={<MapPin className="size-4 text-orange-400" />}
                        label="Nơi sinh"
                        value={info.placeOfBirth ?? "Hiện chưa cập nhật"}
                    />
                    <div className="h-px bg-gray-50" />
                    <InfoRow
                        icon={<User className="size-4 text-orange-400" />}
                        label="Dân tộc"
                        value={info.ethnicity ?? "Hiện chưa cập nhật"}
                    />
                    <div className="h-px bg-gray-50" />
                    <InfoRow
                        icon={<User className="size-4 text-orange-400" />}
                        label="Ngày sinh"
                        value={formatDate(lecturer.dateOfBirth)}
                    />
                </div>
            </div>
            <div className="bg-white border border-gray-100 dark:bg-gray-900 dark:border-none rounded-2xl p-5">
                <h2 className="text-xs font-semibold text-gray-400 dark:text-[#eebbc3] uppercase tracking-wide mb-4">
                    Thông tin chuyên môn
                </h2>
                <div className="space-y-3">
                    <InfoRow
                        icon={<Building2 className="size-4 text-orange-400" />}
                        label="Khoa"
                        value={`${info.faculty.code} - ${info.faculty.name}`}
                    />
                    <div className="h-px bg-gray-50" />
                    <InfoRow
                        icon={<BookOpen className="size-4 text-orange-400" />}
                        label="Ngành"
                        value={`${info.major.code} - ${info.major.name}`}
                    />
                    <div className="h-px bg-gray-50" />
                    <InfoRow
                        icon={<GraduationCap className="size-4 text-orange-400" />}
                        label="Học vị"
                        value={info.degree ? DEGREE_MAP[info.degree] ?? info.degree : "Hiện chưa cập nhật"}
                    />
                    <div className="h-px bg-gray-50" />
                    <InfoRow
                        icon={<BadgeCheck className="size-4 text-orange-400" />}
                        label="Chức vụ"
                        value={info.position === "LECTURER" ? "Giảng viên" : info.position === "HEAD_SUBJECT" ? "Trưởng bộ môn" : info.position === "HEAD_DEPARTMENT" ? "Trưởng bộ phận" : info.position ?? "Hiện chưa cập nhật"}
                    />
                </div>
            </div>
        </div>
    )
}