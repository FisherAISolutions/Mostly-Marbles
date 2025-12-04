import AuthGuard from "@/components/AuthGuard";

export default function AdminRolesPage() {
  return (
    <AuthGuard role="owner">
      <div style={{ maxWidth: 520, display: "grid", gap: 16 }}>
        <h1>Admin Role Management</h1>
        <p style={{ opacity: 0.8, fontSize: 14 }}>
          This page should only be visible to the site owner. Connect this UI to your real auth and database to assign
          or revoke admin permissions by email.
        </p>
        <div
          style={{
            background: "rgba(10,12,20,0.95)",
            borderRadius: 16,
            padding: 16,
            border: "1px solid rgba(120,120,150,0.4)",
            fontSize: 14
          }}
        >
          <p>Form stub: add controls to search for users by email and toggle their roles.</p>
        </div>
      </div>
    </AuthGuard>
  );
}
