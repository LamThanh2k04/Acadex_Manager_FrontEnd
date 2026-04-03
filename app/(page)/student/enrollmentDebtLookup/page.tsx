"use client"
import { useGetPaidEnrollment } from '@/hooks/student/usePayment';
import UnPaidEnrollmentSkeleton from '@/app/(page)/student/onlinePayment/UnPaidEnrollment/UnPaidEnrollmentSkeleton';
import PaidEnrollment from '@/app/(page)/student/enrollmentDebtLookup/PaidEnrollment/PaidEnrollment';
export default function EnrollmentDebtLookup() {
    const { data: paidEnrollmentData, isLoading: isLoadingPaidEnrollment } = useGetPaidEnrollment();
    if (isLoadingPaidEnrollment) {
        return <UnPaidEnrollmentSkeleton />
    };
    return (
        <div>
            {paidEnrollmentData && <PaidEnrollment data={paidEnrollmentData} />}
        </div>
    )
}