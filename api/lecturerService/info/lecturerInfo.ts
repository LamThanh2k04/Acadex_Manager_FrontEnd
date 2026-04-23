import { https } from "../../config"

export const getInfoLecturer = async () => {
    const res = await https.get("/api/lecturer/profileLecturer/getInfoLecturer");
    return res.data.data;
};