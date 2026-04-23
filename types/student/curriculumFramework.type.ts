export interface ISemesterOrderProgramResponseProps {
    data: ISemesterOrderProgramResponse;
    subjects: ISubjectsBySemesterOrderProgramResponse,
    selectedSemesterOrder: number | null,
    onChangeSubject: (selectedSemesterOrder: number) => void
};
export interface ISemesterOrderProgramResponse {
    semesters: ISemesterOfSemesterOrderProgram[];
    summary: ISumaryOfSemesterOrderProgram;
};
export interface ISemesterOfSemesterOrderProgram {
    semesterOrder: number;
    totalCredits: number;
};
export interface ISumaryOfSemesterOrderProgram {
    totalRequiredCredits: number;
    totalMandatoryCredits: number;
    totalElectiveCredits: number
};
export interface ISubjectsBySemesterOrderProgramResponse {
    subjects: ISubjectsBySemesterOrderProgramData;
};
export interface ISubjectsBySemesterOrderProgramData {
    mandatorySubjects: IMandatorySubject[];
    electiveSubjects: IElectiveSubject[];
}
export interface IMandatorySubject {
    id: number;
    code: string;
    name: string;
    credits: number;
    theoryMinutes: number;
    practiceMinutes: number;
    countToGpa: boolean;
    theoryPeriods: number;
    practicePeriods: number;
    enrollmentStatus: TEnrollmentStatus;
    isPassed: boolean;
};
export type TEnrollmentStatus = "REGISTERED" | "CANCELED";
export interface IElectiveSubject {
    id: number;
    code: string;
    name: string;
    credits: number;
    theoryMinutes: number;
    practiceMinutes: number;
    countToGpa: boolean;
    theoryPeriods: number;
    practicePeriods: number;
    enrollmentStatus: TEnrollmentStatus;
    isPassed: boolean;
};