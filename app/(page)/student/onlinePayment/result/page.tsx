'use client'
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
export default function PaymentResultPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const queryClient = useQueryClient();

    useEffect(() => {
        const result = searchParams.get('payment');

        if (result === 'success') {
            toast.success("Thanh toán thành công");
            queryClient.invalidateQueries({ queryKey: ['get-unpaid-enrollment'] });
            queryClient.invalidateQueries({ queryKey: ['get-paid-enrollment'] });
        } else if (result === 'failed') {
            toast.error("Thanh toán thất bại hoặc đã hủy");
        } else {
            toast.error("Có lỗi xảy ra trong quá trình thanh toán");
        }
        const timer = setTimeout(() => {
            router.push('/student/onlinePayment');
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-3">
            <p className="text-sm text-gray-500">Đang xử lý kết quả thanh toán...</p>
            <p className="text-xs text-gray-400">Bạn sẽ được chuyển về trang thanh toán</p>
        </div>
    );
}