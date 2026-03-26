import ProgramInfo from "./ProgramInfo";
export default async function ProgramDetailPage({ params }: { params: Promise<{ programId: string }> }) {
    const { programId } = await params;
    const numberProgramId = Number(programId)
    return (
        <div>
            <ProgramInfo programId={numberProgramId} />
        </div>
    )
}