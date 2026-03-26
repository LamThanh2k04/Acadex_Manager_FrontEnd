import RequestInfo from "./RequestInfo";
export default async function RequestDetail({ params }: { params: Promise<{ requestId: string }> }) {
    const { requestId } = await params;
    const numberRequestId = Number(requestId);
    return (
        <div>
            <RequestInfo requestId={numberRequestId} />
        </div>
    )
}