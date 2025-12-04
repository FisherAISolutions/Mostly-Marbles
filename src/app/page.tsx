import { MarbleCard } from "@/components/MarbleCard";

export default function Home() {
  return (
    <div style={{ display: "grid", gap: 32 }}>
      <section
        style={{
          position: "relative",
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.6fr) minmax(0, 1fr)",
          gap: 32,
          alignItems: "center"
        }}
      >
        <div>
          <span className="badge">AI-Powered Marble Hub</span>
          <h1 style={{ fontSize: 44, margin: "18px 0 12px" }}>
            Collect, trade & identify marbles —
            <br />
            all in one beautiful place.
          </h1>
          <p style={{ fontSize: 16, opacity: 0.85, maxWidth: 540 }}>
            Mostly Marbles combines a curated marketplace with an evolving AI identifier trained by real collectors.
            Upload a photo, get an opinion, explore rarities, and help teach the system as you go.
          </p>

          <div style={{ display: "flex", gap: 12, marginTop: 20, flexWrap: "wrap" }}>
            <a
              href="/marketplace"
              style={{
                borderRadius: 999,
                padding: "10px 20px",
                background: "linear-gradient(135deg, #8ab4ff, #7bdcb5)",
                color: "#050509",
                fontWeight: 600,
                fontSize: 14
              }}
            >
              Explore Marketplace
            </a>
            <a
              href="/identify"
              style={{
                borderRadius: 999,
                padding: "10px 18px",
                border: "1px solid rgba(138,180,255,0.7)",
                fontSize: 13
              }}
            >
              Try AI Identifier
            </a>
          </div>
        </div>

        <div
          style={{
            position: "relative",
            padding: 20
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              filter: "blur(42px)",
              background:
                "radial-gradient(circle at 0% 0%, rgba(138,180,255,0.7), transparent 60%), radial-gradient(circle at 100% 100%, rgba(123,220,181,0.6), transparent 60%)",
              opacity: 0.6
            }}
          />
          <div className="glass-card" style={{ position: "relative" }}>
            <MarbleCard
              title="German Onionskin Lutz"
              type="Handmade"
              origin="Germany • c.1900"
              rarity="Very high"
              price="$480"
            />
            <div style={{ marginTop: 12, fontSize: 12, opacity: 0.85 }}>
              Example listing preview. Actual listings are managed in the marketplace and updated in real time.
            </div>
          </div>
        </div>
      </section>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: 18,
          fontSize: 14
        }}
      >
        <div className="glass-card" style={{ padding: 18 }}>
          <h2 style={{ fontSize: 18, marginTop: 0 }}>Marketplace</h2>
          <p style={{ opacity: 0.85 }}>
            Deep metadata on every listing — type, origin, maker, era, rarity — so collectors can buy with confidence.
          </p>
        </div>
        <div className="glass-card" style={{ padding: 18 }}>
          <h2 style={{ fontSize: 18, marginTop: 0 }}>AI Identifier</h2>
          <p style={{ opacity: 0.85 }}>
            Upload high-resolution photos and get AI-assisted guesses based on texture, pontil marks, color bands and
            interior design.
          </p>
        </div>
        <div className="glass-card" style={{ padding: 18 }}>
          <h2 style={{ fontSize: 18, marginTop: 0 }}>Curated Training</h2>
          <p style={{ opacity: 0.85 }}>
            A private admin dashboard lets trusted experts add fully described reference marbles to sharpen the model
            over time.
          </p>
        </div>
      </section>
    </div>
  );
}
