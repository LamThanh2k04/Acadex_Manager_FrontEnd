import { User, GraduationCap, Book, BookOpenCheck, Wallet, CreditCard, Calendar, FileSliders } from 'lucide-react';
import Link from 'next/link';
export default function StudentShortcut() {
    const shortcuts = [
        {
            id: 1,
            label: "Thông tin cá nhân",
            href: "/student/studentInfo",
            icon: User,
        },
        {
            id: 2,
            label: "Kết quả học tập",
            href: "/student/studyResult",
            icon: GraduationCap,
        },
        {
            id: 3,
            label: "Chương trình khung",
            href: "/student/curriculumFramework",
            icon: Book,
        },
        {
            id: 4,
            label: "Đăng kí học phần",
            href: "/student/courseSection",
            icon: BookOpenCheck,
        },
        {
            id: 5,
            label: "Tra cứu công nợ",
            href: "/student/enrollmentDebtLookup",
            icon: Wallet,
        },
        {
            id: 6,
            label: "Thanh toán trực tuyến",
            href: "/student/onlinePayment",
            icon: CreditCard,
        },
        {
            id: 7,
            label: "Xem lịch học và lịch thi",
            href: "/student/schedule",
            icon: Calendar,
        },
        {
            id: 8,
            label: "Chứng chỉ",
            href: "/student/certification",
            icon: FileSliders,
        },
    ]
    return (
        <div className='grid grid-cols-2 md:grid-cols-4 gap-2'>
            {shortcuts.map((shortcut) => (
                <div key={shortcut.id} className='mt-5 border dark:bg-gray-900 dark:hover:bg-gray-800 px-3 py-10 bg-white rounded-xl hover:bg-orange-100 hover:text-orange-400 active:bg-orange-100 active:text-orange-400 duration-300 transition-all'>
                    <Link href={shortcut.href} className='flex flex-col gap-2 items-center justify-center'>
                        <shortcut.icon className='text-[#ec5d15]' />
                        <span className='text-sm'>{shortcut.label}</span>
                    </Link>
                </div>
            ))}
        </div>
    )
}