"use client"
import { IPagination } from "@/app/types/admin/overview.type"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function Pagination({ pagination }: { pagination: IPagination }) {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const router = useRouter()

    const handlePageChange = (newPage: number) => {
        const params = new URLSearchParams(searchParams)
        params.set("page", newPage.toString())
        router.push(`${pathname}?${params.toString()}`)
    }

    if (pagination.totalPages <= 1) return null
    const getPageNumbers = () => {
        const pages: (number | "...")[] = []
        const { page, totalPages } = pagination

        if (totalPages <= 5) {
            return Array.from({ length: totalPages }, (_, i) => i + 1)
        }

        pages.push(1)
        if (page > 3) pages.push("...")
        const start = Math.max(2, page - 1)
        const end = Math.min(totalPages - 1, page + 1)
        for (let i = start; i <= end; i++) {
            pages.push(i)
        }

        if (page < totalPages - 2) pages.push("...")
        pages.push(totalPages)
        return pages
    }

    return (
        <div className="flex items-center justify-between mt-4 px-2">
            <p className="text-sm text-gray-400">
                Tổng{" "}
                <span className="font-medium text-gray-600">
                    {pagination.total}
                </span>{" "}
                bản ghi — Trang{" "}
                <span className="font-medium text-gray-600">
                    {pagination.page}
                </span>
                /{pagination.totalPages}
            </p>
            <div className="flex items-center gap-1">
                <button
                    onClick={() => handlePageChange(pagination.page - 1)}
                    disabled={pagination.page === 1}
                    className="p-1.5 border border-gray-200 rounded-lg hover:bg-orange-50
                               disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                    <ChevronLeft className="size-4 text-gray-500" />
                </button>
                {getPageNumbers().map((pageNumber, index) =>
                    pageNumber === "..." ? (
                        <span
                            key={`dots-${index}`}
                            className="w-8 h-8 flex items-center justify-center text-sm text-gray-400"
                        >
                            ...
                        </span>
                    ) : (
                        <button
                            key={pageNumber}
                            onClick={() => handlePageChange(pageNumber)}
                            className={`w-8 h-8 text-sm rounded-lg transition ${pageNumber === pagination.page
                                ? "bg-[#ec5d15] text-white font-medium"
                                : "hover:bg-orange-50 text-gray-500 border border-gray-200"
                                }`}
                        >
                            {pageNumber}
                        </button>
                    )
                )}
                <button
                    onClick={() => handlePageChange(pagination.page + 1)}
                    disabled={pagination.page === pagination.totalPages}
                    className="p-1.5 border border-gray-200 rounded-lg hover:bg-orange-50
                               disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                    <ChevronRight className="size-4 text-gray-500" />
                </button>
            </div>
        </div>
    )
}