export interface IStudyResultData {
    semester: ISemesterOfStudyResult;
    subject: ISubjectOfStudyResult[];
};
export interface ISemesterOfStudyResult {
    name: string;
    academicYear: string;
};
export interface ISubjectOfStudyResult {
    sectionCode: string;
    subjectName: string;
    credits: number;
    midterm: number | null;
    final: number | null;
    theory1: number | null;
    theory2: number | null;
    practice1: number | null;
    practice2: number | null;
    practice3: number | null;
    totalScore: number | null;
    gpaScale4: number | null;
    letterGrade: string | null;
    classification: string | null;
    isPassed: boolean | null;
};