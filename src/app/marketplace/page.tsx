import { MarbleCard } from "@/components/MarbleCard";

const mockListings = [
  { id: "1", title: "Onionskin Lutz", type: "Handmade", origin: "German", price: "$420", rarity: "Very High" },
  { id: "2", title: "Akro Agate Patch", type: "Machine-made", origin: "USA", price: "$35", rarity: "Medium" },
  { id: "3", title: "Christensen Swirl", type: "Machine-made", origin: "USA", price: "$120", rarity: "High" },
  { id: "4", title: "Mica Cloud", type: "Handmade", origin: "Unknown", price: "$260", rarity: "High" }
];

export default function MarketplacePage() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          gap: 16,
          flexWrap: "wrap"
        }}
      >
        <div>
          <h1>Marketplace</h1>
          <p style={{ opacity: 0.8, fontSize: 14 }}>
            Browse, buy, and list marbles from collectors worldwide. This is a static preview — wire it to your database
            and auth for real listings.
          </p>
        </div>
        <button
          style={{
            borderRadius: 999,
            border: "none",
            padding: "10px 20px",
            background: "linear-gradient(135deg, #8ab4ff, #7bdcb5)",
            color: "#050509",
            fontWeight: 600,
            fontSize: 13
          }}
        >
          + New Listing (stub)
        </button>
      </header>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
          gap: 18
        }}
      >
        {mockListings.map((m) => (
          <MarbleCard
            key={m.id}
            title={m.title}
            type={m.type}
            origin={m.origin}
            price={m.price}
            rarity={m.rarity}
          />
        ))}
      </section>
    </div>
  );
}
