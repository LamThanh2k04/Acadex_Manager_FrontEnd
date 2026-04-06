import { useEffect, useState } from "react";
import { Bot } from "lucide-react";
const WELCOME_TEXT = "Xin chào! 👋 Tôi là trợ lý Acadex, tôi có thể giúp bạn tra cứu lịch học, điểm số, học phí và nhiều thông tin khác. Bạn cần hỗ trợ gì?";
interface WelcomeBubbleProps {
    initialAnimate?: boolean;
    onDone?: () => void;
}
export function WelcomeBubble({ initialAnimate = true, onDone }: WelcomeBubbleProps) {
    const [displayed, setDisplayed] = useState("");
    const [done, setDone] = useState(false);
    useEffect(() => {
        if (!initialAnimate) return;
        let i = 0;
        const timer = setInterval(() => {
            if (i < WELCOME_TEXT.length) {
                setDisplayed(WELCOME_TEXT.slice(0, i + 1));
                i++;
            } else {
                setDone(true);
                if (onDone) onDone();
                clearInterval(timer);
            }
        }, 25);

        return () => clearInterval(timer);
    }, [initialAnimate]);
    return (
        <div className="flex items-end gap-2">
            <div className="shrink-0 w-7 h-7 rounded-full bg-[#ec5d15] flex items-center justify-center shadow-sm">
                <Bot size={14} className="text-white" />
            </div>
            <div className="max-w-[78%] px-3.5 py-2.5 rounded-2xl rounded-bl-sm text-sm leading-relaxed bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
                {displayed}
                {!done && (
                    <span className="inline-block w-0.5 h-3.5 bg-gray-400 ml-0.5 animate-pulse align-middle" />
                )}
            </div>
        </div>
    );
}