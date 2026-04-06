"use client"
import { Bot, X } from "lucide-react";
interface ChatBubbleProps {
    isOpen: boolean;
    onToggle: () => void;
}
export default function ChatBubble({ isOpen, onToggle }: ChatBubbleProps) {
    return (
        <button
            onClick={onToggle}
            className={`fixed bottom-15 right-3 z-50 w-10 h-10 rounded-full shadow-lg
                        flex items-center justify-center transition-all duration-300
                        active:scale-95 cursor-pointer
                        ${isOpen
                    ? "bg-gray-700 hover:bg-gray-800 rotate-0"
                    : "bg-[#ec5d15] hover:bg-[#d44d0f]"
                }`}
        >
            <div className={`transition-all duration-300 ${isOpen ? "rotate-90" : "rotate-0"}`}>
                {isOpen
                    ? <X size={22} className="text-white" />
                    : <Bot size={22} className="text-white" />
                }
            </div>
            {!isOpen && (
                <span className="absolute inset-0 rounded-full bg-[#ec5d15] animate-ping opacity-30" />
            )}
        </button>
    );
}
