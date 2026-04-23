import { https } from "../config"
export const getInfoStudent = async () => {
    const res = await https.get("/api/student/profileStudent/getInfoStudent");
    return res.data.data.student;
};