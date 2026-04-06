"use client"
import { useState } from "react";
import ChatBubble from "./ChatBubble";
import ChatMessage from "./ChatMessage";
export default function ChatBox() {
    const WELCOME_MSG = {
        role: "assistant",
        message: "Xin chào! Tôi là trợ lý Acadex, tôi có thể giúp gì cho bạn?"
    };
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState([WELCOME_MSG]);
    return (
        <div>
            {isOpen && (
                <ChatMessage message={message} setMessage={setMessage} />
            )}
            <ChatBubble
                isOpen={isOpen}
                onToggle={() => setIsOpen(prev => !prev)}
            />
        </div>
    )
}