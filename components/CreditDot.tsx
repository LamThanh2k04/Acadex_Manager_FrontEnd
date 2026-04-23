import { cn } from '@/lib/utils';
export default function CreditDot({ credits, isPassed }: { credits: number; isPassed: boolean | null }) {
    return (
        <div className={cn(
            "w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0",
            isPassed === true
                ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400"
                : credits >= 4
                    ? "bg-orange-50 text-[#ec5d15] dark:bg-orange-900/20 dark:text-orange-400"
                    : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
        )}>
            {credits}
        </div>
    )
}