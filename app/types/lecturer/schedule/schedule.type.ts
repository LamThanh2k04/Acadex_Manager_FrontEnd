export interface IScheduleLecturer {
    weekStart: string;
    weekEnd: string;
    studySchedules: IStudySchedulesOfSchedule[];
};
export interface IStudySchedulesOfSchedule {
    scheduleId: number;
    subjectCode: string;
    subjectName: string;
    semester: string;
    academicYear: string;
    dayOfWeek: number;
    startTime: number;
    endTime: number;
    startDate: string;
    endDate: string;
    type: TTypeLecturer;
    room: string;
};
type TTypeLecturer = "THEORY" | "PRACTICE" | "ONLINE";
