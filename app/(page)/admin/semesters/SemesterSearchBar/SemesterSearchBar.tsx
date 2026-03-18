import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { BookSearch } from 'lucide-react';
import { useDebouncedCallback } from "use-debounce";

export default function SemesterSearchBar() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathName = usePathname();
    const handleSearch = useDebouncedCallback((value: string) => {
        const params = new URLSearchParams();
        if (value) {
            params.set("search", value);
            params.set("page", "1");
        } else {
            params.delete("search");
            params.delete("page");
        };
        router.push(`${pathName}?${params}`)
    }, 500);
    return (
        <div className="relative">
            <BookSearch className="absolute top-1 left-2 text-sm" />
            <input type="text"
                placeholder="Tìm kiếm theo học kì..."
                onChange={(e) => handleSearch(e.target.value)}
                defaultValue={searchParams.get("search") ?? ""}
                className="w-70 border px-2 py-1 pl-10 rounded-xl"
            />
        </div>
    )
}