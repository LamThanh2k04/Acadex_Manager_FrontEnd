"use client"
import { useGetUnPaidEnrollment } from '@/hooks/student/usePayment';
import UnPaidEnrollment from './UnPaidEnrollment/UnPaidEnrollment';
import UnPaidEnrollmentSkeleton from './UnPaidEnrollment/UnPaidEnrollmentSkeleton';
export default function OnlinePayment() {
    const { data: unPaidEnrollmentData, isLoading: isLoadingUnPaidEnrollment } = useGetUnPaidEnrollment();

    if (isLoadingUnPaidEnrollment) {
        return <UnPaidEnrollmentSkeleton />
    }
    return (
        <div>
            {unPaidEnrollmentData && <UnPaidEnrollment data={unPaidEnrollmentData} />}
        </div>
    )
}