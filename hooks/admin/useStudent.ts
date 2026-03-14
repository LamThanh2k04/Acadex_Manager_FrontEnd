import { adminService } from "@/app/api/adminService"
import { IStudentManagerRespone } from "@/app/types/admin/student.type";
import { useQuery } from "@tanstack/react-query"

export const useGetAllStudent = (search: string) => {
    return useQuery<IStudentManagerRespone>({
        queryKey: ["get-all-student", search],
        queryFn: () => adminService.getAllStudent(search),
        staleTime: 6 * 50 * 1000,
    });
};