type MarbleCardProps = {
  title: string;
  type: string;
  origin: string;
  price?: string;
  rarity?: string;
};

export function MarbleCard({ title, type, origin, price, rarity }: MarbleCardProps) {
  return (
    <article
      style={{
        background:
          "radial-gradient(circle at top left, rgba(255,255,255,0.06), rgba(10,12,25,0.98))",
        borderRadius: 20,
        padding: 16,
        border: "1px solid rgba(138, 180, 255, 0.4)",
        display: "grid",
        gap: 6,
        boxShadow:
          "0 18px 40px rgba(0,0,0,0.75)"
      }}
    >
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
        <div>
          <h3 style={{ margin: 0, fontSize: 16 }}>{title}</h3>
          <p style={{ margin: 0, fontSize: 12, opacity: 0.75 }}>
            {type} • {origin}
          </p>
        </div>
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: "999px",
            background:
              "radial-gradient(circle at 30% 30%, #ffffff, #7bdcb5 35%, #1b2735 80%)",
            boxShadow: "0 0 18px rgba(123,220,181,0.9)"
          }}
        />
      </header>
      {rarity && (
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            alignSelf: "flex-start",
            padding: "2px 10px",
            borderRadius: 999,
            border: "1px solid rgba(255,255,255,0.28)",
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: 0.08,
            opacity: 0.85
          }}
        >
          Rarity: {rarity}
        </span>
      )}
      {price && (
        <p style={{ margin: "6px 0 0", fontSize: 14, fontWeight: 600 }}>
          {price}
        </p>
      )}
    </article>
  );
}
