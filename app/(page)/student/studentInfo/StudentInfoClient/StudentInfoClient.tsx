"use client";
import Image from "next/image";
import { GraduationCap, IdCard, BookOpen, UserRound, Mail, Phone, MapPin, CalendarDays } from "lucide-react";
import InfoRow from "../../dashboard/StudentInfo/InfoRow";
import { IStudentInfoProps } from "@/app/types/student/studentInfo.type";
const STATUS_MAP = {
    STUDYING: {
        label: "Đang học",
        className:
            "bg-orange-50 text-[#ec5d15] ring-1 ring-orange-200 dark:bg-orange-900/20 dark:text-orange-300 dark:ring-orange-800",
    },
    GRADUATE: {
        label: "Đã tốt nghiệp",
        className:
            "bg-amber-50 text-amber-600 ring-1 ring-amber-200 dark:bg-amber-900/20 dark:text-amber-300 dark:ring-amber-800",
    },
    TRUANT: {
        label: "Bảo lưu",
        className:
            "bg-gray-100 text-gray-500 ring-1 ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700",
    },
} as const;
type StatusKey = keyof typeof STATUS_MAP;
export default function StudentInfo({ data }: IStudentInfoProps) {
    const status = STATUS_MAP[data.student.status as StatusKey] ?? {
        label: data.student.status,
        className: "bg-gray-100 text-gray-500 ring-1 ring-gray-200",
    };

    const initials = data.fullName
        .split(" ")
        .slice(-2)
        .map((w: string) => w[0])
        .join("")
        .toUpperCase();

    const statusDotClass =
        data.student.status === "STUDYING"
            ? "bg-emerald-400"
            : data.student.status === "GRADUATE"
                ? "bg-amber-400"
                : "bg-gray-400";
    return (
        <div className="w-full max-w-6xl mx-auto space-y-6">
            <div className="overflow-hidden rounded-3xl border border-orange-100 bg-white shadow-lg dark:border-gray-800 dark:bg-gray-950">
                <div className="h-28 md:h-36 bg-linear-to-r from-[#ec5d15] via-[#f07835] to-[#f6a26a]" />
                <div className="relative px-5 md:px-8 pb-8">
                    <div className="-mt-12 md:-mt-14 flex flex-col md:flex-row md:items-end md:justify-between gap-5">
                        <div className="flex flex-col md:flex-row md:items-center gap-4">
                            <div className="relative">
                                {data.avatar ? (
                                    <Image
                                        src={data.avatar}
                                        width={96}
                                        height={96}
                                        alt={data.fullName}
                                        className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover ring-4 ring-white shadow-lg dark:ring-gray-900"
                                    />
                                ) : (
                                    <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-linear-to-r from-[#ec5d15] to-[#f08040] ring-4 ring-white shadow-lg flex items-center justify-center dark:ring-gray-900">
                                        <span className="text-white text-3xl md:text-4xl font-bold select-none">
                                            {initials}
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                                    {data.fullName}
                                </h1>
                                <p className="mt-1 text-sm md:text-base text-gray-500 dark:text-gray-400">
                                    Mã sinh viên:{" "}
                                    <span className="font-semibold text-gray-800 dark:text-gray-200">
                                        {data.student.studentCode}
                                    </span>
                                </p>
                                <div className="mt-3 inline-flex items-center gap-2">
                                    <span
                                        className={`text-xs md:text-sm font-semibold px-3 py-1.5 rounded-full ${status.className}`}
                                    >
                                        {status.label}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="rounded-2xl border border-orange-100 bg-orange-50 px-4 py-3 shadow-sm dark:border-orange-900/30 dark:bg-orange-900/10">
                            <div className="flex items-center gap-2 text-[#ec5d15] font-semibold">
                                <GraduationCap size={18} />
                                <span>Hồ sơ sinh viên</span>
                            </div>
                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                                Thông tin cá nhân & học vấn
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="rounded-3xl border border-orange-100 bg-white p-5 md:p-6 shadow-lg dark:border-gray-800 dark:bg-gray-950">
                <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-100 text-[#ec5d15]">
                        <UserRound size={22} />
                    </div>
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                            Thông tin cá nhân
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Hồ sơ cơ bản của sinh viên
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InfoRow
                        label="Họ và tên"
                        value={data.fullName}
                        icon={<UserRound size={18} />}
                    />
                    <InfoRow
                        label="Giới tính"
                        value={data.gender === "MALE" ? "Nam" : "Nữ"}
                        icon={<UserRound size={18} />}
                    />
                    <InfoRow
                        label="Email tài khoản"
                        value={data.email}
                        icon={<Mail size={18} />}
                    />
                    <InfoRow
                        label="Email cá nhân"
                        value={data.student.personalEmail}
                        icon={<Mail size={18} />}
                    />
                    <InfoRow
                        label="Ngày sinh"
                        value={new Date(data.dateOfBirth).toLocaleDateString("vi-VN")}
                        icon={<CalendarDays size={18} />}
                    />
                    <InfoRow
                        label="Số điện thoại"
                        value={data.phoneNumber}
                        icon={<Phone size={18} />}
                    />
                    <InfoRow
                        label="Địa chỉ"
                        value={data.address}
                        icon={<MapPin size={18} />}
                    />
                    <InfoRow
                        label="Căn cước công dân"
                        value={data.student.citizenId}
                        icon={<IdCard size={18} />}
                    />
                    <InfoRow
                        label="Nơi sinh"
                        value={data.student.placeOfBirth}
                        icon={<MapPin size={18} />}
                    />
                    <InfoRow
                        label="Dân tộc"
                        value={data.student.ethnicity}
                        icon={<UserRound size={18} />}
                    />
                </div>
            </div>
            <div className="rounded-3xl border border-orange-100 bg-white p-5 md:p-6 shadow-lg dark:border-gray-800 dark:bg-gray-950">
                <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-100 text-[#ec5d15]">
                        <BookOpen size={22} />
                    </div>
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                            Thông tin học vấn
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Chi tiết chương trình và tình trạng học tập
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InfoRow
                        label="Năm vào trường"
                        value={data.student.admissionYear}
                        icon={<GraduationCap size={18} />}
                    />
                    <InfoRow
                        label="Năm ra trường"
                        value={data.student.graduateYear}
                        icon={<GraduationCap size={18} />}
                    />
                    <InfoRow
                        label="Giáo viên đảm nhiệm"
                        value={data.student.class.homeroomLecturer?.user?.fullName ?? "Chưa có giáo viên đảm nhiệm"}
                        icon={<UserRound size={18} />}
                    />
                    <InfoRow
                        label="Lớp học"
                        value={data.student.class.name}
                        icon={<BookOpen size={18} />}
                    />
                    <InfoRow
                        label="Chương trình học"
                        value={`${data.student.program.code} - ${data.student.program.name}`}
                        icon={<BookOpen size={18} />}
                    />
                    <InfoRow
                        label="Khoa đào tạo"
                        value={`${data.student.faculty.code} - ${data.student.faculty.name}`}
                        icon={<GraduationCap size={18} />}
                    />
                    <InfoRow
                        label="Chuyên ngành"
                        value={`${data.student.major.code} - ${data.student.major.name}`}
                        icon={<BookOpen size={18} />}
                    />
                </div>
            </div>
        </div>
    );
}