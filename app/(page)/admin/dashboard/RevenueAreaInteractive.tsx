"use client"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { IRevenueAreaProps } from "@/app/types/admin.type"

const chartConfig = {
  total: {
    color: "#ec5d15",
  }
} satisfies ChartConfig
export function RevenueAreaInteractive({ data, year, setYear }: IRevenueAreaProps) {
  return (
    <Card className="border-none shadow-none bg-transparent sm:bg-card sm:shadow-sm sm:border">
      <CardHeader className="flex flex-col items-start gap-4 space-y-0 border-b py-5 sm:flex-row sm:items-center">
        <div className="grid flex-1 gap-1 text-left">
          <CardDescription>
            Thống kê doanh thu chi tiết theo từng tháng của năm {year}
          </CardDescription>
        </div>
        <Select value={year.toString()} onValueChange={(v) => setYear(Number(v))}>
          <SelectTrigger className="w-full sm:w-40 rounded-lg" aria-label="Chọn năm">
            <SelectValue placeholder="Chọn năm" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="2026" className="rounded-lg">Năm 2026</SelectItem>
            <SelectItem value="2025" className="rounded-lg">Năm 2025</SelectItem>
            <SelectItem value="2024" className="rounded-lg">Năm 2024</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent className="pl-2 pr-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-62.5 sm:h-87.5 w-full"
        >
          <AreaChart
            data={data}
            margin={{ left: 0, right: 12, top: 12, bottom: 0 }}
          >
            <defs>
              <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-total)" stopOpacity={0.4} />
                <stop offset="95%" stopColor="var(--color-total)" stopOpacity={0.1} />
              </linearGradient>
            </defs>

            <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.5} />

            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={12}
              minTickGap={20}
              tickFormatter={(value) => value?.toString().replace("Tháng ", "T") || ""}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={12}
              width={80}
              tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
            />

            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => `Tháng: ${value}`}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="total"
              type="monotone"
              fill="url(#fillRevenue)"
              stroke="var(--color-total)"
              strokeWidth={2}
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}