"use client"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useDebouncedCallback } from "use-debounce";
import { CalendarSearch } from 'lucide-react';
export default function ScheduleSearchBar() {
    const pathName = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const handleSearch = useDebouncedCallback((value: string) => {
        const params = new URLSearchParams();
        if (value) {
            params.set("search", value);
            params.set("page", "1")
        } else {
            params.delete("search");
            params.delete("page")
        };
        router.push(`${pathName}?${params}`);
    });
    return (
        <div className="relative">
            <CalendarSearch className="absolute top-1 left-2 text-sm" />
            <input type="text"
                placeholder="Tìm kiếm theo tên môn học..."
                onChange={(e) => handleSearch(e.target.value)}
                defaultValue={searchParams.get("search") ?? ""}
                className="w-70 border px-2 py-1 pl-10 rounded-xl"
            />
        </div>
    )
}