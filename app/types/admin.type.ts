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
}
export interface IPassFailBarChart {
    failed: number;
    passed: number;
    total: number;
}