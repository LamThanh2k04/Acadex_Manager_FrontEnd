"use client"
import { ITotalScoreForChartProps } from '@/types/student/dashboard.type'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts'
import { BarChart2 } from 'lucide-react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import CustomTooltip from '@/components/CustomTooltip'
import CustomLegend from '@/components/CustomLegend'
export default function TotalScoreForChart({ data, semesters, selectedSemesterId, onChangeSemester, }: ITotalScoreForChartProps) {
    const selectedSemester = semesters.find((s) => s.id === selectedSemesterId)
    const avgScore = data.length
        ? (data.reduce((s, d) => s + d.totalScore, 0) / data.length).toFixed(1)
        : "—"
    const avgClass = data.length
        ? (data.reduce((s, d) => s + d.classAverage, 0) / data.length).toFixed(1)
        : "—"
    const chartData = data.map((d) => ({
        ...d,
        shortName: d.subject.length > 14 ? d.subject.slice(0, 13) + "…" : d.subject,
    }))
    const scoreBadgeClass = (score: number) => {
        if (score >= 8.5) return "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400"
        if (score >= 7) return "bg-sky-50 text-sky-500 dark:bg-sky-900/20 dark:text-sky-400"
        if (score >= 5) return "bg-amber-50 text-amber-500 dark:bg-amber-900/20 dark:text-amber-400"
        return "bg-red-50 text-red-500 dark:bg-red-900/20 dark:text-red-400"
    }
    return (
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden mt-5">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center">
                        <BarChart2 size={15} className="text-[#ec5d15]" />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-gray-800 dark:text-gray-100 leading-tight">
                            Kết quả học tập
                        </h3>
                        <p className="text-[11px] text-gray-400 dark:text-gray-500 leading-tight">
                            {selectedSemester
                                ? `${selectedSemester.name} — ${selectedSemester.academicYear}`
                                : "Chọn học kỳ"}
                        </p>
                    </div>
                </div>
                <Select
                    value={selectedSemesterId ? String(selectedSemesterId) : undefined}
                    onValueChange={(val) => onChangeSemester(Number(val))}
                >
                    <SelectTrigger className="w-30 h-8 text-xs rounded-lg border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 focus:ring-1 focus:ring-[#ec5d15]/40">
                        <SelectValue placeholder="Chọn học kỳ" />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-gray-900 dark:border-gray-700">
                        {semesters.map((sem) => (
                            <SelectItem
                                key={sem.id}
                                value={String(sem.id)}
                                className="text-xs cursor-pointer focus:bg-orange-50 focus:text-[#ec5d15] dark:focus:bg-orange-900/20"
                            >
                                {sem.name} — {sem.academicYear}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className="grid grid-cols-2 gap-3 px-5 pt-4">
                <div className="bg-gray-50 dark:bg-gray-800/60 rounded-xl px-4 py-3">
                    <p className="text-[10px] font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500 mb-0.5">
                        TB của bạn
                    </p>
                    <p className="text-xl font-bold text-[#ec5d15]">{avgScore}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800/60 rounded-xl px-4 py-3">
                    <p className="text-[10px] font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500 mb-0.5">
                        TB lớp học
                    </p>
                    <p className="text-xl font-bold text-sky-500 dark:text-sky-400">{avgClass}</p>
                </div>
            </div>
            <div className="px-5 pt-4 pb-2">
                {data.length === 0 ? (
                    <div className="flex flex-col items-center justify-center gap-2 py-12">
                        <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                            <BarChart2 size={18} className="text-gray-300 dark:text-gray-600" />
                        </div>
                        <p className="text-xs md:text-[14px] text-gray-400 dark:text-gray-500">
                            Chưa có dữ liệu điểm học kỳ này
                        </p>
                    </div>
                ) : (
                    <ResponsiveContainer width="100%" height={240}>
                        <BarChart
                            data={chartData}
                            margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
                            barGap={4}
                            barCategoryGap="32%"
                        >
                            <CartesianGrid
                                vertical={false}
                                stroke="currentColor"
                                strokeOpacity={0.06}
                                strokeDasharray="4 4"
                            />
                            <XAxis
                                dataKey="shortName"
                                tick={{ fontSize: 10, fill: "#9ca3af" }}
                                axisLine={false}
                                tickLine={false}
                                interval={0}
                            />
                            <YAxis
                                domain={[0, 10]}
                                ticks={[0, 2, 4, 6, 8, 10]}
                                tick={{ fontSize: 10, fill: "#9ca3af" }}
                                axisLine={false}
                                tickLine={false}
                            />
                            <Tooltip
                                content={<CustomTooltip />}
                                cursor={{ fill: "currentColor", fillOpacity: 0.04 }}
                            />
                            <Legend content={<CustomLegend />} />
                            <Bar
                                dataKey="totalScore"
                                name="Điểm của bạn"
                                fill="#ec5d15"
                                radius={[6, 6, 0, 0]}
                                maxBarSize={36}
                            >
                                {chartData.map((entry, index) => (
                                    <Cell
                                        key={index}
                                        fill={entry.totalScore >= 5 ? "#ec5d15" : "#fca5a5"}
                                        fillOpacity={0.9}
                                    />
                                ))}
                            </Bar>
                            <Bar
                                dataKey="classAverage"
                                name="TB lớp học"
                                fill="#38bdf8"
                                fillOpacity={0.7}
                                radius={[6, 6, 0, 0]}
                                maxBarSize={36}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                )}
            </div>
            {data.length > 0 && (
                <div className="px-5 pb-4">
                    <div className="border-t border-gray-100 dark:border-gray-800 pt-3 space-y-2">
                        {data.map((item) => (
                            <div
                                key={item.subject}
                                className="flex items-center justify-between gap-3 group"
                            >
                                <p className="text-xs text-gray-600 dark:text-gray-400 truncate flex-1 group-hover:text-[#ec5d15] transition-colors">
                                    {item.subject}
                                </p>

                                <div className="flex items-center gap-2 shrink-0">
                                    <div className="w-20 h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden hidden sm:block">
                                        <div
                                            className="h-full rounded-full bg-[#ec5d15] transition-all duration-500"
                                            style={{ width: `${(item.totalScore / 10) * 100}%` }}
                                        />
                                    </div>
                                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${scoreBadgeClass(item.totalScore)}`}>
                                        {item.totalScore}
                                    </span>
                                    <span className="text-[11px] text-gray-400 dark:text-gray-500 w-16 text-right hidden xs:block">
                                        TB: {item.classAverage}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
