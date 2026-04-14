"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function ScheduleSelectType() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const currentType = searchParams.get("type") ?? "";

    const handleSelectType = (value: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (value) {
            params.set("type", value);
        } else {
            params.delete("type");
        }

        const paramsString = params.toString();
        router.push(paramsString ? `${pathname}?${paramsString}` : pathname);
    };

    return (
        <div>
            <select
                value={currentType}
                onChange={(e) => handleSelectType(e.target.value)}
                className="
          min-w-45
          cursor-pointer
          appearance-none
          rounded-xl
        dark:bg-gray-900
          dark:border-gray-800
          dark:text-white
          border border-orange-200
          bg-white
          px-4 py-2.5 pr-10
          text-sm font-medium text-gray-600
          shadow-sm
          outline-none
          transition-all duration-300
          hover:border-orange-300
          hover:shadow-md
          focus:border-orange-400
          focus:ring-2 focus:ring-orange-200
        "
            >
                <option value="">Tất cả lịch trong tuần</option>
                <option value="STUDY">Lịch học</option>
                <option value="EXAM">Lịch thi</option>
            </select>
        </div>
    );
}