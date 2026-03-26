import { adminService } from "@/app/api/adminService"
import { useQuery } from "@tanstack/react-query"

export const useGetStudentsTuitionStatus = (status: string, page: number) => {
    return useQuery({
        queryKey: ['get-all-student-tuition-status', status, page],
        queryFn: () => adminService.getStudentsTuitionStatus(status, page),
        staleTime: 5 * 60 * 1000,
        placeholderData: (prevData) => prevData
    })
};