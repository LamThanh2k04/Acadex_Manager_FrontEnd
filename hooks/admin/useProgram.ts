import { adminService } from "@/app/api/adminService"
import { useQuery } from "@tanstack/react-query"
import { ISemeterOrderByProgram } from '@/app/types/admin/simpleOrOther.type';

export const useGetSemesterByProgram = (programId: number) => {
    return useQuery<ISemeterOrderByProgram[]>({
        queryKey: ['get-semester-program', programId],
        queryFn: () => adminService.getSemeterByProgram(programId),
        enabled: !!programId,
        staleTime: 5 * 60 * 1000,
    })
};