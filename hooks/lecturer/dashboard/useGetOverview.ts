import { useQuery } from "@tanstack/react-query"
import { getOverview } from '@/app/api/lecturerService/dashboard/overView';
import { IOverview } from "@/app/types/lecturer/dashboard/overview.type";

export const useGetOverview = () => {
    return useQuery<IOverview>({
        queryKey: ['get-overview'],
        queryFn: () => getOverview(),
        staleTime: 5 * 60 * 1000,
    })
};