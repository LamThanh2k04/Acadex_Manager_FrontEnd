"use client"
import { useEffect, useRef, useState } from "react";
import { Bot, Trash2 } from "lucide-react";
import ChatInput from "./ChatInput";
import { IMessage } from '@/app/types/student/chatbox.type';
import { useChatBoxMessage } from "@/hooks/student/useChatBox";

const WELCOME_MESSAGE: IMessage = {
    role: "assistant",
    content: "Xin chào! 👋 Tôi là trợ lý Acadex, tôi có thể giúp bạn tra cứu lịch học, điểm số, học phí và nhiều thông tin khác. Bạn cần hỗ trợ gì?",
};
function MessageBubble({ message }: { message: IMessage }) {
    const isUser = message.role === "user";
    return (
        <div className={`flex items-end gap-2 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
            {!isUser && (
                <div className="shrink-0 w-7 h-7 rounded-full bg-[#ec5d15] flex items-center justify-center shadow-sm">
                    <Bot size={14} className="text-white" />
                </div>
            )}
            <div className={`max-w-[78%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed
                ${isUser
                    ? "bg-[#ec5d15] text-white rounded-br-sm shadow-md shadow-orange-200 dark:shadow-none"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-bl-sm"
                }`}
            >
                {message.content}
            </div>
        </div>
    );
}

function TypingIndicator() {
    return (
        <div className="flex items-end gap-2">
            <div className="shrink-0 w-7 h-7 rounded-full bg-[#ec5d15] flex items-center justify-center shadow-sm">
                <Bot size={14} className="text-white" />
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 px-4 py-3 rounded-2xl rounded-bl-sm">
                <div className="flex items-center gap-1">
                    {[0, 1, 2].map((i) => (
                        <span
                            key={i}
                            className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce"
                            style={{ animationDelay: `${i * 0.15}s` }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
export default function ChatMessages() {
    const [messages, setMessages] = useState<IMessage[]>([WELCOME_MESSAGE]);
    const { mutate: sendMessage, isPending } = useChatBoxMessage();
    const bottomRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isPending]);
    const handleSend = (message: string) => {
        setMessages((prev) => [...prev, { role: "user", content: message }]);
        sendMessage(
            { ask: message },
            {
                onSuccess: (res) => {
                    setMessages((prev) => [
                        ...prev,
                        { role: "assistant", content: res.message },
                    ]);
                },
            }
        );
    };
    const handleClear = () => setMessages([WELCOME_MESSAGE]);
    return (
        <div className="flex flex-col h-full">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 rounded-t-2xl">
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#ec5d15] flex items-center justify-center shadow-sm">
                        <Bot size={16} className="text-white" />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-gray-800 dark:text-gray-100">
                            Trợ lý Acadex
                        </p>
                        <div className="flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            <span className="text-[10px] text-gray-400">Trực tuyến</span>
                        </div>
                    </div>
                </div>
                {messages.length > 1 && (
                    <button
                        onClick={handleClear}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors cursor-pointer"
                    >
                        <Trash2 size={14} />
                    </button>
                )}
            </div>
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-white dark:bg-gray-900/50">
                {messages.map((msg, index) => (
                    <MessageBubble key={index} message={msg} />
                ))}
                {isPending && <TypingIndicator />}
                <div ref={bottomRef} />
            </div>
            <ChatInput onSend={handleSend} isPending={isPending} />
        </div>
    );
}
