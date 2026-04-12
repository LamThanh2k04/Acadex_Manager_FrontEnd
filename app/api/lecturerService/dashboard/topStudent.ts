import { https } from "../../config"

export const getTopStudent = async (courseSectionId: number) => {
    const res = await https.get(`/api/lecturer/dashboard/getTopStudentGradeByCourseSection?courseSectionId=${courseSectionId}`);
    return res.data.data.students;
}   