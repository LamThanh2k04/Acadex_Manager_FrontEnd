import { https } from "../../config"
export const getOverview = async () => {
    const res = await https.get("/api/lecturer/dashboard/getOverView");
    return res.data.data
};