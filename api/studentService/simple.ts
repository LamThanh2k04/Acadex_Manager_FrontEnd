import { https } from "../config"
export const getAllSemestersSimpleStudent = async () => {
    const res = await https.get("/api/student/dashboard/getAllSemestersSimple");
    return res.data.data.semesters;
};
export const getAllCertificateProgram = async () => {
    const res = await https.get("/api/student/certificate/getAllCertificatesProgram");
    return res.data.data.certificates;
};