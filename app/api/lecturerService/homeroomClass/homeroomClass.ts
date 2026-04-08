import { https } from "../../config"

export const getHomeRoomClass = async (search: string) => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    const res = await https.get(`/api/lecturer/homeroomClass/getAllStudents?${params.toString()}`);
    return res.data.data;
};