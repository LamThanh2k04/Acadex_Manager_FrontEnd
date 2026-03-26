import { IAdminOverview, IRevenueChart } from "../types/admin/overview.type";
import { https } from "./config"
import { IUpdateClassesInfo } from "../types/admin/classes.type";
import { ICreateBuilding, TUpdateBuilding } from "../types/admin/building.type";
import { ICreateRoom, TUpdateRoom } from "../types/admin/room.type";
import { ICreateSubject, TUpdateSubject } from "../types/admin/subject.type";
import { ICreateSemester, TUpdateSemester } from "../types/admin/semester.type";
import { ICreatePeriod, TUpdatePeriod } from "../types/admin/period.type";
import { ICreateCertification, TUpdateCertificationInfo } from "../types/admin/certification.type";
import { ICreateCourse, TUpdateCourse } from "../types/admin/course.type";
import { TCreateSchedule, TUpdateSchedule } from "../types/admin/schedule.type";
import { ICreateExamSchedule, TUpdateExamScheduleInfo } from "../types/admin/exam.type";
import { ICreateNotification, TUpdateNotification } from "../types/admin/notification.type";
import { ICreateCertificateOfProgram, ICreateProgram, ICreateSubjectOfProgram, IUpdateSubjectOfProgram, TUpdateProgramInfo } from "../types/admin/program.type";
export const adminService = {
    // Simple APIs
    getAllLecturerSimple: async () => {
        const res = await https.get("/api/admin/lecturer/getAllLecturersSimple");
        return res.data.data.lecturers;
    },
    getAllSemesterSimple: async () => {
        const res = await https.get("/api/admin/semester/getAllSemestersSimple");
        return res.data.data.semesters;
    },
    getAllProgramSimple: async () => {
        const res = await https.get("http://localhost:8000/api/admin/program/getAllProgramsSimple");
        return res.data.data.programs;
    },
    getAllClassSimple: async () => {
        const res = await https.get("http://localhost:8000/api/admin/class/getAllClassesSimple");
        return res.data.data.classes;
    },
    getAllMajorsSimple: async () => {
        const res = await https.get("/api/admin/major/getAllMajorsSimple");
        return res.data.data.majors;
    },
    getAllFacultiesSimple: async () => {
        const res = await https.get("/api/admin/faculty/getAllFacultiesSimple");
        return res.data.data.faculties;
    },
    getAllHomeroomLecturerSimple: async (majorId: number) => {
        const res = await https.get(`/api/admin/lecturer/getAvailableHomeroomLecturers/${majorId}`);
        return res.data.data;
    },
    getAllBuildingSimple: async () => {
        const res = await https.get("/api/admin/building/getAllBuildingsSimple");
        return res.data.data.buildings;
    },
    getAllRoomSimple: async () => {
        const res = await https.get("/api/admin/room/getAllRoomsSimple");
        return res.data.data.rooms;
    },
    getAllPeriodSimple: async () => {
        const res = await https.get("/api/admin/period/getAllPeriodsSimple");
        return res.data.data.formattedPeriods;
    },
    getAllSubjectsSimple: async () => {
        const res = await https.get("/api/admin/subject/getAllSubjectsSimple");
        return res.data.data.subjects;
    },
    getAllCertificatesSimple: async () => {
        const res = await https.get("/api/admin/certificate/getAllCertificatesSimples");
        return res.data.data.certificates;
    },
    // Dashboard Admin
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
    // Lecturer Manager
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
    // Faculty Manager
    getAllFaculties: async (search: string, page: number) => {
        const params = new URLSearchParams();
        if (search) {
            params.set("search", search);
        };
        params.set("page", page.toString());
        const res = await https.get(`/api/admin/faculty/getAllFaculties?${params.toString()}`);
        return res.data.data;
    },
    createFaculties: async (name: string) => {
        const res = await https.post("/api/admin/faculty/createFaculty", { name });
        return res.data;
    },
    updateFacultiesInfo: async (facultyId: number, name: string,) => {
        const res = await https.put(`/api/admin/faculty/updateFacultyInfo/${facultyId}`, { name });
        return res.data;
    },
    updateFacultiesStatus: async (facultyId: number) => {
        const res = await https.put(`/api/admin/faculty/updateFacultyStatus/${facultyId}`);
        return res.data;
    },
    // Major Manager
    getAllMajors: async (search: string, page: number) => {
        const params = new URLSearchParams();
        if (search) params.set("search", search);
        params.set("page", page.toString());
        const res = await https.get(`http://localhost:8000/api/admin/major/getAllMajors?${params.toString()}`);
        return res.data.data;
    },
    createMajor: async (facultyId: number, name: string) => {
        const res = await https.post("/api/admin/major/createMajor", { facultyId, name });
        return res.data;
    },

    updateMajorInfo: async (majorId: number, name: string, facultyId: number) => {
        const res = await https.put(`/api/admin/major/updateMajorInfo/${majorId}`, { name, facultyId });
        return res.data;
    },
    updateMajorStatus: async (majorId: number) => {
        const res = await https.put(`/api/admin/major/updateMajorStatus/${majorId}`);
        return res.data;
    },
    // Class Manager
    getAllClasses: async (search: string, page: number) => {
        const params = new URLSearchParams();
        if (search) params.set("search", search);
        params.set("page", page.toString());
        const res = await https.get(`/api/admin/class/getAllClasses?${params.toString()}`);
        return res.data.data;
    },
    createClasses: async (majorId: number, homeroomLecturerId: number, name: string) => {
        const res = await https.post("/api/admin/class/createClass", { name, majorId, homeroomLecturerId });
        return res.data;
    },

    updateClassesInfo: async (classId: number, data: IUpdateClassesInfo) => {
        const res = await https.put(`/api/admin/class/updateClassInfo/${classId}`, data);
        return res.data;
    },
    updateClassesStatus: async (classId: number) => {
        const res = await https.put(`/api/admin/class/updateClassStatus/${classId}`);
        return res.data;
    },
    // Building Manager
    getAllBuilding: async (search: string, page: number) => {
        const params = new URLSearchParams();
        if (search) params.set("search", search);
        params.set("page", page.toString());
        const res = await https.get(`/api/admin/building/getAllBuildings?${params.toString()}`);
        return res.data.data;
    },
    createBuilding: async (data: ICreateBuilding) => {
        const res = await https.post("/api/admin/building/createBuilding", data);
        return res.data;
    },
    updateBuildingInfo: async (buildingId: number, data: TUpdateBuilding) => {
        const res = await https.put(`/api/admin/building/updateBuildingInfo/${buildingId}`, data);
        return res.data;
    },
    updateBuildingStatus: async (buildingId: number) => {
        const res = await https.put(`/api/admin/building/updateBuildingStatus/${buildingId}`);
        return res.data;
    },
    // Room Manager
    getAllRoom: async (search: string, page: number) => {
        const params = new URLSearchParams()
        if (search) params.set("search", search);
        params.set("page", page.toString());
        const res = await https.get(`/api/admin/room/getAllRooms?${params.toString()}`);
        return res.data.data;
    },
    createRoom: async (data: ICreateRoom) => {
        const res = await https.post("/api/admin/room/createRoom", data);
        return res.data;
    },
    updateRoomInfo: async (roomId: number, data: TUpdateRoom) => {
        const res = await https.put(`/api/admin/room/updateRoomInfo/${roomId}`, data);
        return res.data;
    },
    updateRoomStatus: async (roomId: number) => {
        const res = await https.put(`/api/admin/room/updateRoomStatus/${roomId}`);
        return res.data;
    },
    // Subject Manager 
    getAllSubject: async (search: string, page: number) => {
        const params = new URLSearchParams();
        if (search) params.set("search", search);
        params.set("page", page.toString());
        const res = await https.get(`/api/admin/subject/getAllSubjects?${params}`);
        return res.data.data;
    },
    createSubject: async (data: ICreateSubject) => {
        const res = await https.post("/api/admin/subject/createSubject", data);
        return res.data;
    },
    updateSubjectInfo: async (subjectId: number, data: TUpdateSubject) => {
        const res = await https.put(`/api/admin/subject/updateSubjectInfo/${subjectId}`, data);
        return res.data;
    },
    updateSubjectStatus: async (subjectId: number) => {
        const res = await https.put(`/api/admin/subject/updateSubjectStatus/${subjectId}`);
        return res.data
    },
    getSubjectBySemesterOrder: async (programId: number, semesterOrderId: number) => {
        const res = await https.get(`/api/admin/program/getSubjectsBySemesterOrder/${programId}/semesterOrder/${semesterOrderId}`);
        return res.data.data.subjects;
    },
    // Semester Manager
    getAllSemester: async (search: string, page: number) => {
        const params = new URLSearchParams();
        if (search) params.set("search", search);
        params.set("page", page.toString());
        const res = await https.get(`/api/admin/semester/getAllSemesters?${params.toString()}`);
        return res.data.data;
    },
    createSemester: async (data: ICreateSemester) => {
        const res = await https.post("/api/admin/semester/createSemester", data);
        return res.data;
    },
    updateSemesterInfo: async (semesterId: number, data: TUpdateSemester) => {
        const res = await https.put(`/api/admin/semester/updateSemesterInfo/${semesterId}`, data);
        return res.data;
    },
    updateSemesterStatus: async (semesterId: number) => {
        const res = await https.put(`/api/admin/semester/updateSemesterStatus/${semesterId}`);
        return res.data;
    },
    getCourseSectionBySemester: async (semesterId: number) => {
        const res = await https.get(`/api/admin/courseSection/getCourseSectionBySemester/${semesterId}`);
        return res.data.data.courseSections;
    },
    // Period Manager
    getAllPeriod: async (search: string, page: number) => {
        const params = new URLSearchParams();
        if (search) params.set("search", search);
        params.set("page", page.toString());
        const res = await https.get(`/api/admin/period/getAllPeriods?${params}`);
        return res.data.data;
    },
    createPeriod: async (data: ICreatePeriod) => {
        const res = await https.post("/api/admin/period/createPeriod", data);
        return res.data;
    },
    updatePeriodInfo: async (periodId: number, data: TUpdatePeriod) => {
        const res = await https.put(`/api/admin/period/updatePeriodInfo/${periodId}`, data);
        return res.data;
    },
    updatePeriodStatus: async (periodId: number) => {
        const res = await https.put(`/api/admin/period/updatePeriodStatus/${periodId}`);
        return res.data;
    },
    // Certification Manager
    getAllCertification: async (search: string, page: number) => {
        const params = new URLSearchParams();
        if (search) params.set("search", search);
        params.set("page", page.toString());
        const res = await https.get(`/api/admin/certificate/getAllCertificates?${params}`);
        return res.data.data;
    },
    createCertification: async (data: ICreateCertification) => {
        const res = await https.post("/api/admin/certificate/createCertificate", data);
        return res.data
    },
    updateCertificationInfo: async (certificateId: number, data: TUpdateCertificationInfo) => {
        const res = await https.put(`/api/admin/certificate/updateCertificateInfo/${certificateId}`, data);
        return res.data
    },
    updateCertificationStatus: async (certificateId: number) => {
        const res = await https.put(`/api/admin/certificate/updateCertificateStatus/${certificateId}`);
        return res.data;
    },
    // Course Manager
    getAllCourse: async (search: string, page: number) => {
        const params = new URLSearchParams();
        if (search) params.set("search", search);
        params.set("page", page.toString());
        const res = await https.get(`/api/admin/courseSection/getAllCourseSections?${params.toString()}`);
        return res.data.data;
    },
    createCourse: async (data: ICreateCourse) => {
        const res = await https.post("/api/admin/courseSection/createCourseSection", data);
        return res.data;
    },
    updateCourseInfo: async (courseSectionId: number, data: TUpdateCourse) => {
        const res = await https.put(`/api/admin/courseSection/updateCourseSectionInfo/${courseSectionId}`, data);
        return res.data;
    },
    updateCourseStatus: async (courseSectionId: number) => {
        const res = await https.put(`/api/admin/courseSection/updateCourseSectionStatus/${courseSectionId}`);
        return res.data
    },
    // Program Manager
    getSemeterByProgram: async (programId: number) => {
        const res = await https.get(`/api/admin/program/getSemesterOrdersPrgram/${programId}`);
        return res.data.data.semesterOrder;
    },

    // Schedule Manager
    getAllSchedule: async (search: string, page: number) => {
        const params = new URLSearchParams();
        if (search) params.set("search", search);
        params.set("page", page.toString());
        const res = await https.get(`/api/admin/schedule/getAllSchedules?${params.toString()}`);
        return res.data.data;
    },
    createSchedule: async (data: TCreateSchedule) => {
        const res = await https.post("/api/admin/schedule/createSchedule", data);
        return res.data;
    },
    updateScheduleInfo: async (scheduleId: number, data: TUpdateSchedule) => {
        const res = await https.put(`/api/admin/schedule/updateScheduleInfo/${scheduleId}`, data);
        return res.data;
    },
    updateScheduleStatus: async (scheduleId: number) => {
        const res = await https.put(`/api/admin/schedule/updateScheduleStatus/${scheduleId}`);
        return res.data;
    },
    // Exam Manager
    getAllExamsSchedule: async (search: string, page: number) => {
        const params = new URLSearchParams();
        if (search) params.set("search", search);
        params.set("page", page.toString());
        const res = await https.get(`/api/admin/examSchedule/getAllExamSchedules?${params.toString()}`);
        return res.data.data;
    },
    createExamSchedule: async (data: ICreateExamSchedule) => {
        const res = await https.post("/api/admin/examSchedule/createExamSchedule", data);
        return res.data
    },
    updateExamSchuduleInfo: async (examScheduleId: number, data: TUpdateExamScheduleInfo) => {
        const res = await https.put(`/api/admin/examSchedule/updateExamScheduleInfo/${examScheduleId}`, data);
        return res.data;
    },
    updateExamScheduleStatus: async (examScheduleId: number) => {
        const res = await https.put(`/api/admin/examSchedule/updateExamScheduleStatus/${examScheduleId}`);
        return res.data;
    },
    getCourseSectionHaveSchedule: async (semesterId: number) => {
        const res = await https.get(`/api/admin/examSchedule/getCourseSectionHaveSchedule/${semesterId}`);
        return res.data.data.courseSections;
    },
    getSuggestExamSchedule: async (courseSectionId: number) => {
        const res = await https.get(`/api/admin/examSchedule/suggestExamSchedule/${courseSectionId}`);
        return res.data.data;
    },
    getAvailableRoomsForExamSchedule: async (date: string, startTime: number, endTime: number) => {
        const res = await https.get(`/api/admin/examSchedule/getAvailableRooms?date=${date}&startTime=${startTime}&endTime=${endTime}`);
        return res.data.data.availableRooms;
    },
    // Notification Manager
    getAllNotifications: async (search: string, page: number) => {
        const params = new URLSearchParams();
        if (search) params.set("search", search);
        params.set("page", page.toString());
        const res = await https.get(`/api/admin/notification/getAllNotifications?${params.toString()}`);
        return res.data.data;
    },
    sendNotification: async (data: ICreateNotification) => {
        const res = await https.post("/api/admin/notification/sendNotification", data);
        return res.data;
    },
    updateNotification: async (notificationId: number, data: TUpdateNotification) => {
        const res = await https.put(`/api/admin/notification/updateNotification/${notificationId}`, data);
        return res.data;
    },
    removeNotification: async (notificationId: number) => {
        const res = await https.delete(`/api/admin/notification/removeNotification/${notificationId}`);
        return res.data;
    },
    getStudentBySearch: async () => {
        const res = await https.get("/api/admin/notification/getStudentsBySearch");
        return res.data.data.students;
    },
    // Program Manager
    getAllPrograms: async (search: string, page: number) => {
        const params = new URLSearchParams();
        if (search) params.set("search", search);
        params.set("page", page.toString());
        const res = await https.get(`/api/admin/program/getAllPrograms?${params.toString()}`);
        return res.data.data;
    },
    createProgram: async (data: ICreateProgram) => {
        const res = await https.post("/api/admin/program/createProgram", data);
        return res.data;
    },
    updateProgramInfo: async (programId: number, data: TUpdateProgramInfo) => {
        const res = await https.put(`/api/admin/program/updateProgramInfo/${programId}`, data);
        return res.data;
    },
    updateProgramStatus: async (programId: number) => {
        const res = await https.put(`/api/admin/program/updateProgramStatus/${programId}`);
        return res.data;
    },
    getProgramInfo: async (programId: number) => {
        const res = await https.get(`/api/admin/program/getProgramInfo/${programId}`);
        return res.data.data;
    },
    createSubjectToProgram: async (programId: number, data: ICreateSubjectOfProgram) => {
        const res = await https.post(`/api/admin/program/addSubjectToProgram/${programId}`, data);
        return res.data;
    },
    updateSubjectToProgram: async (programSubjectId: number, data: IUpdateSubjectOfProgram) => {
        const res = await https.put(`/api/admin/program/updateSubjectToProgram/${programSubjectId}`, data);
        return res.data;
    },
    createCertificateToProgram: async (programId: number, data: ICreateCertificateOfProgram) => {
        const res = await https.post(`/api/admin/program/addCertificateToProgram/${programId}`, data);
        return res.data;
    },
    updateCertificateToProgram: async (programCertificateId: number) => {
        const res = await https.put(`/api/admin/program/updateCertificateToProgram/${programCertificateId}`);
        return res.data;
    },
    getAllSubjectToProgram: async (programId: number) => {
        const res = await https.get(`/api/admin/program/getAllSubjects/${programId}`);
        return res.data.data.subjects;
    },
    getAllCertificateToProgram: async (programId: number) => {
        const res = await https.get(`/api/admin/program/getAllCertificates/${programId}`);
        return res.data.data.certificates;
    },
    // Request Manager
    getAllRequest: async (status: string, page: number) => {
        const params = new URLSearchParams();
        if (status) params.set("status", status);
        params.set("page", page.toString());
        const res = await https.get(`/api/admin/student/getAllRequestCertificatesStudents?${params.toString()}`);
        return res.data.data;
    },
    getInfoRequest: async (certificateId: number) => {
        const res = await https.get(`/api/admin/student/getInfoRequestCertificateStudent/${certificateId}`);
        return res.data.data;
    },
    approveRequest: async (certificateId: number, note: string) => {
        const res = await https.post(`/api/admin/student/approveRequestCertificate/${certificateId}`, { note });
        return res.data;
    },
    rejectRequest: async (certificateId: number, note: string) => {
        const res = await https.post(`/api/admin/student/rejectRequestCertificate/${certificateId}`, { note });
        return res.data;
    },
    // Fee Manager
    getStudentsTuitionStatus: async (status: string, page: number) => {
        const params = new URLSearchParams();
        if (status) params.set("status", status);
        params.set("page", page.toString());
        const res = await https.get(`/api/admin/student/getStudentsTuitionStatus?${params.toString()}`);
        return res.data.data;
    }
};