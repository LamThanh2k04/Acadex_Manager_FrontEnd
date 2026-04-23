"use client"
import { IEnrollmentCourseSectionDataProps, IEnrollmentCourseSection } from '@/types/student/courseSection.type';
import { BookOpen, CreditCard, GraduationCap, CheckCircle2, Clock, XCircle, User, AlertCircle, CalendarSearch, Trash2 } from 'lucide-react';
import { useCancelCourseSection } from '@/hooks/student/useCourseSection';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useState } from 'react';
import ScheduleOfEnrollment from '../Modal/ScheduleOfEnrollment/ScheduleOfEnrollment';

const STATUS_CONFIG: Record<string, { label: string; className: string }> = {
    REGISTERED: {
        label: 'Đã đăng ký',
        className: 'bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800',
    },
    PENDING: {
        label: 'Chờ xác nhận',
        className: 'bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800',
    },
    CANCELLED: {
        label: 'Đã hủy',
        className: 'bg-red-50 text-red-600 border border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800',
    },
};
const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
export default function EnrollmentCourseSection({ data, selectedSemesterId }: IEnrollmentCourseSectionDataProps) {
    if (!data) return null;
    const { mutate: cancelCourseSection } = useCancelCourseSection();
    const { enrollments, totalCredit, totalEnrollment } = data;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCourseSectionId, setSelectedCourseSectionId] = useState<number | null>(null);
    const paidCount = enrollments.filter(e => e.isPaid).length;
    const unpaidCount = enrollments.filter(e => !e.isPaid).length;
    if (!selectedSemesterId) {
        return (
            <div className="mt-8 p-10 border-2 border-dashed border-gray-100 dark:border-gray-800 rounded-3xl flex flex-col items-center justify-center text-center space-y-3">
                <div className="w-12 h-12 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center">
                    <Clock size={20} className="text-gray-300" />
                </div>
                <div className="space-y-1">
                    <p className="text-sm font-bold text-gray-500 dark:text-gray-400">Chưa chọn học kỳ</p>
                    <p className="text-xs text-gray-400">Vui lòng chọn học kỳ ở phía trên để xem danh sách học phần đã đăng ký.</p>
                </div>
            </div>
        );
    }
    if (enrollments.length === 0) {
        return (
            <div className="mt-8 p-12 bg-gray-50/50 dark:bg-gray-900/20 border border-gray-100 dark:border-gray-800 rounded-3xl flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-2xl shadow-sm flex items-center justify-center mb-4">
                    <BookOpen size={24} className="text-gray-200" />
                </div>
                <h3 className="text-sm font-bold text-gray-700 dark:text-gray-200">Chưa có học phần nào</h3>
                <p className="text-xs text-gray-400 mt-1 max-w-62.5">
                    Bạn chưa đăng ký học phần nào trong học kỳ này. Hãy chọn môn học ở bảng phía trên để đăng ký.
                </p>
            </div>
        );
    }
    return (
        <div className="space-y-5 mt-5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-gray-50 dark:bg-gray-800/60 rounded-2xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-7 h-7 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                            <BookOpen size={14} className="text-blue-600 dark:text-blue-400" />
                        </div>
                        <span className="text-[11px] text-gray-400 font-medium uppercase tracking-wider">Học phần</span>
                    </div>
                    <p className="text-2xl font-black text-gray-800 dark:text-gray-100">{enrollments.length}</p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800/60 rounded-2xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-7 h-7 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                            <GraduationCap size={14} className="text-purple-600 dark:text-purple-400" />
                        </div>
                        <span className="text-[11px] text-gray-400 font-medium uppercase tracking-wider">Tín chỉ</span>
                    </div>
                    <p className="text-2xl font-black text-gray-800 dark:text-gray-100">{totalCredit}</p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800/60 rounded-2xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-7 h-7 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center">
                            <CheckCircle2 size={14} className="text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <span className="text-[11px] text-gray-400 font-medium uppercase tracking-wider">Đã thanh toán</span>
                    </div>
                    <p className="text-2xl font-black text-gray-800 dark:text-gray-100">{paidCount}<span className="text-sm font-medium text-gray-400">/{enrollments.length}</span></p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800/60 rounded-2xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-7 h-7 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                            <CreditCard size={14} className="text-[#ec5d15]" />
                        </div>
                        <span className="text-[11px] text-gray-400 font-medium uppercase tracking-wider">Học phí</span>
                    </div>
                    <p className="text-base font-black text-gray-800 dark:text-gray-100 leading-tight">
                        {formatCurrency(totalEnrollment)}
                    </p>
                </div>
            </div>
            {unpaidCount > 0 && (
                <div className="flex items-center gap-3 px-4 py-3 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/50 rounded-2xl">
                    <Clock size={15} className="text-amber-500 shrink-0" />
                    <p className="text-xs text-amber-700 dark:text-amber-400 font-medium">
                        Bạn có <span className="font-bold">{unpaidCount}</span> học phần chưa thanh toán học phí.
                    </p>
                </div>
            )}
            <div className="space-y-2.5">
                {enrollments.map((enrollment: IEnrollmentCourseSection) => {
                    const statusCfg = STATUS_CONFIG[enrollment.status] ?? STATUS_CONFIG['REGISTERED'];
                    return (
                        <div
                            key={enrollment.id}
                            className="group bg-white dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden hover:border-orange-100 dark:hover:border-orange-900/30 hover:shadow-sm transition-all"
                        >
                            <div className="flex items-center justify-between px-4 py-2.5 bg-gray-50/70 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800">
                                <div className="flex items-center gap-2">
                                    <span className="text-[11px] font-mono font-bold text-gray-400 dark:text-gray-500">
                                        #{enrollment.courseSection.sectionCode}
                                    </span>
                                    <span className="text-gray-300 dark:text-gray-700">·</span>
                                    <span className="text-[11px] font-bold text-[#ec5d15]">
                                        {enrollment.courseSection.plannedClass.name}
                                    </span>
                                    {enrollment.practiceGroup !== null && (
                                        <>
                                            <span className="text-gray-300 dark:text-gray-700">·</span>
                                            <span className="text-[11px] font-medium text-purple-500 dark:text-purple-400">
                                                Ca {enrollment.practiceGroup}
                                            </span>
                                        </>
                                    )}
                                </div>
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${statusCfg.className}`}>
                                    {statusCfg.label}
                                </span>
                            </div>
                            <div className="px-4 py-3 flex flex-col md:flex-row md:items-center gap-3">
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-bold text-gray-800 dark:text-gray-100 truncate mb-1">
                                        {enrollment.courseSection.subject.name}
                                    </p>
                                    <div className="flex items-center flex-wrap gap-x-3 gap-y-1">
                                        <div className="flex items-center gap-1.5 text-[11px] text-gray-400">
                                            <User size={11} />
                                            <span>{enrollment.courseSection.lecturer.user.fulName}</span>
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
                                    <div className={`flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${enrollment.isPaid
                                        ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400'
                                        : 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400'
                                        }`}>
                                        {enrollment.isPaid
                                            ? <><CheckCircle2 size={10} /> Đã nộp</>
                                            : <><XCircle size={10} /> Chưa nộp</>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="px-4 py-2 border-t border-gray-50 dark:border-gray-800/50 flex items-center gap-1.5 text-[10px] text-gray-400">
                                <Clock size={10} />
                                <span>Đăng ký lúc {formatDate(enrollment.enrolledAt)}</span>
                            </div>
                            <div className="flex items-center gap-2 mb-3 p-2">
                                <button
                                    onClick={() => {
                                        setIsModalOpen(true);
                                        setSelectedCourseSectionId(enrollment.courseSection.id)
                                    }}
                                    className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                                >
                                    <CalendarSearch size={13} />
                                    Xem lịch học
                                </button>
                                {!enrollment.isPaid ? (
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <button className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold text-red-600 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30 rounded-lg transition-colors"><Trash2 size={13} />
                                                Hủy học phần</button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Bạn có chắc chắn muốn hủy học phần của môn học này không?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Hành động này sẽ hủy học phần của môn học này và bạn phải đăng ký lại
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Hủy bỏ</AlertDialogCancel>
                                                <AlertDialogAction onClick={() => cancelCourseSection(enrollment.id)}>Tiếp tục</AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                ) : (
                                    <div className="flex items-center gap-1 px-3 py-1.5 text-[10px] font-medium text-gray-400 bg-gray-100 dark:bg-gray-800 rounded-lg cursor-not-allowed" title="Không thể hủy học phần đã hoàn tất học phí">
                                        <AlertCircle size={12} />
                                        Khóa hủy
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Thông tin chung</DialogTitle>
                    </DialogHeader>
                    <ScheduleOfEnrollment selectedCourseSectionId={selectedCourseSectionId} onClose={() => setIsModalOpen(false)} />
                </DialogContent>
            </Dialog>
        </div>
    );
}
