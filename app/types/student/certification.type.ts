// Certificate Program
export interface ICertificateProgram {
    result: IResultOfCertificateProgram[];
};
export interface IResultOfCertificateProgram {
    name: string;
    description: string;
    submit: boolean;
    status: TStatusOfResult;

};
export type TStatusOfResult = "Hoàn tất" | "Chưa hoàn tất";
// Submit Certificate
export interface ISubmitCertificate {
    imageCertificate: FileList;
    templateId: number;
    issueDate: string;
};
// Certificate Student
export interface ICertificicateStudent {
    fileUrl: string;
    issueDate: string;
    description: string;
    status: TStatusOfCertificateStudent;
    note: string;
    template: ITemplateOfCertificateStudent;
    admin: IAdminOfCertificateStudent;

};
export type TStatusOfCertificateStudent = "PENDING" | "ISSUED" | "REVOKED";
export interface ITemplateOfCertificateStudent {
    code: string;
    name: string;
};
export interface IAdminOfCertificateStudent {
    name: string;
}