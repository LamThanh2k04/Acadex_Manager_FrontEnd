import { https } from "@/api/config";

export const getAvgGradeClass = async (courseSectionId: number) => {
    const res = await https.get(`/api/lecturer/dashboard/getAvgGradeClassByCourseSection?courseSectionId=${courseSectionId}`);
    return res.data.data;
};