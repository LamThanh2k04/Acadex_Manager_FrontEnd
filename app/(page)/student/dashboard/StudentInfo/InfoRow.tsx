export default function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | number | undefined }) {
    return (
        <div className="flex items-start gap-2.5 py-2.5 border-b border-gray-100 dark:border-gray-800 last:border-0">
            <span className="mt-0.5 shrink-0 text-[#ec5d15]/70">{icon}</span>
            <div className="min-w-0 flex-1">
                <p className="text-[10px] font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500 leading-none mb-0.5">
                    {label}
                </p>
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 truncate">
                    {value}
                </p>
            </div>
        </div>
    )
}