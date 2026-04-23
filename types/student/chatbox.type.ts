export type TIntentChatBox = "schedule" | "exam" | "tuition" | "tuition_guide" | "grade" | "profile" | "general";
export interface IChatBoxMessage {
    ask: string;
};
export interface IChatBoxResponse {
    message: string;
}
export interface IChatBoxResponseData {
    intent: TIntentChatBox;
    text: string;
    data: any[] | any;
};
export interface IChatBoxResponse {
    data: IChatBoxResponseData;
};
export interface IMessage {
    role: "user" | "assistant";
    content: string;
    response?: IChatBoxResponseData;
}
export interface IChatGradeData {
    id: number;
    totalScore: number | null;
    gpaScale4: number | null;
    letterGrade: string | null;
    classification: string | null;
    isEligibleForExam: boolean;
    isPassed: boolean | null;
    isActive: boolean;
    isConfirmed: boolean;
    createdAt: string;
    updatedAt: string;
    enrollmentId: number;
    enrollment: IChatGradeEnrollment;
}

export interface IChatGradeEnrollment {
    id: number;
    fee: number;
    isPaid: boolean;
    courseSection: {
        id: number;
        sectionCode: string;
        subject: {
            id: number;
            code: string;
            name: string;
            credits: number;
            theoryMinutes: number;
            practiceMinutes: number;
            countToGpa: boolean;
        }
    }
};
export interface IChatProfileData {
    id: number;
    userId: number;
    studentCode: string;
    personalEmail: string;
    citizenId: string;
    placeOfBirth: string;
    ethnicity: string;
    admissionYear: number;
    graduateYear: number;
    gpa: number;
    creditsEarned: number;
    status: TStatusProfileStudent;
    classId: number;
    majorId: number;
    user: IUserOfChatProfile;
    major: IClassOfChatProfile;
    class: IMajorOfChatProfile;
};
export interface IUserOfChatProfile {
    id: number;
    fullName: string;
    avatar: string;
    email: string;
    gender: TGenderProfileStudent;
    dateOfBirth: string;
    phoneNumber: string;
    address: string;
    isActive: boolean;
};
export interface IClassOfChatProfile {
    id: number;
    name: string;
};
export interface IMajorOfChatProfile {
    id: number;
    code: string;
    name: string;
};
type TStatusProfileStudent = "STUDYING" | "GRADUATE" | "TRUANT";
type TGenderProfileStudent = "MALE" | "FEMALE";
export interface IChatScheduleData {
    id: number;
    dayOfWeek: number;
    startTimeMinutes: number;
    endTimeMinutes: number;
    startDate: string;
    endDate: string;
    type: TTypeSchedule
    meetingLink: string | null;
    isPaused: boolean;
    courseSection: ICourseSection;
    room: {
        name: string;
    };
};
type TTypeSchedule = "THEORY" | "PRACTICE" | "ONLINE";
export interface ICourseSection {
    sectionCode: string;
    subject: ISubjectOfCourseSection;
    semester: ISemesterOfCourseSection;
};
export interface ISubjectOfCourseSection {
    code: string;
    name: string;
    credits: number;
};
export interface ISemesterOfCourseSection {
    name: string;
    academicYear: string;
};
export interface IChatTuitionData {
    id: number;
    enrolledAt: string;
    fee: number;
    isPaid: boolean;
    status: string;
    practiceGroup: number | null;
    courseSection: ICourseSection;
};
export interface IChatExamData {
    id: number;
    type: "FINAL" | "MIDTERM";
    examDate: string;
    startMinute: number;
    endMinute: number;
    note: string | null;
    courseSection: {
        sectionCode: string;
        subject: {
            code: string;
            name: string;
            credits: number;
        };
        semester: {
            name: string;
            academicYear: string;
        };
    };
    room: {
        name: string;
    };
}