import { adminService } from "@/app/api/adminService"
import { IRevenueChart } from "@/app/types/admin.type"
import { useQuery } from "@tanstack/react-query"

export const useRevenueChart = (year: number) => {

    return useQuery<IRevenueChart[]>({
        queryKey: ['revenue-chart', year],
        queryFn: () => adminService.getRevenueChart(year)
    });
};