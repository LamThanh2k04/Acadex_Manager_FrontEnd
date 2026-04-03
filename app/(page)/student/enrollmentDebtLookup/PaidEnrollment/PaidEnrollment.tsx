import { IPaidEnrollmentDataProps, IEnrollmentOfPaid } from '@/app/types/student/payment.type';
import { CreditCard, GraduationCap, Calendar, CheckCircle2, BookOpen, Receipt, Hash } from 'lucide-react';

const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);

const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });

const STATUS_CONFIG: Record<string, { label: string; className: string }> = {
    REGISTERED: {
        label: 'Đã đăng ký',
        className: 'bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800',
    },
    CANCELED: {
        label: 'Đã hủy',
        className: 'bg-red-50 text-red-600 border-red-100 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800',
    },
};

export default function PaidEnrollment({ data }: IPaidEnrollmentDataProps) {
    if (!data) return null;

    if (data.enrollment.length === 0) {
        return (
            <div className="mt-8 p-16 bg-gray-50/50 dark:bg-gray-900/20 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-3xl flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-2xl shadow-sm flex items-center justify-center mb-4">
                    <Receipt size={28} className="text-gray-300" />
                </div>
                <h3 className="text-base font-bold text-gray-700 dark:text-gray-200">Chưa có lịch sử thanh toán</h3>
                <p className="text-sm text-gray-400 mt-2 max-w-xs">
                    Hệ thống chưa ghi nhận các giao dịch thanh toán học phí của bạn.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-8 mt-10">
            {data.enrollment.map((semester, index) => (
                <div key={index} className="space-y-4">
                    <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-5 shadow-sm">
                        <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-50 dark:border-gray-800">
                            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                                <Calendar size={20} className="text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-800 dark:text-gray-100">Chi tiết thanh toán</h3>
                                <p className="text-[11px] text-gray-400 uppercase tracking-widest font-semibold">Thông tin môn học đã thanh toán</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="bg-gray-50 dark:bg-gray-800/40 rounded-xl p-4 border border-transparent hover:border-blue-100 transition-colors">
                                <div className="flex items-center gap-2 mb-2">
                                    <BookOpen size={14} className="text-blue-600" />
                                    <span className="text-[10px] text-gray-500 font-bold uppercase">Môn học</span>
                                </div>
                                <p className="text-xl font-black text-gray-800 dark:text-gray-100">
                                    {semester.enrollments.length}
                                </p>
                            </div>

                            <div className="bg-gray-50 dark:bg-gray-800/40 rounded-xl p-4 border border-transparent hover:border-purple-100 transition-colors">
                                <div className="flex items-center gap-2 mb-2">
                                    <GraduationCap size={14} className="text-purple-600" />
                                    <span className="text-[10px] text-gray-500 font-bold uppercase">Tín chỉ</span>
                                </div>
                                <p className="text-xl font-black text-gray-800 dark:text-gray-100">{semester.totalCredits}</p>
                            </div>

                            <div className="bg-gray-50 dark:bg-gray-800/40 rounded-xl p-4 border border-transparent hover:border-emerald-100 transition-colors">
                                <div className="flex items-center gap-2 mb-2">
                                    <CheckCircle2 size={14} className="text-emerald-600" />
                                    <span className="text-[10px] text-gray-500 font-bold uppercase">Trạng thái</span>
                                </div>
                                <div className="flex items-center gap-1.5 text-emerald-600 font-bold text-sm">
                                    Hoàn tất
                                </div>
                            </div>

                            <div className="bg-[#ec5d15]/5 dark:bg-[#ec5d15]/10 rounded-xl p-4 border border-[#ec5d15]/10">
                                <div className="flex items-center gap-2 mb-2">
                                    <CreditCard size={14} className="text-[#ec5d15]" />
                                    <span className="text-[10px] text-[#ec5d15] font-bold uppercase">Tổng tiền</span>
                                </div>
                                <p className="text-lg font-black text-[#ec5d15] leading-tight">
                                    {formatCurrency(semester.totalFee)}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {semester.enrollments.map((enrollment: IEnrollmentOfPaid) => {
                            const statusCfg = STATUS_CONFIG[enrollment.status] ?? STATUS_CONFIG['REGISTERED'];
                            return (
                                <div
                                    key={`${enrollment.subjectCode}-${enrollment.sectionCode}`}
                                    className="group bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden hover:shadow-md hover:border-emerald-200 dark:hover:border-emerald-900/30 transition-all duration-300"
                                >
                                    <div className="flex items-center justify-between px-4 py-3 bg-gray-50/50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800">
                                        <div className="flex items-center gap-2">
                                            <div className="flex items-center gap-1 px-2 py-0.5 bg-white dark:bg-gray-700 rounded-md border border-gray-200 dark:border-gray-600">
                                                <Hash size={10} className="text-gray-400" />
                                                <span className="text-[10px] font-mono font-bold text-gray-600 dark:text-gray-300">
                                                    {enrollment.sectionCode}
                                                </span>
                                            </div>
                                            <span className="text-[11px] font-bold text-[#ec5d15] bg-[#ec5d15]/5 px-2 py-0.5 rounded">
                                                {enrollment.subjectCode}
                                            </span>
                                        </div>
                                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${statusCfg.className}`}>
                                            {statusCfg.label}
                                        </span>
                                    </div>
                                    <div className="p-4">
                                        <h4 className="text-sm font-bold text-gray-800 dark:text-gray-100 mb-3 line-clamp-1 group-hover:text-emerald-600 transition-colors">
                                            {enrollment.subjectName}
                                        </h4>

                                        <div className="flex flex-wrap items-center justify-between gap-3">
                                            <div className="flex items-center gap-4">
                                                <div className="flex items-center gap-1.5 text-[11px] text-gray-500 font-medium">
                                                    <GraduationCap size={13} className="text-purple-500" />
                                                    {enrollment.credits} tín chỉ
                                                </div>
                                                <div className="flex items-center gap-1.5 text-[11px] text-gray-500 font-medium">
                                                    <Calendar size={13} className="text-blue-500" />
                                                    {formatDate(enrollment.payDate)}
                                                </div>
                                            </div>

                                            <div className="text-right">
                                                <p className="text-sm font-black text-gray-800 dark:text-gray-100">
                                                    {formatCurrency(enrollment.fee)}
                                                </p>
                                                <div className="inline-flex items-center gap-1 text-[9px] font-bold text-emerald-600 uppercase tracking-tighter">
                                                    <CheckCircle2 size={10} />
                                                    Đã xác thực phiên thanh toán
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
}