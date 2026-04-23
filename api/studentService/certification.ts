import { https } from "../config"
export const getCertificateProgram = async () => {
    const res = await https.get("/api/student/certificate/getCertificatesProgram");
    return res.data.data;
};
export const submitCertificate = async (formData: FormData) => {
    const res = await https.post("/api/student/certificate/submitCertificate", formData);
    return res.data;
};
export const getAllCertificateStudent = async () => {
    const res = await https.get("/api/student/certificate/getAllCertificatesStudent");
    return res.data.data;
};
export const getAllCertificationProgram = async () => {
    const res = await https.get("/api/student/certificate/getAllCertificatesProgram");
    return res.data.data.certificates;
};