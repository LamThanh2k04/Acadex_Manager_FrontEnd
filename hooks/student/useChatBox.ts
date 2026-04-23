import { useMutation } from "@tanstack/react-query"
import { chatBoxMessage } from '@/api/studentService/chatbox';
import { IChatBoxMessage } from "@/types/student/chatbox.type";
import toast from "react-hot-toast";
export const useChatBoxMessage = () => {
    return useMutation({
        mutationFn: (data: IChatBoxMessage) => chatBoxMessage(data),
        onError: (error: any) => {
            const message = error.response?.data?.message ?? "Không thể gửi tin nhắn, vui lòng thử lại sau";
            toast.error(message);
        }
    })
};