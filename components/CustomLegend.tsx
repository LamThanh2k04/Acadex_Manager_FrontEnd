export default function CustomLegend({ payload }: any) {
    return (
        <div className="flex items-center justify-center gap-4 mt-2">
            {payload?.map((entry: any) => (
                <div key={entry.value} className="flex items-center gap-1.5">
                    <span
                        className="w-2.5 h-2.5 rounded-sm"
                        style={{ background: entry.color }}
                    />
                    <span className="text-[11px] text-gray-400 dark:text-gray-500">
                        {entry.value}
                    </span>
                </div>
            ))}
        </div>
    )
}