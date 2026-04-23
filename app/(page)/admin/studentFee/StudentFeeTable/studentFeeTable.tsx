import { IStudentTuitionStatusDataResponseProps } from '@/types/admin/studentFee.type';
import { User } from 'lucide-react';
import Pagination from '@/components/Pagination';
import Image from 'next/image';
import StudentFeeSelectStatus from '../StudentFeeSelectStatus/StudentFeeSelectStatus';
export default function StudentFeeTable({ data }: IStudentTuitionStatusDataResponseProps) {
    const statusRender = {
        PAID: (
            <span className="inline-flex items-center rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-600 border border-purple-200">
                Đã trả
            </span>
        ),
        UNPAID: (
            <span className="inline-flex items-center rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-600 border border-yellow-200">
                Dư nợ
            </span>
        ),
    };
    return (
        <div className="mt-5 ml-3 w-[98%] rounded-3xl border border-orange-100 bg-white p-6 shadow-sm">
            <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-700">
                        Danh sách yêu cầu từ sinh viên
                    </h1>
                    <p className="mt-1 text-sm text-gray-400">
                        Quản lý học phí của sinh viên theo học kỳ và trạng thái thanh toán.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <StudentFeeSelectStatus />
                </div>
            </div>
            <div className="overflow-hidden rounded-2xl border border-orange-100">
                <div className="overflow-x-auto">
                    <table className="min-w-full border-separate border-spacing-0">
                        <thead className="bg-linear-to-r from-orange-50 to-orange-100 text-xs font-semibold uppercase tracking-wide text-gray-600">
                            <tr>
                                <th className="px-4 py-4 text-center">Hình ảnh</th>
                                <th className="px-4 py-4 text-center">Thông tin sinh viên</th>
                                <th className="px-4 py-4 text-center">Học kỳ</th>
                                <th className="px-4 py-4 text-center">Tổng phí học phần</th>
                                <th className="px-4 py-4 text-center">Số tiền đã trả</th>
                                <th className="px-4 py-4 text-center">Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {data.students.map((st, index) => (
                                <tr
                                    key={index}
                                    className={`
                                        transition-all duration-300 hover:bg-orange-50/60
                                        ${index !== data.students.length - 1 ? "border-b border-orange-50" : ""}
                                    `}
                                >
                                    <td className="px-4 py-4">
                                        <div className="flex items-center justify-center">
                                            <div className="rounded-2xl border border-orange-100 bg-orange-50 p-1 shadow-sm">
                                                {st.avatar ? (
                                                    <Image
                                                        src={st.avatar}
                                                        width={64}
                                                        height={64}
                                                        alt={st.fullName ?? "Full Name"}
                                                        className="h-16 w-16 rounded-xl object-cover"
                                                    />
                                                ) : (
                                                    <User className="h-16 w-16 rounded-xl text-gray-400" />
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 text-center">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-semibold text-gray-700">
                                                {st.fullName}
                                            </span>
                                            <span className="text-xs text-gray-400">
                                                {st.studentCode}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 text-center text-sm font-medium text-gray-600">
                                        {st.semester}
                                    </td>
                                    <td className="px-4 py-4 text-center text-sm font-medium text-gray-600">
                                        {st.totalCourseFee.toLocaleString("vi-VN")}

                                    </td>
                                    <td className="px-4 py-4 text-center text-sm font-medium text-gray-600">
                                        {st.paidAmount.toLocaleString("vi-VN")}
                                    </td>
                                    <td className="px-4 py-4 text-center">
                                        {statusRender[st.status] ?? (
                                            <span className="inline-flex rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-500">
                                                {st.status}
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {data.students.length === 0 && (
                <div className="mt-6 rounded-2xl border border-dashed border-orange-200 bg-orange-50 py-10 text-center">
                    <p className="text-sm font-medium text-gray-500">
                        Hiện chưa có sinh viên nào phù hợp với bộ lọc.
                    </p>
                </div>
            )}
            <div className="mt-6">
                <Pagination pagination={data.pagination} />
            </div>
        </div>
    );
}