"use client"
import { useGetPaidEnrollment, useGetUnPaidEnrollment } from '@/hooks/student/usePayment';
import UnPaidEnrollmentSkeleton from './UnPaidEnrollment/UnPaidEnrollmentSkeleton';
import UnPaidEnrollment from './UnPaidEnrollment/UnPaidEnrollment';
import PaidEnrollmentSkeleton from './PaidEnrollment/PaidEnrollmentSkeleton';
import PaidEnrollment from './PaidEnrollment/PaidEnrollment';
export default function OnlinePayment() {
    const { data: unPaidEnrollmentData, isLoading: isLoadingUnPaidEnrollment } = useGetUnPaidEnrollment();
    const { data: paidEnrollmentData, isLoading: isLoadingPaidEnrollment } = useGetPaidEnrollment();
    if (isLoadingPaidEnrollment) {
        return <UnPaidEnrollmentSkeleton />
    };
    if (isLoadingUnPaidEnrollment) {
        return <PaidEnrollmentSkeleton />
    }
    return (
        <div>
            {unPaidEnrollmentData && <UnPaidEnrollment data={unPaidEnrollmentData} />}
            {paidEnrollmentData && <PaidEnrollment data={paidEnrollmentData} />}
        </div>
    )
}