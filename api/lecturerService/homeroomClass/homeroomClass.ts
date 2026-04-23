import { https } from "../../config"

export const getHomeRoomClass = async (search: string, page: number) => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (page) params.set("page", page.toString());
    const res = await https.get(`/api/lecturer/homeroomClass/getAllStudents?${params.toString()}`);
    return res.data.data;
};