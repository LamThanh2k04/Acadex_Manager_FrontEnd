import { adminService } from "@/app/api/adminService"
import { IAdminOverview } from "@/app/types/admin.type"
import { useQuery } from "@tanstack/react-query"

export const useOverView = () => {
    return useQuery<IAdminOverview>({
        queryKey: ["admin-overview"],
        queryFn: () => adminService.getOverView(),
        staleTime: 5 * 60 * 100, // 5 phút làm mới api lại 1 lần
    })
}