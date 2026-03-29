export default function CustomTooltip({ active, payload, label }: any) {
    if (!active || !payload?.length) return null
    return (
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl shadow-lg px-4 py-3 text-xs">
            <p className="font-semibold text-gray-800 dark:text-gray-100 mb-2 max-w-40 leading-snug">
                {label}
            </p>
            {payload.map((entry: any) => (
                <div key={entry.name} className="flex items-center gap-2 mb-1">
                    <span
                        className="w-2.5 h-2.5 rounded-sm shrink-0"
                        style={{ background: entry.fill ?? entry.color }}
                    />
                    <span className="text-gray-500 dark:text-gray-400">{entry.name}:</span>
                    <span className="font-bold text-gray-800 dark:text-gray-100">{entry.value}</span>
                </div>
            ))}
        </div>
    )
}