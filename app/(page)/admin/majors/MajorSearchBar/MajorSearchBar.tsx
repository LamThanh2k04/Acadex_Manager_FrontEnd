"use client"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { BookSearch } from 'lucide-react';
import { useDebouncedCallback } from "use-debounce";
export default function MajorSearchBar() {
    const pathName = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams()
    const handleSearch = useDebouncedCallback((value: string) => {
        const params = new URLSearchParams();
        if (value) {
            params.set("search", value);
            params.set("page", "1");
        } else {
            params.delete("search");
            params.delete("page");
        };
        router.push(`${pathName}?${params}`);
    }, 500);
    return (
        <div className="relative text-sm">
            <BookSearch className="absolute top-1 left-2 text-sm" />
            <input type="text"
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Tìm kiếm theo tên ngành..."
                defaultValue={searchParams.get("search") ?? ""}
                className="w-70 border px-2 py-1 pl-10 rounded-xl"
            />
        </div>
    )
}