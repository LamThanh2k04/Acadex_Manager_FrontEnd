"use client";

import { ITopStudent } from "@/types/lecturer/dashboard/topStudent.type";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ICourseSectionSimple {
    id: number;
    sectionCode: string;
    subject: { id: number; name: string };
}

interface ITopStudentProps {
    data: ITopStudent[];
    courseSection: ICourseSectionSimple[];
    selectedId: number | null;
    onSelectId: (id: number | null) => void;
}
function getInitials(name: string) {
    return name.split(" ").slice(-2).map((w) => w[0]).join("").toUpperCase();
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

function scoreColor(score: number) {
    if (score >= 8) return "#1D9E75";
    if (score >= 6.5) return "#378ADD";
    return "#E24B4A";
}
function Avatar({ avatar, fullName, size = 36 }: { avatar: string | null; fullName: string; size?: number }) {
    const { bg, text } = avatarColors(fullName);
    if (avatar) {
        return (
            <img
                src={avatar}
                alt={fullName}
                style={{ width: size, height: size }}
                className="rounded-full object-cover flex-shrink-0"
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

function CardHeader({ courseSection, selectedId, onSelectId }: Pick<ITopStudentProps, "courseSection" | "selectedId" | "onSelectId">) {
    return (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between mb-4">
            <div>
                <p className="text-sm font-medium">Top sinh viên điểm cao</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                    5 sinh viên có điểm cao nhất học phần
                </p>
            </div>
            <Select
                value={selectedId ? String(selectedId) : undefined}
                onValueChange={(val) => onSelectId(Number(val))}
            >
                <SelectTrigger className="w-30 h-8 text-xs rounded-lg border-gray-200 dark:bg-gray-800 dark:text-gray-300 focus:ring-1 focus:ring-[#ec5d15]/40">
                    <SelectValue placeholder="Chọn môn học" />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-900 dark:border-gray-700">
                    {courseSection.map((c) => (
                        <SelectItem
                            key={c.id}
                            value={String(c.id)}
                            className="text-xs cursor-pointer focus:bg-orange-50 focus:text-[#ec5d15] dark:focus:bg-orange-900/20"
                        >
                            {c.subject.name} — {c.sectionCode}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}
function RankOneCard({ item }: { item: ITopStudent }) {
    const score = item.grades?.totalScore ?? null;

    return (
        <div className="rounded-xl p-3 mb-3 flex items-center gap-3" style={{ backgroundColor: "#FAEEDA" }}>
            <div
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-medium"
                style={{ backgroundColor: "#EF9F27", color: "#412402" }}
            >
                1
            </div>

            <Avatar avatar={item.student.user.avatar} fullName={item.student.user.fullName} size={40} />

            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate" style={{ color: "#412402" }}>{item.student.user.fullName}</p>
                <p className="text-[11px] mt-0.5" style={{ color: "#854F0B" }}>{item.student.studentCode}</p>
            </div>
            {score !== null ? (
                <>
                    <div className="flex flex-col items-end sm:hidden flex-shrink-0">
                        <span className="text-xl font-medium" style={{ color: "#412402" }}>
                            {score.toFixed(1)}
                        </span>
                        <span className="text-[10px]" style={{ color: "#854F0B" }}>điểm</span>
                    </div>
                    <div className="hidden sm:block w-28 flex-shrink-0">
                        <div className="flex justify-between mb-1">
                            <span className="text-[10px]" style={{ color: "#854F0B" }}>Điểm TB</span>
                            <span className="text-[11px] font-medium" style={{ color: "#412402" }}>
                                {score.toFixed(1)} / 10
                            </span>
                        </div>
                        <div className="h-1.5 rounded-full" style={{ backgroundColor: "#EF9F2740" }}>
                            <div
                                className="h-full rounded-full"
                                style={{ width: `${(score / 10) * 100}%`, backgroundColor: "#EF9F27" }}
                            />
                        </div>
                    </div>
                </>
            ) : (
                <span
                    className="text-[11px] px-2.5 py-0.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: "#D3D1C7", color: "#444441" }}
                >
                    Chưa có điểm
                </span>
            )}
        </div>
    );
}
function RankRow({ item, rank }: { item: ITopStudent; rank: number }) {
    const score = item.grades?.totalScore ?? null;
    return (
        <div className="flex items-center gap-3 py-2.5 border-b border-border last:border-0">
            <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                <span className="text-[11px] text-muted-foreground">{rank}</span>
            </div>

            <Avatar avatar={item.student.user.avatar} fullName={item.student.user.fullName} size={score !== null ? 34 : 34} />

            <div className="flex-1 min-w-0">
                <p className={`text-[13px] font-medium truncate ${score === null ? "text-muted-foreground" : ""}`}>
                    {item.student.user.fullName}
                </p>
                <p className="text-[10px] text-muted-foreground mt-0.5">{item.student.studentCode}</p>
            </div>

            {score !== null ? (
                <>
                    <span
                        className="text-sm font-medium flex-shrink-0 sm:hidden"
                        style={{ color: scoreColor(score) }}
                    >
                        {score.toFixed(1)}
                    </span>
                    <div className="hidden sm:block w-28 flex-shrink-0">
                        <div className="flex justify-end mb-1">
                            <span className="text-[11px] font-medium" style={{ color: scoreColor(score) }}>
                                {score.toFixed(1)}
                            </span>
                        </div>
                        <div className="h-1 rounded-full bg-muted">
                            <div
                                className="h-full rounded-full"
                                style={{
                                    width: `${(score / 10) * 100}%`,
                                    backgroundColor: scoreColor(score),
                                }}
                            />
                        </div>
                    </div>
                </>
            ) : (
                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-muted text-muted-foreground flex-shrink-0">
                    Chưa có điểm
                </span>
            )}
        </div>
    );
}
export default function TopStudent({ data, courseSection, selectedId, onSelectId }: ITopStudentProps) {
    if (!data || data.length === 0) {
        return (
            <div className="rounded-2xl border bg-card p-4 md:p-5 space-y-4 dark:bg-gray-900">
                <CardHeader courseSection={courseSection} selectedId={selectedId} onSelectId={onSelectId} />
                <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-gray-200 bg-gray-50 dark:bg-gray-900 duration-300 transition-colors py-12 text-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-gray-400">
                            <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 12 12 15Z" stroke="currentColor" strokeWidth="1.5" />
                            <path d="M12 4L14.5 9H19.5L15.5 12.5L17 17.5L12 14.5L7 17.5L8.5 12.5L4.5 9H9.5L12 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-600">Chưa có dữ liệu</p>
                        <p className="mt-0.5 text-xs text-gray-400">Học phần này chưa có sinh viên nào được xếp hạng</p>
                    </div>
                </div>
            </div>
        );
    }

    const [first, ...rest] = data;
    return (
        <div className="rounded-2xl border bg-card p-4 md:p-5 dark:bg-gray-900 duration-300 transition-colors">
            <CardHeader courseSection={courseSection} selectedId={selectedId} onSelectId={onSelectId} />
            <RankOneCard item={first} />
            <div>
                {rest.map((item, index) => (
                    <RankRow key={item.student.studentCode + index} item={item} rank={index + 2} />
                ))}
            </div>
        </div>
    );
}