import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
export default function SearchInput() {
    const pathName = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const handleSearch = useDebouncedCallback((value: string) => {
        const params = new URLSearchParams(searchParams);
        if (value) {
            params.set("search", value);
        } else {
            params.delete("search");
        }
        router.push(`${pathName}?${params.toString()}`);
    }, 500);
    return (
        <div className="relative flex-1">
            <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                width="15"
                height="15"
                viewBox="0 0 16 16"
                fill="none"
            >
                <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.5" />
                <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <input
                defaultValue={searchParams.get("search") ?? ""}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Tìm kiếm tên môn học"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2 pl-9 pr-4 text-sm outline-none placeholder:text-gray-400 focus:border-blue-300 focus:bg-white focus:ring-2 focus:ring-blue-100"
            />
        </div>
    );
}