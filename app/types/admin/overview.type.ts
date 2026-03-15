export interface IAdminOverview {
    totalRevenue: number;
    totalStudents: number;
    totalLecturers: number;
    totalCourses: number;
};
export interface IRevenueChart {
    month: string;
    total: number;
};
export interface IRevenueAreaProps {
    data: IRevenueChart[];
    year: number;
    setYear: (y: number) => void;
};
export interface IPieChartGenders {
    males: string;
    females: string;
    total: number
};
export interface IPieChartGendersProps {
    data: IPieChartGenders
    role: string;
    setRole: (role: string) => void;
};
export interface IUserToTop {
    fullName: string
};
export interface ITopStudent {
    id: number
    studentCode: string;
    gpa: number;
    user: IUserToTop
};
export interface IPassFailBarChart {
    failed: number;
    passed: number;
    total: number;
};
export interface IScheduleResponseData {
    pagination: IPagination;
    schedules: ISchedule[];
}
export interface IScheduleResponseProps {
    date: string;
    setDate: (date: string) => void
    data: IScheduleResponseData;
    page: number;
    setPage: (page: number) => void
    isFetching: boolean
};
export interface IPagination {
    limit: number;
    page: number;
    total: number;
    totalPages: number;
};
export interface ISchedule {
    id: number;
    dayOfWeek: number;
    endTimeMinutes: number;
    startTimeMinutes: number;
    type: "THEORY" | "PRACTICE" | "ONLINE";
    courseSection: ICourseSection;
    room: IRoom;
};
export interface ICourseSection {
    id: number;
    sectionCode: string;
    plannedClass: IPlannedClass;
    subject: ISubject;
};
export interface IRoom {
    id: number;
    name: string;
    building: IBuilding
}
export interface IBuilding {
    id: number;
    symbol: string;
}
export interface IPlannedClass {
    id: number;
    name: string;
};
export interface ISubject {
    id: number;
    name: string;
};
