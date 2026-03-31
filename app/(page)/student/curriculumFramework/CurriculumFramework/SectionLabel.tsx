export default function SectionLabel({ label, count }: { label: string; count: number }) {
    return (
        <div className="flex items-center justify-between px-5 py-2 bg-gray-50 dark:bg-gray-800/60 border-b border-gray-100 dark:border-gray-800">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                {label}
            </span>
            <span className="text-[10px] font-medium text-gray-400 dark:text-gray-500">
                {count} môn
            </span>
        </div>
    )
}