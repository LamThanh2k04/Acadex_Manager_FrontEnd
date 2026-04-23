import { getAllSemestersSimpleStudent } from "@/api/studentService/simple"
import { ISemesterSimple } from "@/app/types/student/simple.type"
import { useQuery } from "@tanstack/react-query"
export const useGetAllSemestersSimple = () => {
    return useQuery<ISemesterSimple[]>({
        queryKey: ['get-all-semesters-simple'],
        queryFn: () => getAllSemestersSimpleStudent(),
        staleTime: 5 * 60 * 1000,
    })
}