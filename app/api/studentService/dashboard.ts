import { https } from "../config"
// student info
export const getInfoStudent = async () => {
    const res = await https.get("/api/student/dashboard/getInfoStudent");
    return res.data.data.student;
};
// enrollment
export const getAllEnrollmentBySemester = async (semesterId: number) => {
    const res = await https.get(`/api/student/dashboard/getAllEnrollmentBySemester/${semesterId}`);
    return res.data.data.enrollments;
};
// total score for chart
export const getTotalScoreForChart = async (semesterId: number) => {
    const res = await https.get(`/api/student/dashboard/getTotalScoresForChart/${semesterId}`);
    return res.data.data;
};
// result study credits for pie chart
export const getResultStudyCreditsForPieChart = async () => {
    const res = await https.get("/api/student/dashboard/getResultsIsStudyCredits");
    return res.data.data;
};