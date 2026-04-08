import { https } from "../../config"
import { IConfirmGrade } from '@/app/types/lecturer/courseSection/courseSection.type';

export const getCourseSection = async (semesterId: number) => {
    const res = await https.get(`/api/lecturer/courseSection/getAllCourseSectionLecturer?semesterId=${semesterId}`);
    return res.data.data;
};
export const getEnrollmentIsPaid = async (search: string, courseSectionId: number) => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    const res = await https.get(`/api/lecturer/courseSection/getAllStudentEnrollmentIsPaid/${courseSectionId}?${params.toString()}`);
    return res.data.data;
};
export const confirmGrade = async (data: IConfirmGrade) => {
    const res = await https.post("/api/lecturer/grade/confirmGrades", data);
    return res.data;
};