export interface ICourseSectionSimple {
    id: number;
    sectionCode: string;
    subject: {
        id: number;
        name: string;
    }
};