import { adminService } from "@/app/api/adminService"
import { IAdminOverview, ITopStudent } from "@/app/types/admin/overview.type"
import { useQuery } from "@tanstack/react-query"
export const useOverView = () => {
    return useQuery<IAdminOverview>({
        queryKey: ["admin-overview"],
        queryFn: () => adminService.getOverView(),
        staleTime: 5 * 60 * 1000, // 5 phút làm mới api lại 1 lần
    });
};
export const useTopStudentGPA = () => {
    return useQuery<ITopStudent[]>({
        queryKey: ["top-student"],
        queryFn: () => adminService.getTopStudentGPA(),
        staleTime: 5 * 60 * 1000,
    });
};