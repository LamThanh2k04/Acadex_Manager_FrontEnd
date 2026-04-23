export default function CustomTooltip({ active, payload }: any) {
    if (!active || !payload?.length) return null
    return (
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl shadow-lg px-3 py-2 text-xs">
            <div className="flex items-center gap-2">
                <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ background: payload[0].payload.fill }}
                />
                <span className="text-gray-500 dark:text-gray-400">{payload[0].name}:</span>
                <span className="font-bold text-gray-800 dark:text-gray-100">{payload[0].value} TC</span>
            </div>
        </div>
    )
}