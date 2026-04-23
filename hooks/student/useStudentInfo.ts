import { getInfoStudent } from '@/api/studentService/studentInfo';
import { IStudentInfo } from '@/types/student/dashboard.type';
import { useQuery } from '@tanstack/react-query';
export const useGetInfoStudentOfStudent = () => {
    return useQuery<IStudentInfo>({
        queryKey: ['get-info-student'],
        queryFn: () => getInfoStudent(),
        staleTime: 5 * 60 * 1000,
    })
};