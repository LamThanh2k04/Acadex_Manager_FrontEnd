import { https } from "../config"
import { IChatBoxMessage } from '@/types/student/chatbox.type';
export const chatBoxMessage = async (data: IChatBoxMessage) => {
    const res = await https.post("/api/student/ai/aiMessage", data);
    return res.data.data;
};