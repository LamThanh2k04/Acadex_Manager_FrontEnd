"use client"
import { useChatBoxMessage } from "@/hooks/student/useChatBox";
import { Send } from "lucide-react";
import { useState } from "react";

interface ChatInputProps {
    onSend: (message: string) => void;
    isPending: boolean;
}
export default function ChatInput({ onSend, isPending }: ChatInputProps) {
    const [value, setValue] = useState("");
    const mutation = useChatBoxMessage();
    const handleSend = () => {
        if (!value.trim() || isPending) return;
        onSend(value.trim());
        setValue("");
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };
    return (
        <div className="flex items-end gap-2 px-3 py-3 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
            <textarea
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Nhập tin nhắn..."
                disabled={isPending}
                rows={1}
                className="flex-1 resize-none text-sm px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700
                           bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200
                           placeholder:text-gray-400 focus:outline-none focus:border-orange-400
                           focus:ring-2 focus:ring-orange-100 dark:focus:ring-orange-900/30
                           transition-all disabled:opacity-50 max-h-28 overflow-y-auto"
            />
            <button
                onClick={handleSend}
                disabled={!value.trim() || isPending}
                className="shrink-0 w-9 h-9 flex items-center justify-center rounded-xl
                           bg-[#ec5d15] hover:bg-[#d44d0f] active:scale-95
                           disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100
                           transition-all shadow-md shadow-orange-200 dark:shadow-none cursor-pointer"
            >
                <Send size={15} className="text-white" />
            </button>
        </div>
    );
}
