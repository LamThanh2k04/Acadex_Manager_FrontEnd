"use client"
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronDown } from 'lucide-react';
export default function StudentFeeSelectStatus() {
    const pathName = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentStatus = searchParams.get("status") || "";
    const handleChangeStatus = (value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value) {
            params.set("status", value);
            params.set("page", "1");
        } else {
            params.delete("status");
            params.delete("page");
        }
        router.push(`${pathName}?${params.toString()}`);
    }
    return (
        <div className="relative">
            <select
                value={currentStatus}
                onChange={(e) => handleChangeStatus(e.target.value)}
                className="
                    appearance-none
                    min-w-45
                    rounded-xl
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
                    cursor-pointer
                "
            >
                <option value="">Tất cả trạng thái</option>
                <option value="PAID">Đã thanh toán</option>
                <option value="UNPAID">Chưa thanh toán</option>
            </select>
            <ChevronDown
                size={18}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
        </div>
    );
}
