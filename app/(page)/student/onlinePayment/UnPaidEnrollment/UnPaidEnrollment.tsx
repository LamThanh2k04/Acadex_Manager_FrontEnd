"use client"
import { IGetUnPaidEnrollmentDataProps, IGetUnPaidEnrollmentData } from '@/app/types/student/payment.type';
import { CreditCard, GraduationCap, User, CheckCircle2, XCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useCreatePayment } from '@/hooks/student/usePayment';
import { useState } from 'react';
const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
export default function UnPaidEnrollment({ data }: IGetUnPaidEnrollmentDataProps) {
    const enrollments: IGetUnPaidEnrollmentData[] = Array.isArray(data) ? data : [];
    const { mutate: createPayment, isPending } = useCreatePayment();
    const [selectedEnrollments, setSelectedEnrollments] = useState<number[]>([]);
    const totalFee = enrollments.reduce((sum, e) => sum + e.fee, 0);
    const selectedFee = enrollments.filter(e => selectedEnrollments.includes(e.id)).reduce((sum, e) => sum + e.fee, 0);

    const handleSelect = (id: number) => {
        setSelectedEnrollments(prev =>
            prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
        );
    };

    const handleSelectAll = () => {
        setSelectedEnrollments(
            selectedEnrollments.length === enrollments.length
                ? []
                : enrollments.map(e => e.id)
        );
    };
    const handlePayment = () => {
        if (selectedEnrollments.length === 0) return;
        createPayment(
            { enrollmentIds: selectedEnrollments },
            {
                onSuccess: (res) => {
                    window.location.href = res.data.paymentUrl;
                }
            }
        );
    };
    if (enrollments.length === 0) {
        return (
            <div className="mt-8 p-12 bg-gray-50/50 dark:bg-gray-900/20 border border-gray-100 dark:border-gray-800 rounded-3xl flex flex-col items-center justify-center text-center min-h-screen">
                <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-2xl shadow-sm flex items-center justify-center mb-4">
                    <CheckCircle2 size={24} className="text-green-400" />
                </div>
                <h3 className="text-sm font-bold text-gray-700 dark:text-gray-200">Tất cả học phần đã thanh toán</h3>
                <p className="text-xs text-gray-400 mt-1 max-w-62.5">
                    Bạn đã thanh toán đầy đủ cho tất cả học phần đã đăng ký.
                </p>
            </div>
        );
    }
    return (
        <div className="space-y-5 mt-8">
            <div className="bg-white dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 rounded-2xl p-4">
                <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-bold text-gray-800 dark:text-gray-100">Học phần chưa thanh toán</h3>
                    <span className="text-xs text-gray-400">{enrollments.length} học phần</span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                        <CreditCard size={16} className="text-orange-500" />
                        <span className="font-bold text-gray-700 dark:text-gray-200">{formatCurrency(totalFee)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <CheckCircle2 size={16} className="text-green-500" />
                        <span className="text-xs text-gray-500">Đã chọn: {formatCurrency(selectedFee)}</span>
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-3 px-4 py-3 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/50 rounded-2xl">
                <input
                    type="checkbox"
                    checked={selectedEnrollments.length === enrollments.length && enrollments.length > 0}
                    onChange={handleSelectAll}
                    className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500"
                />
                <p className="text-xs text-amber-700 dark:text-amber-400 font-medium">
                    Chọn tất cả học phần để thanh toán ({enrollments.length} học phần)
                </p>
            </div>
            <div className="space-y-2.5">
                {enrollments.map((enrollment: IGetUnPaidEnrollmentData) => {
                    const isSelected = selectedEnrollments.includes(enrollment.id);
                    return (
                        <div
                            key={enrollment.id}
                            className={`group bg-white dark:bg-gray-900/50 border rounded-2xl overflow-hidden transition-all ${isSelected
                                ? 'border-orange-200 dark:border-orange-800/50 shadow-sm shadow-orange-100'
                                : 'border-gray-100 dark:border-gray-800 hover:border-orange-100 dark:hover:border-orange-900/30'
                                }`}
                        >
                            <div className="flex items-center justify-between px-4 py-2.5 bg-gray-50/70 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800">
                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={isSelected}
                                        onChange={() => handleSelect(enrollment.id)}
                                        className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500"
                                    />
                                    <span className="text-[11px] font-mono font-bold text-gray-400 dark:text-gray-500">
                                        #{enrollment.courseSection.sectionCode}
                                    </span>
                                    <span className="text-gray-300 dark:text-gray-700">·</span>
                                    <span className="text-[11px] font-bold text-[#ec5d15]">
                                        {enrollment.courseSection.plannedClass.name}
                                    </span>
                                </div>
                                <div className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400">
                                    <XCircle size={10} />
                                    Chưa nộp
                                </div>
                            </div>

                            <div className="px-4 py-3 flex flex-col md:flex-row md:items-center gap-3">
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-bold text-gray-800 dark:text-gray-100 truncate mb-1">
                                        {enrollment.courseSection.subject.name}
                                    </p>
                                    <div className="flex items-center flex-wrap gap-x-3 gap-y-1">
                                        <div className="flex items-center gap-1.5 text-[11px] text-gray-400">
                                            <User size={11} />
                                            <span>{enrollment.courseSection.lecturer.user.name}</span>
                                            <span className="text-gray-300 dark:text-gray-700">·</span>
                                            <span className="font-mono">{enrollment.courseSection.lecturer.lecturerCode}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-[11px] text-gray-400">
                                            <GraduationCap size={11} />
                                            <span>{enrollment.courseSection.subject.credits} tín chỉ</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 md:flex-col md:items-end shrink-0">
                                    <p className="text-sm font-black text-gray-700 dark:text-gray-200">
                                        {formatCurrency(enrollment.fee)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            {selectedEnrollments.length > 0 && (
                <div className="bg-white dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 rounded-2xl p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-bold text-gray-800 dark:text-gray-100">
                                Thanh toán {selectedEnrollments.length} học phần
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                                Tổng tiền: {formatCurrency(selectedFee)}
                            </p>
                        </div>
                        <button
                            onClick={handlePayment}
                            disabled={isPending}
                            className="flex items-center gap-2 px-6 py-2.5 bg-[#ec5d15] hover:bg-[#d44d0f] active:scale-95
                                       disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100
                                       text-white rounded-xl text-sm font-bold transition-all
                                       shadow-md shadow-orange-200 dark:shadow-none"
                        >
                            {isPending ? (
                                <>
                                    <Loader2 size={16} className="animate-spin" />
                                    Đang xử lý...
                                </>
                            ) : (
                                <>
                                    <CreditCard size={16} />
                                    Thanh toán
                                </>
                            )}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}