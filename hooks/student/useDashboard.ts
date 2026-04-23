import { getAllEnrollmentBySemester, getInfoStudent, getResultStudyCreditsForPieChart, getTotalScoreForChart } from "@/api/studentService/dashboard"
import { IEnrollmentSemester, IStudentInfo } from "@/types/student/dashboard.type";
import { useQuery } from "@tanstack/react-query"
// student info
export const useGetInfoStudent = () => {
    return useQuery<IStudentInfo>({
        queryKey: ['get-info-student'],
        queryFn: () => getInfoStudent(),
        staleTime: 5 * 60 * 1000,
    })
};
// enrollment
export const useGetEnrollmentBySemester = (semesterId: number) => {
    return useQuery<IEnrollmentSemester[]>({
        queryKey: ['get-enrollment-by-semester', semesterId],
        queryFn: () => getAllEnrollmentBySemester(semesterId),
        staleTime: 5 * 60 * 1000,
        enabled: !!semesterId,
        placeholderData: (prevData) => prevData
    });
};
// total score for chart
export const useGetTotalScoreForChart = (semesterId: number) => {
    return useQuery({
        queryKey: ['get-total-score-for-chart', semesterId],
        queryFn: () => getTotalScoreForChart(semesterId),
        staleTime: 5 * 60 * 1000,
        enabled: !!semesterId,
        placeholderData: (prevData) => prevData
    })
};
// result study credits for pie chart
export const useGetResultStudyCreditsForPieChart = () => {
    return useQuery({
        queryKey: ['get-result-study-credits-for-pie-chart'],
        queryFn: () => getResultStudyCreditsForPieChart(),
        staleTime: 5 * 60 * 1000,
        placeholderData: (prevData) => prevData
    })
}