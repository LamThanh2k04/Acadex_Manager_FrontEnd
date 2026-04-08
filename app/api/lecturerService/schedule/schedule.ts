import { https } from "../../config"

export const getScheduleLecturer = async (date: string) => {
    const res = await https.get(`/api/lecturer/schedule/getAllScheduleLecturer?date=${date}`);
    return res.data.data;
};