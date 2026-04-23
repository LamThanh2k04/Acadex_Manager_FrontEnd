import { https } from "../config"

export const getDetailedStudyResult = async () => {
    const res = await https.get("/api/student/grades/getDetailedStudyResults");
    return res.data.data;
};