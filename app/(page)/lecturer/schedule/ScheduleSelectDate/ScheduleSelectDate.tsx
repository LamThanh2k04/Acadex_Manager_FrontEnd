"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function ScheduleSelectDate() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const currentDate = searchParams.get("date") ?? "";

    const handleSelectDate = (value: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (value) {
            params.set("date", value);
        } else {
            params.delete("date");
        }

        const paramsString = params.toString();
        router.push(paramsString ? `${pathname}?${paramsString}` : pathname);
    };

    return (
        <div>
            <input
                type="date"
                value={currentDate}
                onChange={(e) => handleSelectDate(e.target.value)}
                className="
          rounded-xl
          dark:bg-[#eebbc3]
          dark:text-[#232946]
          border border-orange-200
          bg-white
          px-4 py-2.5
          text-sm text-gray-700
          shadow-sm
          outline-none
          transition-all duration-300
          hover:border-orange-300
          hover:shadow-md
          focus:border-orange-400
          focus:ring-2 focus:ring-orange-200
        "
            />
        </div>
    );
}