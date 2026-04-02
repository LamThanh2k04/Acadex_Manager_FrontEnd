import { IPaidEnrollmentDataProps, IPaidEnrollmentData, IEnrollmentOfPaid } from '@/app/types/student/payment.type';
import { CreditCard, GraduationCap, Calendar, CheckCircle2, BookOpen, Receipt } from 'lucide-react';

const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);

const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });

const STATUS_CONFIG = {
    REGISTERED: {
        label: 'Đã đăng ký',
        className: 'bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800',
    },
    CANCELED: {
        label: 'Đã hủy',
        className: 'bg-red-50 text-red-600 border border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800',
    },
};

export default function PaidEnrollment({ data }: IPaidEnrollmentDataProps) {
    if (!data) return null;

    const { semesterName, academicYear, enrollments, totalCredits, totalFee } = data;
    const enrollmentsList: IEnrollmentOfPaid[] = Array.isArray(enrollments) ? enrollments : [];

    if (enrollmentsList.length === 0) {
        return (
            <div className="mt-8 p-12 bg-gray-50/50 dark:bg-gray-900/20 border border-gray-100 dark:border-gray-800 rounded-3xl flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-2xl shadow-sm flex items-center justify-center mb-4">
                    <Receipt size={24} className="text-gray-300" />
                </div>
                <h3 className="text-sm font-bold text-gray-700 dark:text-gray-200">Chưa có lịch sử thanh toán</h3>
                <p className="text-xs text-gray-400 mt-1 max-w-62.5">
                    Bạn chưa thanh toán học phí cho học kỳ nào.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-5 mt-8">
            <div className="bg-white dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 rounded-2xl p-4">
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                        <Calendar size={20} className="text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-gray-800 dark:text-gray-100">
                            {semesterName} - {academicYear}
                        </h3>
                        <p className="text-xs text-gray-500">Lịch sử thanh toán</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="bg-gray-50 dark:bg-gray-800/60 rounded-xl p-3">
                        <div className="flex items-center gap-2 mb-1">
                            <BookOpen size={14} className="text-blue-600 dark:text-blue-400" />
                            <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Học phần</span>
                        </div>
                        <p className="text-lg font-black text-gray-800 dark:text-gray-100">{enrollmentsList.length}</p>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-800/60 rounded-xl p-3">
                        <div className="flex items-center gap-2 mb-1">
                            <GraduationCap size={14} className="text-purple-600 dark:text-purple-400" />
                            <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Tín chỉ</span>
                        </div>
                        <p className="text-lg font-black text-gray-800 dark:text-gray-100">{totalCredits}</p>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-800/60 rounded-xl p-3">
                        <div className="flex items-center gap-2 mb-1">
                            <CheckCircle2 size={14} className="text-emerald-600 dark:text-emerald-400" />
                            <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Đã thanh toán</span>
                        </div>
                        <p className="text-lg font-black text-gray-800 dark:text-gray-100">{enrollmentsList.length}</p>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-800/60 rounded-xl p-3">
                        <div className="flex items-center gap-2 mb-1">
                            <CreditCard size={14} className="text-[#ec5d15]" />
                            <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Tổng tiền</span>
                        </div>
                        <p className="text-sm font-black text-gray-800 dark:text-gray-100 leading-tight">
                            {formatCurrency(totalFee)}
                        </p>
                    </div>
                </div>
            </div>
            <div className="space-y-2.5">
                {enrollmentsList.map((enrollment: IEnrollmentOfPaid) => {
                    const statusCfg = STATUS_CONFIG[enrollment.status] ?? STATUS_CONFIG['REGISTERED'];
                    return (
                        <div
                            key={`${enrollment.subjectCode}-${enrollment.sectionCode}`}
                            className="group bg-white dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden hover:border-emerald-100 dark:hover:border-emerald-900/30 hover:shadow-sm transition-all"
                        >
                            <div className="flex items-center justify-between px-4 py-2.5 bg-gray-50/70 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800">
                                <div className="flex items-center gap-2">
                                    <span className="text-[11px] font-mono font-bold text-gray-400 dark:text-gray-500">
                                        #{enrollment.sectionCode}
                                    </span>
                                    <span className="text-gray-300 dark:text-gray-700">·</span>
                                    <span className="text-[11px] font-bold text-[#ec5d15]">
                                        {enrollment.subjectCode}
                                    </span>
                                </div>
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${statusCfg.className}`}>
                                    {statusCfg.label}
                                </span>
                            </div>

                            <div className="px-4 py-3 flex flex-col md:flex-row md:items-center gap-3">
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-bold text-gray-800 dark:text-gray-100 truncate mb-1">
                                        {enrollment.subjectName}
                                    </p>
                                    <div className="flex items-center flex-wrap gap-x-3 gap-y-1">
                                        <div className="flex items-center gap-1.5 text-[11px] text-gray-400">
                                            <GraduationCap size={11} />
                                            <span>{enrollment.credits} tín chỉ</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-[11px] text-gray-400">
                                            <Calendar size={11} />
                                            <span>Thanh toán: {formatDate(enrollment.payDate)}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 md:flex-col md:items-end shrink-0">
                                    <p className="text-sm font-black text-gray-700 dark:text-gray-200">
                                        {formatCurrency(enrollment.fee)}
                                    </p>
                                    <div className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400">
                                        <CheckCircle2 size={10} />
                                        Đã nộp
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}