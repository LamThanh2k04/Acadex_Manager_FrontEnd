"use client"
import { ICertificatePercentProps } from '@/app/types/student/certification.type';
export default function CertificationProgram({ dataCertificationProgram, dataCertificationStudent }: ICertificatePercentProps) {
    console.log(dataCertificationProgram);
    console.log(dataCertificationStudent);
    const TOTAL_REQUIRED = dataCertificationProgram.result.length ?? 0;
    console.log(TOTAL_REQUIRED);
    const issuedStudent = dataCertificationStudent?.certificates?.filter((st) => st.status === "ISSUED");
    console.log(issuedStudent);
    const issuedStudentLength = issuedStudent?.length;
    console.log(issuedStudentLength);
    const percent = TOTAL_REQUIRED > 0 ? Math.round((issuedStudentLength / TOTAL_REQUIRED) * 100) : 0;
    console.log(percent);
    return (
        <div className=' ml-3 border p-5 rounded-xl w-90 bg-white hover:border-orange-400 transition-colors duration-300'>
            <div className="flex items-center justify-between mb-2">
                <span className="text-[18px] font-medium text-gray-700 dark:text-gray-300">
                    Tiến độ hoàn thành chứng chỉ
                </span>
                <span className="text-sm font-bold text-orange-500">
                    {issuedStudentLength}/{TOTAL_REQUIRED} ({percent}%)
                </span>
            </div>
            <div className="w-full h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                        width: `${percent}%`,
                        backgroundColor: percent === 100 ? '#10B981' : '#ec5d15'
                    }}
                />
            </div>
            <p className="text-xs text-gray-400 font-bold mt-1.5">
                {percent === 100
                    ? 'Bạn đã hoàn thành tất cả chứng chỉ!'
                    : `Còn ${TOTAL_REQUIRED - issuedStudentLength} chứng chỉ chưa hoàn thành`
                }
            </p>
        </div>
    )
}