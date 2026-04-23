import { https } from "../config"
import { IRegisterCourseSection } from '@/types/student/courseSection.type';
export const getSubjectsBySemester = async (semesterId: number) => {
    const res = await https.get(`/api/student/courseSection/getSubjectsBySemester/${semesterId}`);
    return res.data.data.subjects;
};
export const getCourseSectionsBySubject = async (subjectId: number, semesterId: number) => {
    const res = await https.get(`/api/student/courseSection/getCourseSectionsBySubject/${subjectId}/semester/${semesterId}`);
    return res.data.data.newCourseSection;
};
export const getScheduleByCourseSection = async (courseSectionId: number) => {
    const res = await https.get(`/api/student/courseSection/getScheduleByCourseSection/${courseSectionId}`);
    return res.data.data;
};
export const registerCourseSection = async (data: IRegisterCourseSection) => {
    const res = await https.post("/api/student/courseSection/registerCourseSection", data);
    return res.data;
};
export const cancelCourseSection = async (enrollmentId: number) => {
    const res = await https.post(`/api/student/courseSection/cancelCourseSection/${enrollmentId}`);
    return res.data;
};
export const getAllEnrollmentCourseSection = async (semesterId: number) => {
    const res = await https.get(`/api/student/courseSection/getAllEnrollmentCourseSection/${semesterId}`);
    return res.data.data;
};
export const getAllSchedulesByCourseSectionRegister = async (courseSectionId: number) => {
    const res = await https.get(`/api/student/courseSection/getAllSchedulesByCourseSectionRegister/${courseSectionId}`);
    return res.data.data.schedules;
};