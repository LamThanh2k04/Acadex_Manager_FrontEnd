import { https } from "../../config"
export const getAllCourseSectionForLecturerSimple = async () => {
    const res = await https.get("/api/lecturer/dashboard/getAllCourseSectionLecturerSimple");
    return res.data.data.courseSection;
};
export const getAllSemesterSimple = async () => {
    const res = await https.get("/api/lecturer/courseSection/getAllSemestersSimple");
    return res.data.data.semesters;
};