export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid rgba(120,120,150,0.3)",
        padding: "12px 24px",
        marginTop: "40px",
        fontSize: 12,
        opacity: 0.7
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between" }}>
        <span>© {new Date().getFullYear()} Mostly Marbles</span>
        <span>Built for marble collectors & AI enthusiasts.</span>
      </div>
    </footer>
  );
}
