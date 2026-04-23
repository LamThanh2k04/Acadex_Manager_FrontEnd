export default function StatusBadge({ enrollmentStatus, isPassed }: { enrollmentStatus: string; isPassed: boolean | null }) {
    if (isPassed === true) return (
        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400">
            Đã qua
        </span>
    )
    if (enrollmentStatus === "REGISTERED") return (
        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400">
            Đã đăng ký
        </span>
    )
    return (
        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500">
            Chưa học
        </span>
    )
}