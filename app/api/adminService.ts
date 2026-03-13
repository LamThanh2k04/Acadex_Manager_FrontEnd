import { IAdminOverview } from "../types/admin.type";
import { https } from "./config"

export const adminService = {
    getOverView: async (): Promise<IAdminOverview> => {
        const res = await https.get("/api/admin/dashboard/getOverView");
        return res.data.data
    }
}