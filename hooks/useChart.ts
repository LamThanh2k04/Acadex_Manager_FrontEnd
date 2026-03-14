import { adminService } from "@/app/api/adminService"
import { IPassFailBarChart, IPieChartGenders, IRevenueChart } from "@/app/types/admin.type"
import { useQuery } from "@tanstack/react-query"

export const useRevenueChart = (year: number) => {

    return useQuery<IRevenueChart[]>({
        queryKey: ['revenue-chart', year],
        queryFn: () => adminService.getRevenueChart(year),
        staleTime: 5 * 60 * 1000,
    });
};
export const usePieChartGenders = (role: string) => {
    return useQuery<IPieChartGenders>({
        queryKey: ['pie-chart-genders', role],
        queryFn: () => adminService.getPieChartGenders(role),
        staleTime: 5 * 60 * 1000,
    });
};
export const usePassFailBarChart = () => {
    return useQuery<IPassFailBarChart>({
        queryKey: ["bar-chart-passfail"],
        queryFn: () => adminService.getPassFailBarChart(),
        staleTime: 5 * 60 * 1000,
    })
}
