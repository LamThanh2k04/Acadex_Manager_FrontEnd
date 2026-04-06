"use client"
import { useState } from "react";
import ChatBubble from "./ChatBubble";
import ChatMessage from "./ChatMessage";
import { IMessage } from "@/app/types/student/chatbox.type";
export default function ChatBox() {
    const WELCOME_MSG: IMessage = {
        role: "assistant",
        content: "Xin chào! Tôi là trợ lý Acadex, tôi có thể giúp gì cho bạn?"
    };
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<IMessage[]>([WELCOME_MSG]);
    return (
        <div>
            {isOpen && (
                <div className="fixed bottom-24 right-6 z-50 w-80 h-120 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden flex flex-col">
                    <ChatMessage
                        message={messages}
                        setMessage={setMessages}
                    />
                </div>
            )}
            <ChatBubble
                isOpen={isOpen}
                onToggle={() => setIsOpen(prev => !prev)}
            />
        </div>
    )
}