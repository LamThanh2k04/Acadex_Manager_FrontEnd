"use client"
import { adminService } from "@/api/adminService";
import { useState } from "react"
import { Loader } from 'lucide-react';
import { Download } from 'lucide-react';
import toast from "react-hot-toast";
export default function ButtonExportPDF() {
    const [isExport, setIsExport] = useState(false);
    const handleExportPDF = async () => {
        try {
            setIsExport(true);
            const blob = await adminService.exportReportPDF();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `bao-cao-${new Date().toLocaleDateString("vi-VN")}.pdf`;
            link.click();
            window.URL.revokeObjectURL(url);
            toast.success("Xuất báo cáo thành công");
        } catch (error) {
            toast.error("Xuất báo cáo thất bại");
        } finally {
            setIsExport(false);
        }
    }
    return (
        <div>
            <button
                className="flex text-sm items-center gap-2 px-4 py-2 bg-[#ec5d15] text-white font-medium rounded-xl hover:bg-orange-500 transition duration-300 disabled:opacity-50"
                disabled={isExport}
                onClick={handleExportPDF}
            >{isExport ? <><Loader className="animate-spin text-[10px]" /> Đang xuất báo cáo</> : <><Download className="text-[10px]" />Xuất báo cáo</>}</button>
        </div>
    )
}