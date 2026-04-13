import { IStudentInfoProps } from "@/app/types/student/dashboard.type"
import Image from "next/image"
import { GraduationCap, IdCard, BookOpen, UserRound } from "lucide-react"
import InfoRow from "./InfoRow"
const STATUS_MAP = {
    STUDYING: {
        label: "Đang học",
        className: "bg-violet-50 text-violet-500 ring-1 ring-violet-200 dark:bg-violet-900/20 dark:text-violet-300 dark:ring-violet-800",
    },
    GRADUATE: {
        label: "Đã tốt nghiệp",
        className: "bg-amber-50 text-amber-500 ring-1 ring-amber-200 dark:bg-amber-900/20 dark:text-amber-300 dark:ring-amber-800",
    },
    TRUANT: {
        label: "Đã bảo lưu",
        className: "bg-gray-100 text-gray-400 ring-1 ring-gray-200 dark:bg-gray-800 dark:text-gray-500 dark:ring-gray-700",
    },
} as const
type StatusKey = keyof typeof STATUS_MAP
export default function StudentInfo({ data }: IStudentInfoProps) {
    const status = STATUS_MAP[data.student.status as StatusKey] ?? {
        label: data.student.status,
        className: "bg-gray-100 text-gray-500 ring-1 ring-gray-200",
    }
    const initials = data.fullName
        .split(" ")
        .slice(-2)
        .map((w: string) => w[0])
        .join("")
        .toUpperCase()
    return (
        <div className="bg-white dark:bg-gray-900 rounded-2xl border-none mt-6 dark:border-gray-800 overflow-hidden">
            <div className="px-5 pt-5 pb-4">
                <div className="flex flex-col items-center text-center gap-3 mb-5">
                    <div className="relative">
                        {data.avatar ? (
                            <Image
                                src={data.avatar}
                                width={88}
                                height={88}
                                alt={data.fullName}
                                className="w-22 h-22 rounded-full object-cover ring-4 ring-white dark:ring-gray-900 shadow-md"
                            />
                        ) : (
                            <div className="w-22 h-22 rounded-full bg-linear-to-r from-[#ec5d15] to-[#f08040] ring-4 ring-white dark:ring-gray-900 shadow-md flex items-center justify-center">
                                <span className="text-white text-3xl font-bold select-none">
                                    {initials}
                                </span>
                            </div>
                        )}
                        <span className={`absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full border-2 border-white dark:border-gray-900 ${data.student.status === "STUDYING" ? "bg-emerald-400"
                            : data.student.status === "GRADUATE" ? "bg-amber-400"
                                : "bg-gray-400"
                            }`} />
                    </div>
                    <div>
                        <h2 className="text-base font-bold text-gray-900 dark:text-white leading-tight">
                            {data.fullName}
                        </h2>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5 font-mono tracking-wide">
                            {data.student.studentCode}
                        </p>
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-1.5">
                        <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${status.className}`}>
                            {status.label}
                        </span>
                        <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-orange-50 text-[#ec5d15] ring-1 ring-orange-200 dark:bg-orange-900/20 dark:text-orange-300 dark:ring-orange-800">
                            Niên khóa {data.student.admissionYear ?? "2020"}
                        </span>
                        <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-sky-50 text-sky-500 ring-1 ring-sky-200 dark:bg-sky-900/20 dark:text-sky-300 dark:ring-sky-800 max-w-45 truncate">
                            {data.student.major.name}
                        </span>
                    </div>
                </div>
                <div className="relative mb-4">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-100 dark:border-gray-800" />
                    </div>
                    <div className="relative flex justify-center">
                        <span className="bg-white dark:bg-gray-900 px-3 text-[10px] font-semibold uppercase tracking-widest text-gray-300 dark:text-gray-600">
                            Thông tin sinh viên
                        </span>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 md:ml-20 gap-x-6">
                    <InfoRow icon={<IdCard size={18} />} label="Mã số sinh viên" value={data.student.studentCode} />
                    <InfoRow icon={<BookOpen size={18} />} label="Lớp học" value={data.student.class.name} />
                    <InfoRow icon={<GraduationCap size={18} />} label="Giảng viên đảm nhiệm" value={data.student.class.homeroomLecturer.user.fullName} />
                    <InfoRow icon={<UserRound size={18} />} label="Giới tính" value={data.gender === "MALE" ? "Nam" : "Nữ"} />
                </div>

            </div>
        </div>
    )
}