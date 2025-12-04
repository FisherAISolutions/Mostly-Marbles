import AuthGuard from "@/components/AuthGuard";

export default function TrainingPage() {
  return (
    <AuthGuard role="admin">
      <div style={{ maxWidth: 720, display: "grid", gap: 16 }}>
        <h1>AI Training Dataset</h1>
        <p style={{ opacity: 0.8, fontSize: 14 }}>
          Use this area to upload reference marbles with full metadata (type, origin, maker, age, rarity, notes). In a
          production setup, each record would be stored in a database and surfaced to the AI as part of its knowledge
          base.
        </p>

        <div
          style={{
            background: "rgba(10,12,20,0.95)",
            borderRadius: 16,
            padding: 16,
            border: "1px solid rgba(120,120,150,0.4)",
            display: "grid",
            gap: 12,
            fontSize: 14
          }}
        >
          <p>Form stub: file upload + metadata fields to be wired to your backend.</p>
        </div>
      </div>
    </AuthGuard>
  );
}
