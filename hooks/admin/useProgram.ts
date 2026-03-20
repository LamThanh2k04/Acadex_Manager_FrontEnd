import { adminService } from "@/app/api/adminService"
import { useQuery } from "@tanstack/react-query"
import { ISemeterOrderByProgram, ISubjectBySemesterOrder } from '@/app/types/admin/simpleOrOther.type';

export const useGetSemesterByProgram = (programId: number) => {
    return useQuery<ISemeterOrderByProgram[]>({
        queryKey: ['get-semester-program'],
        queryFn: () => adminService.getSemeterByProgram(programId)
    })
};
export const useGetSubjectBySemesterOrder = (programId: number, semesterOrderId: number) => {
    return useQuery<ISubjectBySemesterOrder[]>({
        queryKey: ['get-subject-semesterOrder'],
        queryFn: () => adminService.getSubjectBySemesterOrder(programId, semesterOrderId)
    })
};