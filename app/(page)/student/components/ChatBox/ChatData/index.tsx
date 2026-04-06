import { IChatBoxResponseData, IChatProfileData } from "@/app/types/student/chatbox.type";
import ChatDataSchedule from "./ChatDataSchedule";
import ChatDataExam from "./ChatDataExam";
import ChatDataTuition from "./ChatDataTuition";
import ChatDataGrade from "./ChatDataGrade";
import ChatDataProfile from "./ChatDataProfile";

export default function ChatData({ response }: { response: IChatBoxResponseData }) {
    console.log("ChatData response:", response);
    if (!response.data || response.data.length === 0) return null;
    switch (response.intent) {
        case "schedule":
            return <ChatDataSchedule data={response.data} />
        case "exam":
            return <ChatDataExam data={response.data} />
        case "tuition":
            return <ChatDataTuition data={response.data} />
        case "grade":
            return <ChatDataGrade data={response.data} />
        case "profile":
            return <ChatDataProfile data={response.data as IChatProfileData} />;
        default:
            return null;
    }
}