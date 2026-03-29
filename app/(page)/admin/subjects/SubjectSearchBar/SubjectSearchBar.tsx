"use client"
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { BookSearch } from 'lucide-react';
export default function SubjectSearchBar() {
    const pathName = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const handleSearch = useDebouncedCallback((value: string) => {
        const params = new URLSearchParams(searchParams);
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
        <div className="relative">
            <BookSearch className="absolute top-1 left-2 text-sm" />
            <input type="text"
                defaultValue={searchParams.get("search") ?? ""}
                onChange={(e) => { handleSearch(e.target.value) }}
                className="w-70 border px-2 py-1 pl-10 rounded-xl"
                placeholder="Tìm kiếm theo môn học..."
            />
        </div>
    )
}