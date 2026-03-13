export interface IAdminOverview {
    totalRevenue: number;
    totalStudents: number;
    totalLecturers: number;
    totalCourses: number;
}
export interface IRevenueChart {
    month: string;
    total: number;
}
export interface IRevenueAreaProps {
    data: IRevenueChart[];
    year: number;
    setYear: (y: number) => void;
}