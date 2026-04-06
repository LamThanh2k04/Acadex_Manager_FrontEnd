import { IChatProfileData } from "@/app/types/student/chatbox.type";
import Image from "next/image";
import {
    User, Mail, Phone, MapPin, Calendar,
    GraduationCap, BookOpen, Star, Hash, CreditCard
} from "lucide-react";
import InfoRow from "../../../dashboard/StudentInfo/InfoRow";

const STATUS_CONFIG = {
    STUDYING: { label: "Đang học", className: "bg-emerald-50 text-emerald-600 border border-emerald-200" },
    GRADUATE: { label: "Đã tốt nghiệp", className: "bg-blue-50 text-blue-600 border border-blue-200" },
    TRUANT: { label: "Nghỉ học", className: "bg-red-50 text-red-500 border border-red-200" },
};
const GENDER_LABEL = {
    MALE: "Nam",
    FEMALE: "Nữ",
};
export default function ChatDataProfile({ data }: { data: IChatProfileData }) {
    const status = STATUS_CONFIG[data.status];
    return (
        <div className="mt-2 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden text-xs">
            <div className="flex items-center gap-3 px-3 py-3 bg-linear-to-r from-orange-50 to-white dark:from-orange-900/10 dark:to-gray-800 border-b border-gray-100 dark:border-gray-700">
                <div className="relative shrink-0">
                    {data.user.avatar ? (
                        <Image
                            src={data.user.avatar}
                            alt={data.user.fullName}
                            width={40}
                            height={40}
                            className="rounded-full object-cover w-10 h-10 border-2 border-white shadow-sm"
                        />
                    ) : (
                        <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center border-2 border-white shadow-sm">
                            <User size={18} className="text-[#ec5d15]" />
                        </div>
                    )}
                </div>
                <div className="min-w-0 flex-1">
                    <p className="font-bold text-gray-800 dark:text-gray-100 truncate">
                        {data.user.fullName}
                    </p>
                    <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                        <span className="font-mono text-[10px] text-gray-400">
                            {data.studentCode}
                        </span>
                        <span className="text-gray-300">·</span>
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${status.className}`}>
                            {status.label}
                        </span>
                    </div>
                </div>
            </div>
            <div className="px-3 py-2.5 space-y-2 border-b border-gray-50 dark:border-gray-700">
                <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">
                    Thông tin cá nhân
                </p>
                <div className="grid grid-cols-2 gap-2">
                    <InfoRow icon={<Mail size={11} />} label="Email trường" value={data.user.email} />
                    <InfoRow icon={<Mail size={11} />} label="Email cá nhân" value={data.personalEmail} />
                    <InfoRow icon={<Phone size={11} />} label="Số điện thoại" value={data.user.phoneNumber} />
                    <InfoRow icon={<User size={11} />} label="Giới tính" value={GENDER_LABEL[data.user.gender]} />
                    <InfoRow
                        icon={<Calendar size={11} />}
                        label="Ngày sinh"
                        value={new Date(data.user.dateOfBirth).toLocaleDateString("vi-VN")}
                    />
                    <InfoRow icon={<Hash size={11} />} label="CCCD" value={data.citizenId} />
                    <InfoRow icon={<MapPin size={11} />} label="Địa chỉ" value={data.user.address} />
                    <InfoRow icon={<MapPin size={11} />} label="Nơi sinh" value={data.placeOfBirth} />
                </div>
            </div>
            <div className="px-3 py-2.5 space-y-2 border-b border-gray-50 dark:border-gray-700">
                <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">
                    Thông tin học tập
                </p>
                <div className="grid grid-cols-2 gap-2">
                    <InfoRow icon={<GraduationCap size={11} />} label="Ngành" value={data.major?.name} />
                    <InfoRow icon={<BookOpen size={11} />} label="Lớp" value={data.class?.name} />
                    <InfoRow icon={<Calendar size={11} />} label="Năm nhập học" value={data.admissionYear} />
                    <InfoRow icon={<Calendar size={11} />} label="Năm tốt nghiệp" value={data.graduateYear} />
                </div>
            </div>
            <div className="px-3 py-2.5">
                <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col items-center bg-orange-50 dark:bg-orange-900/10 rounded-xl py-2">
                        <Star size={12} className="text-[#ec5d15] mb-0.5" />
                        <span className="text-[9px] text-gray-400">GPA</span>
                        <span className="text-sm font-black text-[#ec5d15]">
                            {data.gpa?.toFixed(2) ?? "—"}
                        </span>
                    </div>
                    <div className="flex flex-col items-center bg-blue-50 dark:bg-blue-900/10 rounded-xl py-2">
                        <CreditCard size={12} className="text-blue-500 mb-0.5" />
                        <span className="text-[9px] text-gray-400">Tín chỉ tích lũy</span>
                        <span className="text-sm font-black text-blue-500">
                            {data.creditsEarned ?? "—"}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
