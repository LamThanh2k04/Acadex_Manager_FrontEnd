"use client"
import { UserSearch } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
export default function StudentSearchBar() {
    const pathName = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const handleSearch = useDebouncedCallback((value: string) => {
        const params = new URLSearchParams(searchParams);
        if (value) {
            params.set("search", value)
            params.set("page", "1");
            router.push(`${pathName}?${params.toString()}`)
        } else {
            params.delete("search");
            router.push(`${pathName}?${params.toString()}`)
        }
    }, 500);

    return (
        <div>
            <div className="relative text-sm">
                <UserSearch className="absolute top-1 left-2 text-[5px]" />
                <input type="text"
                    placeholder="Tìm kiếm theo tên sinh viên..."
                    defaultValue={searchParams.get("search") ?? ""}
                    onChange={(e) => { handleSearch(e.target.value) }}
                    className="w-70 border px-2 py-1 pl-10 rounded-xl" />
            </div>
        </div>
    )
}