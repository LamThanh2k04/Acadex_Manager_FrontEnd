import { https } from "../config"
export const getSemeterOrderProgram = async () => {
    const res = await https.get("/api/student/curriculumFramework/getSemesterOrderProgram");
    return res.data.data;
};
export const getSubjectBySemesterOrderProgram = async (semesterOrder: number) => {
    const res = await https.get(`/api/student/curriculumFramework/getSubjectsBySemesterOrderProgram/${semesterOrder}`);
    return res.data.data;
};