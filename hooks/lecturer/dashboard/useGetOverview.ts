import { useQuery } from "@tanstack/react-query"
import { IOverview } from "@/app/types/lecturer/dashboard/overview.type";
import { getOverview } from "@/api/lecturerService/dashboard/overview";
export const useGetOverview = () => {
    return useQuery<IOverview>({
        queryKey: ['get-overview'],
        queryFn: () => getOverview(),
        staleTime: 5 * 60 * 1000,
        placeholderData: (prevData) => prevData
    })
};