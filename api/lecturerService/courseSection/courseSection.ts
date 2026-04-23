import { https } from "../../config"
import { IConfirmGrade } from '@/types/lecturer/courseSection/courseSection.type';

export const getCourseSection = async (semesterId: number, search: string) => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    const res = await https.get(`/api/lecturer/courseSection/getAllCourseSectionLecturer?semesterId=${semesterId}&${params}`);
    return res.data.data;
};
export const getEnrollmentIsPaid = async (courseSectionId: number, search: string,) => {
    const params = new URLSearchParams();
    if (search) params.set("searchStudent", search);
    const res = await https.get(`/api/lecturer/courseSection/getAllStudentEnrollmentIsPaid/${courseSectionId}?${params}`);
    return res.data.data;
};
export const confirmGrade = async (data: IConfirmGrade[]) => {
    const res = await https.post("/api/lecturer/grade/confirmGrades", data);
    return res.data;
};