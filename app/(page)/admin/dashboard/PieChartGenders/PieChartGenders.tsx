"use client"
import { PieChart, Pie, Cell } from "recharts"
import { ChartContainer } from "@/components/ui/chart"
import { IPieChartGendersProps } from "@/app/types/admin/overview.type"
import { Mars, Venus } from 'lucide-react';
const chartConfig = {
    male: { color: "#A8D8EA" },
    female: { color: "#F5D06E" },
};
export default function PieChartGenders({ data, role, setRole }: IPieChartGendersProps) {
    const malePercent = Math.round((Number(data.males) / data.total) * 100)
    const femalePercent = 100 - malePercent
    const outerData = [
        { name: "Male", value: malePercent },
        { name: "Empty", value: 100 - malePercent },
    ]
    const innerData = [
        { name: "Female", value: femalePercent },
        { name: "Empty", value: 100 - femalePercent },
    ]
    const label = role === "LECTURER" ? "Giảng viên" : "Sinh viên"
    const maleName = role === "LECTURER" ? "Nam" : "Nam"
    const femaleName = role === "LECTURER" ? "Nữ" : "Nữ"
    return (
        <div>
            <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg md:text-sm md:mr-6 font-semibold text-gray-400 mr-2">{label}</h2>
                <div className="flex gap-2">
                    <button
                        onClick={() => setRole("STUDENT")}
                        className={`text-xs px-3 py-1 rounded-full md:rounded-sm border transition
                            ${role === "STUDENT"
                                ? "bg-orange-100 border-orange-300 text-orange-600 font-medium"
                                : "border-gray-200 text-gray-400"
                            }`}
                    >
                        Sinh viên
                    </button>
                    <button
                        onClick={() => setRole("LECTURER")}
                        className={`text-xs px-3 py-1 rounded-full md:rounded-sm border transition
                            ${role === "LECTURER"
                                ? "bg-orange-100 border-orange-300 text-orange-600 font-medium"
                                : "border-gray-200 text-gray-400"
                            }`}
                    >
                        Giảng viên
                    </button>
                </div>
            </div>
            <div className="relative flex justify-center">
                <ChartContainer config={chartConfig} className="h-55 w-55">
                    <PieChart>
                        <Pie
                            data={outerData}
                            cx="50%" cy="50%"
                            innerRadius={68} outerRadius={90}
                            startAngle={90} endAngle={-270}
                            dataKey="value"
                            strokeWidth={0}
                        >
                            <Cell fill="#A8D8EA" />
                            <Cell fill="#f0f0f0" />
                        </Pie>
                        <Pie
                            data={innerData}
                            cx="50%" cy="50%"
                            innerRadius={42} outerRadius={62}
                            startAngle={90} endAngle={-270}
                            dataKey="value"
                            strokeWidth={0}
                        >
                            <Cell fill="#F5D06E" />
                            <Cell fill="#f0f0f0" />
                        </Pie>
                    </PieChart>
                </ChartContainer>
                <div className="absolute inset-0 flex items-center justify-center gap-1">
                    <span className="text-[#A8D8EA] text-3xl"><Mars /></span>
                    <span className="text-[#F5D06E] text-3xl"><Venus /></span>
                </div>
            </div>
            <div className="flex justify-around w-full mt-6">
                <div className="flex flex-col gap-1">
                    <div className="w-3 h-3 rounded-full bg-[#A8D8EA]" />
                    <p className="text-2xl font-bold">
                        {data.males.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-400">
                        {maleName} ({malePercent}%)
                    </p>
                </div>
                <div className="flex flex-col gap-1">
                    <div className="w-3 h-3 rounded-full bg-[#F5D06E]" />
                    <p className="text-2xl font-bold">
                        {data.females.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-400">
                        {femaleName} ({femalePercent}%)
                    </p>
                </div>
            </div>
        </div>
    )
}