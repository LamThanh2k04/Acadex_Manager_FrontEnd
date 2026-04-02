// UnPaid Enrollment
export interface IGetUnPaidEnrollmentDataProps {
    data: IGetUnPaidEnrollmentData
};
export interface IGetUnPaidEnrollmentData {
    id: number;
    fee: number;
    courseSection: ICourseSectionOfUnPaidEnrollment;
};
export interface ICourseSectionOfUnPaidEnrollment {
    sectionCode: string;
    plannedClass: IPlannedClassOfCourseSection;
    lecturer: ILecturerOfCourseSection;
    subject: ISubjectOfCourseSection;
}
export interface IPlannedClassOfCourseSection {
    name: string;
};
export interface ILecturerOfCourseSection {
    lecturerCode: string;
    user: {
        name: string;
    }
};
export interface ISubjectOfCourseSection {
    name: string;
    credits: number;
};
// Create Payment
export interface ICreatePayment {
    enrollmentIds: number[];
};
// Paid Enrollment
export interface IPaidEnrollmentDataProps {
    data: IPaidEnrollmentData;
};
export interface IPaidEnrollmentData {
    semesterName: string;
    academicYear: string;
    enrollments: IEnrollmentOfPaid;
    totalCredits: number;
    totalFee: number;
};
export interface IEnrollmentOfPaid {
    sectionCode: string;
    subjectCode: string;
    subjectName: string;
    credits: number;
    fee: number;
    status: TEnrollmentStatus,
    payDate: string;
};
export type TEnrollmentStatus = "REGISTERED" | "CANCELED";

