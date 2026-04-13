"use client";

import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid,
    ReferenceLine, Cell, Tooltip,
    BarChart as HorizontalBarChart,
} from "recharts";
import { ChartContainer, type ChartConfig } from "@/components/ui/chart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
interface IAvgGradeItem {
    className: string;
    avgScore: number;
}

interface ICourseSectionSimple {
    id: number;
    sectionCode: string;
    subject: { id: number; name: string };
}

interface IAvgGradeClassProps {
    data: IAvgGradeItem[];
    courseSection: ICourseSectionSimple[];
    selectedId: number | null;
    onSelectId: (id: number | null) => void;
}

// ─── helpers ─────────────────────────────────────────────────────────────────

const scoreColor = (s: number) => s >= 8 ? "#1D9E75" : s >= 6.5 ? "#378ADD" : "#E24B4A";
const scoreDark = (s: number) => s >= 8 ? "#0F6E56" : s >= 6.5 ? "#185FA5" : "#A32D2D";

const chartConfig: ChartConfig = { avgScore: { label: "Điểm TB" } };

const LEGEND = [
    { color: "#1D9E75", label: "Giỏi ≥ 8.0" },
    { color: "#378ADD", label: "Khá ≥ 6.5" },
    { color: "#E24B4A", label: "TB < 6.5" },
    { color: "#BA7517", label: "TB học phần", dashed: true },
];

// ─── sub-components ───────────────────────────────────────────────────────────

function StatCard({ label, value, sub }: { label: string; value: string; sub: string }) {
    return (
        <div className="rounded-xl bg-muted/50 p-3">
            <p className="text-[11px] text-muted-foreground mb-1">{label}</p>
            <p className="text-lg font-medium">{value}</p>
            <p className="text-[11px] text-muted-foreground mt-0.5">{sub}</p>
        </div>
    );
}

function CustomTooltip({ active, payload }: any) {
    if (!active || !payload?.length) return null;
    const { className, avgScore } = payload[0].payload;
    return (
        <div className="rounded-xl border bg-background px-3 py-2 text-sm shadow-sm">
            <p className="font-medium">{className}</p>
            <p className="text-muted-foreground">
                Điểm TB:{" "}
                <span className="font-medium text-foreground">
                    {Number(avgScore).toFixed(1)}
                </span>
            </p>
        </div>
    );
}

function Legend() {
    return (
        <div className="flex gap-3 flex-wrap pt-3 border-t">
            {LEGEND.map(({ color, label, dashed }) => (
                <div key={label} className="flex items-center gap-1.5">
                    {dashed ? (
                        <div style={{ width: 16, height: 0, borderBottom: `1.5px dashed ${color}` }} />
                    ) : (
                        <div style={{ width: 8, height: 8, borderRadius: 2, background: color }} />
                    )}
                    <span className="text-[11px] text-muted-foreground">{label}</span>
                </div>
            ))}
        </div>
    );
}

// ─── mobile: horizontal bar (tự render, không dùng recharts để tránh overflow) ──

function HorizontalBars({ data, avg }: { data: IAvgGradeItem[]; avg: number }) {
    const max = 10;
    return (
        <div className="flex flex-col gap-2.5">
            {data.map((item) => (
                <div key={item.className} className="flex items-center gap-2">
                    <span className="text-[11px] text-muted-foreground w-16 shrink-0 text-right truncate">
                        {item.className}
                    </span>
                    <div className="flex-1 bg-muted rounded-full h-3.5 overflow-hidden">
                        <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{
                                width: `${(item.avgScore / max) * 100}%`,
                                background: scoreColor(item.avgScore),
                            }}
                        />
                    </div>
                    <span
                        className="text-[11px] font-medium w-6 text-right shrink-0"
                        style={{ color: scoreDark(item.avgScore) }}
                    >
                        {item.avgScore.toFixed(1)}
                    </span>
                </div>
            ))}
            {/* avg reference */}
            <div className="flex items-center gap-2 mt-1">
                <span className="w-16 shrink-0" />
                <div className="flex-1 flex items-center gap-1">
                    <div
                        className="flex-1 border-t border-dashed"
                        style={{ borderColor: "#BA7517", marginLeft: `${(avg / max) * 100}%` }}
                    />
                </div>
                <span className="text-[10px] text-amber-600 w-6 text-right shrink-0">
                    {avg.toFixed(1)}
                </span>
            </div>
            <p className="text-[10px] text-amber-600 text-right">— TB học phần</p>
        </div>
    );
}

// ─── desktop: recharts vertical bar ──────────────────────────────────────────

function VerticalBars({ data, avg }: { data: IAvgGradeItem[]; avg: number }) {
    const h = Math.max(data.length * 52, 240);
    return (
        <ChartContainer config={chartConfig} style={{ height: h }}>
            <BarChart data={data} margin={{ top: 8, right: 8, left: -8, bottom: 0 }}>
                <CartesianGrid vertical={false} strokeOpacity={0.3} />
                <XAxis
                    dataKey="className"
                    tick={{ fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                />
                <YAxis
                    domain={[0, 10]}
                    ticks={[0, 2, 4, 6, 8, 10]}
                    tick={{ fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ radius: 6 }} />
                <ReferenceLine
                    y={parseFloat(avg.toFixed(2))}
                    stroke="#BA7517"
                    strokeDasharray="5 4"
                    strokeWidth={1.5}
                    label={{
                        value: `TB ${avg.toFixed(1)}`,
                        position: "insideTopRight",
                        fontSize: 11,
                        fill: "#BA7517",
                    }}
                />
                <Bar dataKey="avgScore" radius={[6, 6, 0, 0]} maxBarSize={48}>
                    {data.map((entry, i) => (
                        <Cell key={i} fill={scoreColor(entry.avgScore)} />
                    ))}
                </Bar>
            </BarChart>
        </ChartContainer>
    );
}
export default function AvgGradeClass({
    data,
    courseSection,
    selectedId,
    onSelectId,
}: IAvgGradeClassProps) {
    if (!data || data.length === 0) {
        return (
            <div className="rounded-2xl border bg-card p-4 md:p-5 space-y-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                        <p className="text-sm font-medium">Điểm trung bình theo lớp</p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                            So sánh điểm TB giữa các lớp trong học phần
                        </p>
                    </div>
                    <Select
                        value={selectedId ? String(selectedId) : undefined}
                        onValueChange={(val) => onSelectId(Number(val))}
                    >
                        <SelectTrigger className="w-30 h-8 text-xs rounded-lg border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 focus:ring-1 focus:ring-[#ec5d15]/40">
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
                <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-gray-200 bg-gray-50 py-12 text-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-gray-400">
                            <path d="M9 17H15M9 13H15M9 9H11M13 3H8C7.44772 3 7 3.44772 7 4V20C7 20.5523 7.44772 21 8 21H16C16.5523 21 17 20.5523 17 20V7L13 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-600">Chưa có dữ liệu điểm</p>
                        <p className="mt-0.5 text-xs text-gray-400">Học phần này chưa có thống kê điểm trung bình</p>
                    </div>
                </div>
            </div>
        );
    }

    const scores = data.map((d) => d.avgScore);
    const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
    const maxItem = data.reduce((a, b) => (a.avgScore > b.avgScore ? a : b));
    const minItem = data.reduce((a, b) => (a.avgScore < b.avgScore ? a : b));

    return (
        <div className="rounded-2xl border bg-card p-4 md:p-5 space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <p className="text-sm font-medium">Điểm trung bình theo lớp</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                        So sánh điểm TB giữa các lớp trong học phần
                    </p>
                </div>
                <Select
                    value={selectedId ? String(selectedId) : undefined}
                    onValueChange={(val) => onSelectId(Number(val))}
                >
                    <SelectTrigger className="w-30 h-8 text-xs rounded-lg border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 focus:ring-1 focus:ring-[#ec5d15]/40">
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
                {/* <select
                    value={selectedId ?? ""}
                    onChange={(e) => {
                        const val = e.target.value;
                        onSelectId(val === "" ? null : Number(val));
                    }}
                    className="w-full sm:w-auto text-sm rounded-xl border bg-muted/50 px-3 py-2 outline-none focus:ring-2 focus:ring-ring"
                >
                    <option value="">Tất cả học phần</option>
                    {courseSection.map((s) => (
                        <option key={s.id} value={s.id}>
                            {s.subject.name} — {s.sectionCode}
                        </option>
                    ))}
                </select> */}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
                <StatCard
                    label="Cao nhất"
                    value={maxItem.avgScore.toFixed(1)}
                    sub={maxItem.className}
                />
                <StatCard
                    label="Thấp nhất"
                    value={minItem.avgScore.toFixed(1)}
                    sub={minItem.className}
                />
                <div className="col-span-2 md:col-span-1">
                    <StatCard
                        label="TB toàn học phần"
                        value={avg.toFixed(1)}
                        sub={`${data.length} lớp`}
                    />
                </div>
            </div>
            <div className="block md:hidden">
                <HorizontalBars data={data} avg={avg} />
            </div>
            <div className="hidden md:block">
                <VerticalBars data={data} avg={avg} />
            </div>

            <Legend />
        </div>
    );
}