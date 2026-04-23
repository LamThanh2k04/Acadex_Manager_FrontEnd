import { Skeleton } from "@/components/ui/skeleton";
import { IdCard, BookOpen, GraduationCap, UserRound } from "lucide-react";

function InfoRowSkeleton({ icon }: { icon: React.ReactNode }) {
    return (
        <div className="flex items-center gap-3 py-2">
            <span className="text-gray-300 shrink-0">{icon}</span>
            <div className="space-y-1.5">
                <Skeleton className="h-2.5 w-24" />
                <Skeleton className="h-4 w-32" />
            </div>
        </div>
    );
}
export default function StudentInfoSkeleton() {
    return (
        <div className="bg-white dark:bg-gray-900 rounded-2xl border-none mt-6 overflow-hidden">
            <div className="px-5 pt-5 pb-4">
                <div className="flex flex-col items-center text-center gap-3 mb-5">
                    <Skeleton className="w-22 h-22 rounded-full" />
                    <div className="space-y-1.5 flex flex-col items-center">
                        <Skeleton className="h-5 w-40" />
                        <Skeleton className="h-3 w-24" />
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-1.5">
                        <Skeleton className="h-5 w-20 rounded-full" />
                        <Skeleton className="h-5 w-24 rounded-full" />
                        <Skeleton className="h-5 w-32 rounded-full" />
                    </div>
                </div>
                <div className="relative mb-4">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-100 dark:border-gray-800" />
                    </div>
                    <div className="relative flex justify-center">
                        <span className="bg-white dark:bg-gray-900 px-3 text-[10px] font-semibold uppercase tracking-widest text-gray-300 dark:text-gray-600">
                            Thông tin sinh viên
                        </span>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 md:ml-20 gap-x-6">
                    <InfoRowSkeleton icon={<IdCard size={18} />} />
                    <InfoRowSkeleton icon={<BookOpen size={18} />} />
                    <InfoRowSkeleton icon={<GraduationCap size={18} />} />
                    <InfoRowSkeleton icon={<UserRound size={18} />} />
                </div>
            </div>
        </div>
    );
}