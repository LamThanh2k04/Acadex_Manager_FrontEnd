import { ICertificateProgramProps } from "@/app/types/student/certification.type";
import { CircleCheckBig, CircleX, FileX } from 'lucide-react';

export default function CertificationProgramResult({ data }: ICertificateProgramProps) {
    if (data.result.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 gap-3">
                <div className="w-12 h-12 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center">
                    <FileX size={20} className="text-gray-300" />
                </div>
                <p className="text-xs text-gray-400 italic">
                    Không có chứng chỉ chương trình yêu cầu
                </p>
            </div>
        );
    }
    return (
        <div className="mt-3 overflow-hidden rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900/50 shadow-sm">
            <table className="w-full text-sm">
                <thead>
                    <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800">
                        <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 w-12">
                            STT
                        </th>
                        <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                            Loại chứng chỉ
                        </th>
                        <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 hidden md:table-cell">
                            Mô tả
                        </th>
                        <th className="px-4 py-3 text-center text-[11px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 w-20">
                            Đã nộp
                        </th>
                        <th className="px-4 py-3 text-center text-[11px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 w-32">
                            Trạng thái
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                    {data.result.map((re, index) => (
                        <tr
                            key={index}
                            className="hover:bg-orange-50/40 dark:hover:bg-orange-900/10 transition-colors"
                        >
                            <td className="px-4 py-3.5">
                                <span className="text-xs font-mono font-bold text-gray-300 dark:text-gray-600">
                                    {String(index + 1).padStart(2, "0")}
                                </span>
                            </td>
                            <td className="px-4 py-3.5">
                                <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                                    {re.name}
                                </span>
                            </td>
                            <td className="px-4 py-3.5 hidden md:table-cell">
                                <span className="text-xs text-gray-400 dark:text-gray-500 line-clamp-2">
                                    {re.description || "—"}
                                </span>
                            </td>
                            <td className="px-4 py-3.5 text-center">
                                {re.submit ? (
                                    <CircleCheckBig
                                        size={18}
                                        className="text-emerald-500 mx-auto"
                                    />
                                ) : (
                                    <CircleX
                                        size={18}
                                        className="text-gray-300 dark:text-gray-600 mx-auto"
                                    />
                                )}
                            </td>
                            <td className="px-4 py-3.5 text-center">
                                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold border
                                    ${re.status === "Hoàn tất"
                                        ? "bg-emerald-50 text-emerald-600 md:px-5 border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-900/30"
                                        : "bg-gray-50 text-gray-400 border-gray-200 dark:bg-gray-800 dark:border-gray-700"
                                    }`}
                                >
                                    {re.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
