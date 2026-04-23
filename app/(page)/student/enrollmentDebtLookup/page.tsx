"use client"
import { useGetPaidEnrollment } from '@/hooks/student/usePayment';
import PaidEnrollment from '@/app/(page)/student/enrollmentDebtLookup/PaidEnrollment/PaidEnrollment';
import PaidEnrollmentSkeleton from './PaidEnrollment/PaidEnrollmentSkeleton';
export default function EnrollmentDebtLookup() {
    const { data: paidEnrollmentData, isLoading: isLoadingPaidEnrollment } = useGetPaidEnrollment();
    if (isLoadingPaidEnrollment) {
        return <PaidEnrollmentSkeleton />
    };
    return (
        <div>
            {paidEnrollmentData && <PaidEnrollment data={paidEnrollmentData} />}
        </div>
    )
}