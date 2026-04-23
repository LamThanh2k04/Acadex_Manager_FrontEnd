"use client";
import { IHomeroomClass, IStudentOfHomeroomClass } from '@/types/lecturer/homeroomClass/homeroomClass.type';
import SearchBar from "../SearchBar/SearchBar";
import Pagination from '@/components/Pagination';
function getInitials(name: string) {
    return name
        .split(" ")
        .slice(-2)
        .map((w) => w[0])
        .join("")
        .toUpperCase();
}

const AVATAR_BG = [
    { bg: "#E1F5EE", text: "#085041" },
    { bg: "#E6F1FB", text: "#0C447C" },
    { bg: "#EDE9FE", text: "#3C3489" },
    { bg: "#FAEEDA", text: "#633806" },
];

function avatarColors(name: string) {
    return AVATAR_BG[name.charCodeAt(0) % AVATAR_BG.length];
}
function Avatar({ avatar, fullName, size = 38 }: { avatar: string | null; fullName: string; size?: number }) {
    const { bg, text } = avatarColors(fullName);

    if (avatar) {
        return (
            <img
                src={avatar}
                alt={fullName}
                width={size}
                height={size}
                className="rounded-full object-cover flex-shrink-0"
                style={{ width: size, height: size }}
            />
        );
    }

    return (
        <div
            className="rounded-full flex items-center justify-center flex-shrink-0 font-medium"
            style={{ width: size, height: size, backgroundColor: bg, color: text, fontSize: size * 0.28 }}
        >
            {getInitials(fullName)}
        </div>
    );
}
function LecturerCard({ data }: { data: IHomeroomClass }) {
    return (
        <div className="rounded-2xl border border-gray-200 bg-white dark:bg-gray-900 dark:border-none p-4">
            <div className="flex items-center gap-3 mb-3">
                <Avatar avatar={data.avatarLecturer} fullName={data.lecturerName} size={52} />
                <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{data.lecturerName}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{data.lecturerCode}</p>
                </div>
            </div>
            <div className="border-t border-gray-100 pt-3 space-y-2">
                <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-400 dark:text-white w-14 shrink-0">Khoa</span>
                    <span className="text-xs font-medium text-gray-700 dark:text-[#eebbc3] truncate">{data.lecturerFaculty}</span>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-400 dark:text-white w-14 shrink-0">Ngành</span>
                    <span className="text-xs font-medium text-gray-700 dark:text-[#eebbc3] truncate">{data.lecturerMajor}</span>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-400 dark:text-white w-14 shrink-0">Sĩ số</span>
                    <span
                        className="text-xs font-medium rounded-full px-2.5 py-0.5"
                        style={{ backgroundColor: "#E6F1FB", color: "#0C447C" }}
                    >
                        {data.pagination.total} sinh viên
                    </span>
                </div>
            </div>
        </div>
    );
}
function StudentCard({ student }: { student: IStudentOfHomeroomClass }) {
    return (
        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900 p-3">
            <div className="flex items-center gap-3">
                <Avatar avatar={student.user.avatar} fullName={student.user.fullName} size={40} />
                <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">{student.user.fullName}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{student.studentCode}</p>
                </div>
                <div className="shrink-0 text-right">
                    <p className="text-xs text-gray-500 truncate max-w-[90px]">{student.major.name}</p>
                </div>
            </div>
            <p className="text-xs text-gray-400 mt-2 pl-[52px] truncate">{student.user.email}</p>
        </div>
    );
}
function StudentTableRow({ student }: { student: IStudentOfHomeroomClass }) {
    return (
        <div className="grid grid-cols-[2fr_1fr_1.2fr_1.5fr] gap-3 px-4 py-3 border-b dark:hover:bg-gray-600 border-gray-100 last:border-0 items-center hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-2.5 min-w-0">
                <Avatar avatar={student.user.avatar} fullName={student.user.fullName} size={30} />
                <span className="text-sm font-medium text-gray-800 dark:text-white truncate">{student.user.fullName}</span>
            </div>
            <span className="text-sm text-gray-500 dark:text-white">{student.studentCode}</span>
            <span className="text-sm text-gray-500 truncate dark:text-white">{student.major.name}</span>
            <span className="text-xs text-gray-400 truncate dark:text-white">{student.user.email}</span>
        </div>
    );
}
interface IHomeroomClassProps {
    data: IHomeroomClass;
}

export default function HomeroomClass({ data }: IHomeroomClassProps) {
    const students = data.students ?? [];
    return (
        <div className="w-full space-y-4 mt-5 p-3 md:p-5 ">
            <LecturerCard data={data} />
            <SearchBar />
            <div className="flex flex-col gap-2.5 md:hidden">
                {students.length === 0 ? (
                    <p className="text-center text-sm text-gray-400 py-8">Không tìm thấy sinh viên</p>
                ) : (
                    students.map((s) => <StudentCard key={s.studentCode} student={s} />)
                )}
            </div>
            <div className="hidden md:block rounded-2xl border border-gray-200 bg-white dark:bg-gray-900 overflow-hidden">
                <div className="grid grid-cols-[2fr_1fr_1.2fr_1.5fr] gap-3 px-4 py-2.5 bg-gray-50 border-b dark:bg-gray-900 border-gray-100">
                    {["Họ tên", "MSSV", "Ngành", "Email"].map((h) => (
                        <span key={h} className="text-xs font-medium text-gray-500 dark:text-[#eebbc3]">{h}</span>
                    ))}
                </div>
                {students.length === 0 ? (
                    <p className="text-center text-sm text-gray-400 py-10">Không tìm thấy sinh viên</p>
                ) : (
                    students.map((s) => <StudentTableRow key={s.studentCode} student={s} />)
                )}
            </div>
            <Pagination pagination={data.pagination} />
        </div>
    );
}