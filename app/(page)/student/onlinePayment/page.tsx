"use client"
import { useGetUnPaidEnrollment } from '@/hooks/student/usePayment';
import UnPaidEnrollment from './UnPaidEnrollment/UnPaidEnrollment';
import PaidEnrollmentSkeleton from '../enrollmentDebtLookup/PaidEnrollment/PaidEnrollmentSkeleton';
export default function OnlinePayment() {
    const { data: unPaidEnrollmentData, isLoading: isLoadingUnPaidEnrollment } = useGetUnPaidEnrollment();

    if (isLoadingUnPaidEnrollment) {
        return <PaidEnrollmentSkeleton />
    }
    return (
        <div>
            {unPaidEnrollmentData && <UnPaidEnrollment data={unPaidEnrollmentData} />}
        </div>
    )
}