"use client"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { IPassFailBarChart } from "@/types/admin/overview.type"
export default function BarChartPassFail({ data }: { data: IPassFailBarChart }) {
    const passPercent = data.total > 0
        ? Math.round((data.passed / data.total) * 100)
        : 0
    const failPercent = 100 - passPercent
    return (
        <Card className="border border-orange-100 shadow-sm">
            <CardHeader>
                <CardTitle className="text-lg text-gray-400 font-semibold">Kết quả học tập</CardTitle>
                <CardDescription>Thống kê tỉ lệ sinh viên đạt / không đạt</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
                <div className="grid grid-cols-3 gap-3">
                    <div className="flex flex-col items-center p-3 bg-orange-50 rounded-xl">
                        <span className="text-2xl font-bold text-orange-500">{data.total}</span>
                        <span className="text-xs text-gray-400 mt-1">Tổng</span>
                    </div>
                    <div className="flex flex-col items-center p-3 bg-green-50 rounded-xl">
                        <span className="text-2xl font-bold text-green-500">{data.passed}</span>
                        <span className="text-xs text-gray-400 mt-1">Đạt</span>
                    </div>
                    <div className="flex flex-col items-center p-3 bg-red-50 rounded-xl">
                        <span className="text-2xl font-bold text-red-400">{data.failed}</span>
                        <span className="text-xs text-gray-400 mt-1">Không đạt</span>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="flex justify-between text-xs text-gray-400">
                        <span>Đạt {passPercent}%</span>
                        <span>Không đạt {failPercent}%</span>
                    </div>
                    <div className="flex h-3 rounded-full overflow-hidden">
                        <div
                            className="bg-green-400 transition-all duration-500"
                            style={{ width: `${passPercent}%` }}
                        />
                        <div
                            className="bg-red-400 transition-all duration-500"
                            style={{ width: `${failPercent}%` }}
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}