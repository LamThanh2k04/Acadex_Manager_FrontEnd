import Link from 'next/link';
import { ShieldAlert, ArrowLeft } from 'lucide-react';
import { cookies } from 'next/headers';

export default async function UnauthorizedPage() {
    const cookieStore = await cookies();
    const role = cookieStore.get('userRole')?.value;
    const getBackPath = () => {
        if (!role) return '/login';
        return `/${role.toLowerCase()}/dashboard`;
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            <div className="max-w-md w-full text-center space-y-6 bg-white p-10 rounded-2xl shadow-xl">
                <div className="flex justify-center">
                    <div className="bg-red-100 p-4 rounded-full">
                        <ShieldAlert className="size-16 text-red-600" />
                    </div>
                </div>

                <div className="space-y-2">
                    <h1 className="text-3xl font-bold text-gray-900">Truy cập bị từ chối!</h1>
                    <p className="text-gray-500">
                        Rất tiếc, bạn không có quyền truy cập vào trang này.
                        Vùng dữ liệu này chỉ dành cho tài khoản <span className="font-semibold text-red-600">Phân quyền cao hơn</span>.
                    </p>
                </div>

                <div className="pt-4 space-y-3">
                    <Link
                        href={getBackPath()}
                        className="flex items-center justify-center gap-2 w-full bg-[#ec5d15] hover:bg-[#d44d0f] text-white font-bold py-3 px-4 rounded-xl transition-all shadow-lg active:scale-95"
                    >
                        <ArrowLeft className="size-5" />
                        Quay về trang của bạn
                    </Link>
                </div>

                <p className="text-xs text-gray-400 pt-4">
                    Nếu bạn cho rằng đây là một sai sót, vui lòng liên hệ quản trị viên <span className='uppercase text-red-400'>Acadex</span>.
                </p>
            </div>
        </div>
    );
}