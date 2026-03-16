import { Search } from "lucide-react";
import { IAdminOverview, IRevenueChart } from "../types/admin/overview.type";
import { https } from "./config"
import { IAddStudent, IUpdateStudentInfo } from "../types/admin/student.type";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export const adminService = {
    // dashboard admin
    getOverView: async (): Promise<IAdminOverview> => {
        const res = await https.get("/api/admin/dashboard/getOverView");
        return res.data.data;
    },
    getRevenueChart: async (year: number): Promise<IRevenueChart[]> => {
        const res = await https.get(`/api/admin/dashboard/getLineChartRevenueLineChart?year=${year}`);
        return res.data.data.result;
    },
    getPieChartGenders: async (role: string) => {
        const res = await https.get(`/api/admin/dashboard/getGenders?role=${role}`)
        return res.data.data;
    },
    getTopStudentGPA: async () => {
        const res = await https.get("/api/admin/dashboard/getTopStudentGpa");
        return res.data.data.students;
    },
    getPassFailBarChart: async () => {
        const res = await https.get("/api/admin/dashboard/getPassFailStatus");
        return res.data.data;
    },
    exportReportPDF: async () => {
        const res = await https.get("/api/admin/report/exportReportPdf", {
            responseType: "blob"
        });
        return res.data;
    },
    getScheduleCalendar: async (date: string, page: number) => {
        const res = await https.get(`http://localhost:8000/api/admin/dashboard/getAllSchedules?date=${date}&page=${page}`);
        return res.data.data;
    },
    // Student Manager
    getAllStudent: async (search: string, page: number) => {
        const params = new URLSearchParams();
        if (search) params.set("search", search);
        params.set("page", page.toString());
        const res = await https.get(`/api/admin/student/getAllStudents?${params.toString()}`);
        return res.data.data;
    },
    createStudent: async (formData: FormData) => {
        const res = await https.post("/api/admin/student/createStudent", formData);
        return res.data;
    },
    getAllProgramSimple: async () => {
        const res = await https.get("http://localhost:8000/api/admin/program/getAllProgramsSimple");
        return res.data.data.programs;
    },
    getAllClassSimple: async () => {
        const res = await https.get("http://localhost:8000/api/admin/class/getAllClassesSimple");
        return res.data.data.classes;
    },
    updateStudentStatusActive: async (studentId: number) => {
        const res = await https.put(`/api/admin/student/updateStudentStatusActive/${studentId}`);
        return res.data;
    },
    updateStudentInfo: async (studentId: number, formData: FormData) => {
        const res = await https.put(`/api/admin/student/updateStudentInfo/${studentId}`, formData);
        return res.data;
    },
    getClassesByProgram: async (programId: number) => {
        const res = await https.get(`/api/admin/class/getClassesByProgram/${programId}`);
        return res.data.data.classes;
    },
    updateResetPasswordStudent: async (studentId: number, newPassword: string) => {
        const res = await https.put(`/api/admin/student/resetPasswordStudent/${studentId}`, { newPassword });
        return res.data
    },
    //Lecturer Manager
    getAllLecturer: async (search: string, page: number) => {
        const params = new URLSearchParams();
        if (search) {
            params.set("search", search);
        };
        params.set("page", page.toString());
        const res = await https.get(`/api/admin/lecturer/getAllLecturers?${params.toString()}`);
        return res.data.data;
    },
    createLecturer: async (formData: FormData) => {
        const res = await https.post("/api/admin/lecturer/createLecturer", formData)
        return res.data;
    },
    getAllMajorsSimple: async () => {
        const res = await https.get("/api/admin/major/getAllMajorsSimple");
        return res.data.data.majors;
    },
    updateLecurer: async (lecturerId: number, formData: FormData) => {
        const res = await https.put(`/api/admin/lecturer/updateLecturerInfo/${lecturerId}`, formData)
        return res.data;
    },
    updateLecturerStatus: async (lecturerId: number) => {
        const res = await https.put(`/api/admin/lecturer/updateLecturerStatusActive/${lecturerId}`)
        return res.data;
    },
    updateLecturerPassword: async (lecturerId: number, newPassword: string) => {
        const res = await https.put(`/api/admin/lecturer/resetPasswordLecturer/${lecturerId}`, { newPassword });
        return res.data;
    },
};