"use client"
import { useGetAllCertification } from "@/hooks/admin/useCertification"
import { useSearchParams } from "next/navigation";
import CertificationTableSkeleton from "./CertificationTable/CertificationTableSkeleton";
import CertificationTable from "./CertificationTable/CertificationTable";
export default function Certifications() {
    const searchParams = useSearchParams();
    const search = searchParams.get("search") ?? "";
    const page = Number(searchParams.get("page") ?? "1");
    const { data, isLoading } = useGetAllCertification(search, page);
    return (
        <div>
            {isLoading ? <CertificationTableSkeleton /> : data && <CertificationTable data={data} />}
        </div>
    )
}