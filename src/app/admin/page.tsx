import AuthGuard from "@/components/AuthGuard";
import AdminChat from "@/components/AdminChat";
import Link from "next/link";

export default function AdminPage() {
  return (
    <AuthGuard role="admin">
      <div style={{ display: "grid", gap: 24 }}>
        <header>
          <h1>Admin Dashboard</h1>
          <p style={{ opacity: 0.8, fontSize: 14 }}>
            Coordinate with other admins, manage roles, and curate the training dataset that powers the AI identifier.
          </p>
        </header>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1.3fr) minmax(0, 1fr)",
            gap: 24
          }}
        >
          <div
            style={{
              background: "rgba(10,12,20,0.95)",
              borderRadius: 16,
              padding: 16,
              border: "1px solid rgba(120,120,150,0.4)"
            }}
          >
            <h2 style={{ fontSize: 18 }}>Admin Tools</h2>
            <ul style={{ fontSize: 14, paddingLeft: 18 }}>
              <li>
                <Link href="/admin/training">AI Training Dataset</Link>
              </li>
              <li>
                <Link href="/admin/roles">Admin Role Management (owner only)</Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 style={{ fontSize: 18 }}>Admin Chat</h2>
            <AdminChat />
          </div>
        </section>
      </div>
    </AuthGuard>
  );
}
