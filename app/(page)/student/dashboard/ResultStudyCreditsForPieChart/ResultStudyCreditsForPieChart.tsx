"use client"
import { IResultStudyCreditsForPieChartProps } from '@/app/types/student/dashboard.type'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import { GraduationCap } from 'lucide-react'
import CustomTooltip from './CustomTooltip'
export default function CreditProgressChart({ data }: IResultStudyCreditsForPieChartProps) {
    const { creditsIsStudy, totalRequiredCredits } = data
    const remaining = totalRequiredCredits - creditsIsStudy
    const percent = Math.round((creditsIsStudy / totalRequiredCredits) * 100)
    const chartData = [
        { name: "Đã tích lũy", value: creditsIsStudy, fill: "#ec5d15" },
        { name: "Còn lại", value: remaining, fill: "#f3f4f6" },
    ]
    const milestones = [
        { label: "25%", at: 0.25, credits: Math.round(totalRequiredCredits * 0.25) },
        { label: "50%", at: 0.50, credits: Math.round(totalRequiredCredits * 0.50) },
        { label: "75%", at: 0.75, credits: Math.round(totalRequiredCredits * 0.75) },
        { label: "100%", at: 1.00, credits: totalRequiredCredits },
    ]
    const progressColor =
        percent >= 75 ? "bg-emerald-500" :
            percent >= 50 ? "bg-sky-500" :
                percent >= 25 ? "bg-amber-500" : "bg-[#ec5d15]"
    return (
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden mt-5">
            <div className="flex items-center gap-2.5 px-5 py-4 border-b border-gray-100 dark:border-gray-800">
                <div className="w-8 h-8 rounded-lg bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center">
                    <GraduationCap size={15} className="text-[#ec5d15]" />
                </div>
                <div>
                    <h3 className="text-sm font-bold text-gray-800 dark:text-gray-100 leading-tight">
                        Tiến độ tín chỉ
                    </h3>
                    <p className="text-[11px] text-gray-400 dark:text-gray-500 leading-tight">
                        Chương trình đào tạo
                    </p>
                </div>
            </div>

            <div className="px-5 pt-4 pb-5">
                <div className="relative flex items-center justify-center">
                    <ResponsiveContainer width="100%" height={180}>
                        <PieChart>
                            <Pie
                                data={chartData}
                                cx="50%"
                                cy="50%"
                                innerRadius={62}
                                outerRadius={82}
                                startAngle={90}
                                endAngle={-270}
                                paddingAngle={creditsIsStudy > 0 ? 3 : 0}
                                dataKey="value"
                                strokeWidth={0}
                            >
                                {chartData.map((entry, index) => (
                                    <Cell
                                        key={index}
                                        fill={entry.fill}
                                        className={index === 1 ? "dark:fill-gray-800" : ""}
                                    />
                                ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <span className="text-2xl font-bold text-gray-900 dark:text-white leading-none">
                            {creditsIsStudy}
                        </span>
                        <span className="text-[10px] text-gray-400 dark:text-gray-500 mt-0.5">
                            / {totalRequiredCredits} TÍN CHỈ
                        </span>
                        <span className="text-xs font-semibold text-[#ec5d15] mt-1">
                            {percent}%
                        </span>
                    </div>
                </div>
                <div className="mt-1">
                    <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                        <div
                            className={`h-full rounded-full transition-all duration-700 ${progressColor}`}
                            style={{ width: `${percent}%` }}
                        />
                    </div>
                    <div className="relative mt-1.5 h-3">
                        {milestones.map((m) => (
                            <span
                                key={m.label}
                                className="absolute text-[9px] text-gray-300 dark:text-gray-700 -translate-x-1/2"
                                style={{ left: `${m.at * 100}%` }}
                            >
                                {m.label}
                            </span>
                        ))}
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-4">
                    <div className="bg-orange-50 md:flex md:items-center md:justify-center md:flex-col dark:bg-orange-900/20 rounded-xl px-4 py-3">
                        <p className="text-[10px] md:text-[14px] font-medium uppercase tracking-wide text-orange-400 dark:text-orange-700 mb-0.5">
                            Đã tích lũy
                        </p>
                        <p className="text-xl font-bold text-[#ec5d15] leading-none">
                            {creditsIsStudy}
                            <span className="text-xs font-medium ml-1 opacity-60">TÍN CHỈ</span>
                        </p>
                    </div>
                    <div className="bg-gray-50 md:flex md:items-center md:justify-center md:flex-col dark:bg-gray-800/60 rounded-xl px-4 py-3">
                        <p className="text-[10px] md:text-[14px] font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500 mb-0.5">
                            Còn lại
                        </p>
                        <p className="text-xl font-bold text-gray-700 dark:text-gray-300 leading-none">
                            {remaining}
                            <span className="text-xs font-medium ml-1 opacity-60">TÍN CHỈ</span>
                        </p>
                    </div>
                </div>
                <p className="mt-3 text-center text-[11px] md:text-[14px] text-gray-400 dark:text-gray-600 leading-relaxed">
                    {percent >= 100
                        ? "Bạn đã hoàn thành chương trình đào tạo!"
                        : percent >= 75
                            ? `Sắp hoàn thành! Còn ${remaining} tín chỉ nữa thôi.`
                            : percent >= 50
                                ? `Đã qua nửa chặng đường. Cố lên!`
                                : `Bạn đã hoàn thành ${percent}% chương trình đào tạo.`
                    }
                </p>
            </div>
        </div>
    )
}
