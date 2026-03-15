import { adminService } from "@/app/api/adminService"
import { IStudentManagerRespone } from "@/app/types/admin/student.type";
import { useQuery } from "@tanstack/react-query"

export const useGetAllStudent = (search: string, page: number) => {
    return useQuery<IStudentManagerRespone>({
        queryKey: ["get-all-student", search, page],
        queryFn: () => adminService.getAllStudent(search, page),
        staleTime: 6 * 50 * 1000,
    });
};