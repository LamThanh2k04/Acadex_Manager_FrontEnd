import { TEnrollmentStatus } from '@/app/types/student/curriculumFramework.type';
import { ISemesterSimple } from './simple.type';

// Subject by Semester
export interface ISubjectsBySemesterDataProps {
    subjects: ISubjectOfSubjectsBySemester[];
    selectedSemesterId: number | null;
}
export interface ISubjectsBySemesterData {
    subjects: ISubjectOfSubjectsBySemester[];
}
export interface ISubjectOfSubjectsBySemester {
    subject: {
        id: number;
        code: string;
        name: string;
        theoryMinutes: number;
        practiceMinutes: number;
        credits: number;
        countToGpa: boolean;
    };
};
// CourseSection By Subject
export interface ICourseSectionBySubjectData {
    newCourseSection: INewCourseSectionBySubject[];
};
export interface INewCourseSectionBySubject {
    id: number;
    sectionCode: string;
    maxStudents: number;
    _count: {
        enrollment: number;
    };
    subject: ISubjectOfCourseSectionBySubject;
    lecturer: ILecturerOfCourseSectionBySubject;
    plannedClass: {
        name: string;
    };
    slot: string;
};
export interface ISubjectOfCourseSectionBySubject {
    name: string;
    credits: number;
};
export interface ILecturerOfCourseSectionBySubject {
    lecturerCode: string;
    user: {
        fulName: string;
    };
};
// Schedule By CourseSection
export interface IScheduleByCourseSection {
    theory: ITheoryOfScheduleByCourseSection[];
    online: TOnlineOfScheduleByCourseSection[];
    practices: IPracticeOfScheduleByCourseSection[];
};
export type TScheduleGroupItem = ITheoryOfScheduleByCourseSection | IPracticeOfScheduleByCourseSection | TOnlineOfScheduleByCourseSection;

export interface ITheoryOfScheduleByCourseSection {
    slot: string;
    lecturer: string;
    plannedClass: string;
    schedules: ISchedule;
};
export interface ISchedule {
    id: number;
    dayOfWeek: number;
    startTimeMinutes: number;
    endTimeMinutes: number;
    startDate: string;
    endDate: string;
    room: string;
    meetingLink: string | null;
};
export type TOnlineOfScheduleByCourseSection = ITheoryOfScheduleByCourseSection;
export interface IPracticeOfScheduleByCourseSection {
    group: number | null;
    slot: string;
    lecturer: string;
    plannedClass: string;
    schedules: ISchedule;
};
// Register CouseSection
export interface IRegisterCourseSection {
    courseSectionId: number;
    practiceGroup: number;
};
// EnrollmentCourseSection
export interface IEnrollmentCourseSectionDataProps {
    data: IEnrollmentCourseSectionData;
    selectedSemesterId: number | null;
};
export interface IEnrollmentCourseSectionData {
    enrollments: IEnrollmentCourseSection[];
    totalCredit: number;
    totalEnrollment: number;
}
export interface IEnrollmentCourseSection {
    id: number;
    courseSection: ICourseSectionOfEnrollmentCourseSection;
    practiceGroup: number;
    fee: number;
    isPaid: boolean;
    status: TEnrollmentStatus;
    enrolledAt: string;
};
export interface ICourseSectionOfEnrollmentCourseSection {
    id: number;
    sectionCode: string;
    plannedClass: {
        name: string;
    };
    lecturer: ILecturerOfCourseSectionBySubject;
    subject: ISubjectOfCourseSectionBySubject;
};
// Schedules By CourseSectionRegister
export interface ISchedulesByCourseSectionRegisterData {
    schedules: ISchedulesByCourseSectionRegister[];
};
export interface ISchedulesByCourseSectionRegister {
    id: number;
    dayOfWeek: number;
    startTimeMinutes: number;
    endTimeMinutes: number;
    startDate: string;
    endDate: string;
    type: TTypeOfSchedule;
    practiceGroup: number | null;
    meetingLink: string | null;
    isActive: boolean;
    room: IRoomOfSchedule;
};
export interface IRoomOfSchedule {
    name: string;
    building: {
        name: string;
    }
}
export type TTypeOfSchedule = "THEORY" | "PRACTICE" | "ONLINE"