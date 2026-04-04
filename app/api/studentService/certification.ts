import { https } from "../config"
import { ISubmitCertificate } from '@/app/types/student/certification.type';

export const getCertificateProgram = async () => {
    const res = await https.get("/api/student/certificate/getCertificatesProgram");
    return res.data.data;
};
export const submitCertificate = async (data: ISubmitCertificate) => {
    const res = await https.post("/api/student/certificate/submitCertificate", data);
    return res.data;
};
export const getAllCertificateStudent = async () => {
    const res = await https.get("/api/student/certificate/getAllCertificatesStudent");
    return res.data.data;
};