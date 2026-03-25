import ProgramInfo from "./ProgramInfo";
export default async function ProgramDetailPage({ params }: { params: Promise<{ programId: string }> }) {
    const { programId } = await params;
    const numberProgramId = Number(programId)
    if (Number.isNaN(programId)) {
        return <div>ID chương trình không hợp lệ</div>;
    }
    return (
        <div>
            <ProgramInfo programId={numberProgramId} />
        </div>
    )
}