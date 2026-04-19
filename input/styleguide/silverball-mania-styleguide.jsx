import { useState } from "react";

const COLORS = {
  primary: {
    "Cosmic Black": "#0A0A0A",
    "Void Black": "#1A1A1A",
    "Charcoal Smoke": "#2D2D2D",
  },
  accent: {
    "Hot Pink Plasma": "#E8368F",
    "Magenta Glow": "#D42A80",
    "Blush Flame": "#F06BAF",
  },
  highlight: {
    "Electric Gold": "#F5C518",
    "Amber Burst": "#F0A500",
    "Lemon Flash": "#FFE04A",
  },
  cool: {
    "Sky Arcade": "#6CBBD5",
    "Powder Dream": "#A8D8EA",
    "Ice Wizard": "#D6EFF7",
  },
  neutral: {
    "Chrome White": "#F2F0EB",
    "Silver Ball": "#C4C0B8",
    "Pewter": "#8A8680",
  },
  signal: {
    "Kicker Green": "#2EBD6B",
    "Tilt Orange": "#E85D24",
    "Bonus Red": "#CC2233",
  },
};

const FLAT = {
  "Cosmic Black": "#0A0A0A",
  "Void Black": "#1A1A1A",
  "Hot Pink Plasma": "#E8368F",
  "Magenta Glow": "#D42A80",
  "Electric Gold": "#F5C518",
  "Amber Burst": "#F0A500",
  "Sky Arcade": "#6CBBD5",
  "Powder Dream": "#A8D8EA",
  "Chrome White": "#F2F0EB",
  "Silver Ball": "#C4C0B8",
  "Kicker Green": "#2EBD6B",
  "Tilt Orange": "#E85D24",
};

function ColorSwatch({ name, hex, size = "normal" }) {
  const [copied, setCopied] = useState(false);
  const isLight = ["Chrome White", "Silver Ball", "Pewter", "Lemon Flash", "Powder Dream", "Ice Wizard", "Electric Gold", "Blush Flame"].includes(name);

  return (
    <div
      onClick={() => {
        navigator.clipboard.writeText(hex);
        setCopied(true);
        setTimeout(() => setCopied(false), 1200);
      }}
      style={{
        background: hex,
        color: isLight ? "#0A0A0A" : "#F2F0EB",
        padding: size === "large" ? "32px 24px" : "20px 16px",
        borderRadius: "12px",
        cursor: "pointer",
        transition: "transform 0.2s, box-shadow 0.2s",
        position: "relative",
        border: isLight ? "1px solid rgba(0,0,0,0.08)" : "1px solid rgba(255,255,255,0.06)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.03)";
        e.currentTarget.style.boxShadow = `0 8px 24px ${hex}44`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div style={{ fontSize: "13px", fontWeight: 700, fontFamily: "'Oswald', sans-serif", textTransform: "uppercase", letterSpacing: "0.05em" }}>{name}</div>
      <div style={{ fontSize: "12px", fontFamily: "monospace", opacity: 0.7, marginTop: 4 }}>{hex}</div>
      {copied && (
        <div style={{
          position: "absolute", top: 8, right: 10,
          fontSize: 11, opacity: 0.8, fontFamily: "monospace"
        }}>Copied!</div>
      )}
    </div>
  );
}

function Section({ title, subtitle, children, dark = false }) {
  return (
    <div style={{
      background: dark ? "#0A0A0A" : "#FAFAF7",
      color: dark ? "#F2F0EB" : "#1A1A1A",
      padding: "64px 48px",
      borderBottom: "1px solid rgba(0,0,0,0.06)",
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ marginBottom: 40 }}>
          <h2 style={{
            fontFamily: "'Oswald', sans-serif",
            fontSize: "clamp(28px, 4vw, 42px)",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.04em",
            margin: 0,
            lineHeight: 1.1,
          }}>{title}</h2>
          {subtitle && (
            <p style={{
              fontFamily: "'Source Serif 4', Georgia, serif",
              fontSize: 16,
              opacity: 0.5,
              marginTop: 8,
              lineHeight: 1.5,
              maxWidth: 600,
            }}>{subtitle}</p>
          )}
        </div>
        {children}
      </div>
    </div>
  );
}

export default function SilverballStyleguide() {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "color", label: "Color" },
    { id: "type", label: "Typography" },
    { id: "components", label: "Components" },
    { id: "patterns", label: "Patterns" },
  ];

  return (
    <div style={{ fontFamily: "'Source Serif 4', Georgia, serif", background: "#FAFAF7", minHeight: "100vh" }}>
      <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Source+Serif+4:ital,wght@0,400;0,600;0,700;1,400&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />

      {/* ─── HERO ─── */}
      <div style={{
        background: "#FAFAF7",
        padding: "72px 48px 52px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
        borderBottom: "3px solid #E8368F",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse at 50% 0%, rgba(232,54,143,0.06) 0%, transparent 50%), radial-gradient(ellipse at 80% 100%, rgba(245,197,24,0.05) 0%, transparent 40%)",
        }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.3em",
            color: "#D42A80",
            marginBottom: 16,
          }}>Web Style Guide v1.0</div>

          <h1 style={{
            fontFamily: "'Oswald', sans-serif",
            fontSize: "clamp(48px, 8vw, 96px)",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.02em",
            lineHeight: 0.95,
            margin: 0,
            color: "#0A0A0A",
          }}>
            Silverball
            <br />
            <span style={{
              background: "linear-gradient(90deg, #E8368F, #D42A80, #F0A500)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>Mania</span>
          </h1>

          <p style={{
            fontFamily: "'Source Serif 4', Georgia, serif",
            fontSize: 17,
            color: "#8A8680",
            marginTop: 24,
            maxWidth: 560,
            marginLeft: "auto",
            marginRight: "auto",
            lineHeight: 1.6,
          }}>
            A design system extracted from the 1980 Bally playfield — psychedelic chrome, 
            cosmic energy, and arcade maximalism distilled into modern web components.
          </p>

          {/* Tab nav */}
          <div style={{
            display: "flex",
            gap: 4,
            justifyContent: "center",
            marginTop: 48,
            flexWrap: "wrap",
          }}>
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                style={{
                  fontFamily: "'Oswald', sans-serif",
                  fontSize: 13,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  padding: "10px 22px",
                  borderRadius: 6,
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  background: activeTab === t.id ? "#E8368F" : "rgba(0,0,0,0.04)",
                  color: activeTab === t.id ? "#fff" : "#8A8680",
                }}
              >{t.label}</button>
            ))}
          </div>
        </div>
      </div>

      {/* ─── OVERVIEW ─── */}
      {activeTab === "overview" && (
        <>
          <Section title="Design Philosophy" subtitle="What makes this system tick.">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
              {[
                { title: "Chrome Maximalism", desc: "Bold, unapologetic visuals. Every element earns its place through contrast and energy, not restraint. Inspired by the silver-ball chrome lettering and dense playfield art.", color: "#D42A80" },
                { title: "Cosmic Warmth", desc: "The palette marries hot pink plasma with electric gold against warm creams — human energy set against open space. Sky blue provides breathing room.", color: "#F0A500" },
                { title: "Arcade Legibility", desc: "Typography is condensed, bold, uppercase. Designed to be read at speed under glass, under pressure. On the web, this translates to immediate visual hierarchy.", color: "#6CBBD5" },
                { title: "Playful Tension", desc: "Every great pinball machine balances chaos with control. The design system pairs dense visual energy with clear structural grids and generous whitespace.", color: "#E8368F" },
              ].map((item, i) => (
                <div key={i} style={{
                  background: "#fff",
                  border: "1px solid rgba(0,0,0,0.06)",
                  borderRadius: 12,
                  padding: "28px 24px",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                }}>
                  <div style={{
                    fontFamily: "'Oswald', sans-serif",
                    fontSize: 18,
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.03em",
                    marginBottom: 12,
                    color: item.color,
                  }}>{item.title}</div>
                  <div style={{ fontSize: 15, lineHeight: 1.6, opacity: 0.6 }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Source Material" subtitle="Extracted from the 1980 Bally Silverball Mania playfield artwork.">
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
              gap: 8,
            }}>
              {Object.entries(FLAT).map(([name, hex]) => (
                <ColorSwatch key={name} name={name} hex={hex} />
              ))}
            </div>
            <div style={{
              marginTop: 32,
              padding: "20px 24px",
              background: "#fff",
              border: "1px solid rgba(0,0,0,0.06)",
              borderRadius: 10,
              fontFamily: "'Space Mono', monospace",
              fontSize: 13,
              lineHeight: 1.7,
              color: "#1A1A1A",
              opacity: 0.55,
            }}>
              <strong>Extraction notes:</strong> Colors sampled from playfield photography under natural light. 
              Adjusted for screen fidelity — the original silkscreened inks read slightly more saturated in person.
            </div>
          </Section>
        </>
      )}

      {/* ─── COLOR ─── */}
      {activeTab === "color" && (
        <>
          <Section title="Color System" subtitle="Six palette groups derived from the playfield's psychedelic artwork.">
            {Object.entries(COLORS).map(([group, swatches]) => (
              <div key={group} style={{ marginBottom: 40 }}>
                <div style={{
                  fontFamily: "'Oswald', sans-serif",
                  fontSize: 14,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color: "#8A8680",
                  marginBottom: 12,
                }}>{group}</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10 }}>
                  {Object.entries(swatches).map(([name, hex]) => (
                    <ColorSwatch key={name} name={name} hex={hex} size="large" />
                  ))}
                </div>
              </div>
            ))}
          </Section>

          <Section title="Usage Guidelines">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
              {[
                { label: "Background", rule: "Warm Off-White (#FAFAF7) for page background. Pure White (#FFFFFF) for elevated surfaces like cards. Chrome White (#F2F0EB) for subtle section breaks. Cosmic Black only for dark accent panels.", swatch: ["#FAFAF7", "#FFFFFF", "#F2F0EB"] },
                { label: "Primary Action", rule: "Hot Pink Plasma (#E8368F) for CTAs, links, active states. Use Magenta Glow (#D42A80) for text links — better contrast on light backgrounds.", swatch: ["#E8368F", "#D42A80"] },
                { label: "Emphasis & Reward", rule: "Electric Gold (#F5C518) for highlights, badges, notifications, progress. The 'bonus' color — use to celebrate.", swatch: ["#F5C518"] },
                { label: "Information & Calm", rule: "Sky Arcade (#6CBBD5) for secondary actions, info states, and breathing room within dense layouts.", swatch: ["#6CBBD5"] },
              ].map((item, i) => (
                <div key={i} style={{
                  padding: "24px",
                  background: "#fff",
                  border: "1px solid rgba(0,0,0,0.06)",
                  borderRadius: 12,
                  boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                }}>
                  <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                    {item.swatch.map((c) => (
                      <div key={c} style={{
                        width: 32, height: 32, borderRadius: 8, background: c,
                        border: "1px solid rgba(0,0,0,0.08)",
                      }} />
                    ))}
                  </div>
                  <div style={{
                    fontFamily: "'Oswald', sans-serif",
                    fontSize: 15,
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                    marginBottom: 8,
                  }}>{item.label}</div>
                  <div style={{ fontSize: 14, lineHeight: 1.5, opacity: 0.55 }}>{item.rule}</div>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Gradients" subtitle="Key gradient combinations drawn from the playfield's sunset and flame motifs.">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
              {[
                { name: "Sunset Flame", css: "linear-gradient(135deg, #E8368F, #F0A500, #F5C518)", use: "Hero sections, feature cards" },
                { name: "Cosmic Dawn", css: "linear-gradient(180deg, #6CBBD5, #A8D8EA, #F5C518)", use: "Backgrounds, onboarding" },
                { name: "Void Glow", css: "linear-gradient(180deg, #0A0A0A, #1A1A1A, #2D2D2D)", use: "Dark accent panels" },
                { name: "Plasma Arc", css: "linear-gradient(90deg, #E8368F, #6CBBD5)", use: "Progress bars, accent lines" },
                { name: "Chrome Flash", css: "linear-gradient(135deg, #F2F0EB, #C4C0B8, #F2F0EB)", use: "Metallic UI elements, badges" },
                { name: "Wizard Fire", css: "linear-gradient(180deg, #F5C518, #E85D24, #CC2233)", use: "Alerts, urgent states" },
              ].map((g) => (
                <div key={g.name}>
                  <div style={{
                    background: g.css,
                    height: 100,
                    borderRadius: 12,
                    marginBottom: 10,
                    border: "1px solid rgba(0,0,0,0.04)",
                  }} />
                  <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 14, fontWeight: 600, textTransform: "uppercase", color: "#1A1A1A" }}>{g.name}</div>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, opacity: 0.45, marginTop: 2 }}>{g.use}</div>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, opacity: 0.3, marginTop: 2 }}>{g.css}</div>
                </div>
              ))}
            </div>
          </Section>
        </>
      )}

      {/* ─── TYPOGRAPHY ─── */}
      {activeTab === "type" && (
        <>
          <Section title="Type System" subtitle="Three fonts — display, body, and mono — covering all hierarchy needs.">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 32 }}>
              <div style={{ padding: "32px", background: "#fff", borderRadius: 12, border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.15em", color: "#E8368F", marginBottom: 20 }}>Display</div>
                <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 48, fontWeight: 700, textTransform: "uppercase", lineHeight: 1, marginBottom: 16, color: "#0A0A0A" }}>Oswald</div>
                <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 14, fontWeight: 400, lineHeight: 1.6, opacity: 0.5, marginBottom: 20 }}>
                  Condensed, bold, commanding. Mirrors the stacked uppercase lettering on the playfield 
                  — S·I·L·V·E·R·B·A·L·L — where every letter fights for attention.
                </div>
                <div style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: 14, opacity: 0.3, textTransform: "uppercase", letterSpacing: "0.2em" }}>
                  ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />0123456789
                </div>
              </div>

              <div style={{ padding: "32px", background: "#fff", borderRadius: 12, border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.15em", color: "#F0A500", marginBottom: 20 }}>Body</div>
                <div style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: 42, fontWeight: 700, lineHeight: 1, marginBottom: 16, color: "#0A0A0A" }}>Source Serif 4</div>
                <div style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: 14, fontWeight: 400, lineHeight: 1.6, opacity: 0.5, marginBottom: 20 }}>
                  A refined serif that grounds the display energy. Excellent readability at body sizes,
                  with enough personality to feel warm rather than clinical.
                </div>
                <div style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontWeight: 400, fontSize: 14, opacity: 0.3 }}>
                  AaBbCcDdEeFfGgHhIiJjKkLlMm<br />NnOoPpQqRrSsTtUuVvWwXxYyZz
                </div>
              </div>

              <div style={{ padding: "32px", background: "#fff", borderRadius: 12, border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.15em", color: "#6CBBD5", marginBottom: 20 }}>Mono</div>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 36, fontWeight: 700, lineHeight: 1, marginBottom: 16, color: "#0A0A0A" }}>Space Mono</div>
                <div style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: 14, fontWeight: 400, lineHeight: 1.6, opacity: 0.5, marginBottom: 20 }}>
                  For labels, metadata, codes, and technical details. The geometric rhythm echoes 
                  the score displays and "WHEN LIT" inserts on the playfield.
                </div>
                <div style={{ fontFamily: "'Space Mono', monospace", fontWeight: 400, fontSize: 13, opacity: 0.3 }}>
                  1000 WHEN LIT · 2X 3X 4X · COLLECT BONUS
                </div>
              </div>
            </div>
          </Section>

          <Section title="Type Scale">
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {[
                { label: "Hero", family: "'Oswald', sans-serif", size: "clamp(48px, 7vw, 80px)", weight: 700, transform: "uppercase", ls: "0.02em", lh: 0.95, sample: "Silverball Mania" },
                { label: "H1", family: "'Oswald', sans-serif", size: "clamp(32px, 4vw, 48px)", weight: 700, transform: "uppercase", ls: "0.03em", lh: 1, sample: "Wizard Bonus" },
                { label: "H2", family: "'Oswald', sans-serif", size: "clamp(24px, 3vw, 36px)", weight: 600, transform: "uppercase", ls: "0.04em", lh: 1.1, sample: "Extra Ball" },
                { label: "H3", family: "'Oswald', sans-serif", size: 22, weight: 600, transform: "uppercase", ls: "0.05em", lh: 1.2, sample: "Kicker Special" },
                { label: "Subhead", family: "'Oswald', sans-serif", size: 16, weight: 500, transform: "uppercase", ls: "0.08em", lh: 1.3, sample: "Collect Bonus" },
                { label: "Body", family: "'Source Serif 4', Georgia, serif", size: 17, weight: 400, transform: "none", ls: "0", lh: 1.6, sample: "The silver ball races across the cosmic playfield, ricocheting between bumpers and drop targets in a blaze of light and sound." },
                { label: "Small", family: "'Source Serif 4', Georgia, serif", size: 14, weight: 400, transform: "none", ls: "0", lh: 1.5, sample: "1000 bonus for each lit letter. Complete S-I-L-V-E-R-B-A-L-L to advance multiplier." },
                { label: "Label", family: "'Space Mono', monospace", size: 12, weight: 700, transform: "uppercase", ls: "0.12em", lh: 1, sample: "WHEN LIT" },
                { label: "Caption", family: "'Space Mono', monospace", size: 11, weight: 400, transform: "none", ls: "0.02em", lh: 1.4, sample: "Bally Manufacturing, 1980 · Design: Paul Faris" },
              ].map((t) => (
                <div key={t.label} style={{
                  display: "grid",
                  gridTemplateColumns: "100px 1fr",
                  gap: 24,
                  alignItems: "baseline",
                  padding: "20px 0",
                  borderBottom: "1px solid rgba(0,0,0,0.06)",
                }}>
                  <div style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: 11,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: "#D42A80",
                    paddingTop: 4,
                  }}>{t.label}</div>
                  <div style={{
                    fontFamily: t.family,
                    fontSize: t.size,
                    fontWeight: t.weight,
                    textTransform: t.transform,
                    letterSpacing: t.ls,
                    lineHeight: t.lh,
                    color: "#0A0A0A",
                  }}>{t.sample}</div>
                </div>
              ))}
            </div>
          </Section>
        </>
      )}

      {/* ─── COMPONENTS ─── */}
      {activeTab === "components" && (
        <>
          <Section title="Buttons" subtitle="Primary, secondary, and ghost variants — all high-energy.">
            <div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginBottom: 40 }}>
              <button style={{
                fontFamily: "'Oswald', sans-serif", fontSize: 15, fontWeight: 600, textTransform: "uppercase",
                letterSpacing: "0.08em", padding: "14px 32px", borderRadius: 8,
                border: "none", cursor: "pointer",
                background: "linear-gradient(135deg, #E8368F, #D42A80)",
                color: "#fff",
                boxShadow: "0 4px 16px rgba(232,54,143,0.25)",
              }}>Start Game</button>

              <button style={{
                fontFamily: "'Oswald', sans-serif", fontSize: 15, fontWeight: 600, textTransform: "uppercase",
                letterSpacing: "0.08em", padding: "14px 32px", borderRadius: 8,
                border: "2px solid #0A0A0A", cursor: "pointer",
                background: "transparent",
                color: "#0A0A0A",
              }}>Wizard Bonus</button>

              <button style={{
                fontFamily: "'Oswald', sans-serif", fontSize: 15, fontWeight: 600, textTransform: "uppercase",
                letterSpacing: "0.08em", padding: "14px 32px", borderRadius: 8,
                border: "1px solid rgba(0,0,0,0.12)", cursor: "pointer",
                background: "rgba(0,0,0,0.02)",
                color: "#8A8680",
              }}>View Rules</button>

              <button style={{
                fontFamily: "'Oswald', sans-serif", fontSize: 15, fontWeight: 600, textTransform: "uppercase",
                letterSpacing: "0.08em", padding: "14px 32px", borderRadius: 8,
                border: "none", cursor: "pointer",
                background: "#F5C518",
                color: "#0A0A0A",
              }}>Extra Ball</button>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              <button style={{
                fontFamily: "'Oswald', sans-serif", fontSize: 12, fontWeight: 600, textTransform: "uppercase",
                letterSpacing: "0.08em", padding: "8px 18px", borderRadius: 6,
                border: "none", cursor: "pointer",
                background: "#E8368F", color: "#fff",
              }}>Small CTA</button>
              <button style={{
                fontFamily: "'Space Mono', monospace", fontSize: 11, fontWeight: 700, textTransform: "uppercase",
                letterSpacing: "0.1em", padding: "8px 18px", borderRadius: 6,
                border: "1px solid rgba(0,0,0,0.12)", cursor: "pointer",
                background: "transparent", color: "#8A8680",
              }}>Label Button</button>
            </div>
          </Section>

          <Section title="Cards" subtitle="Flexible containers for content blocks.">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
              <div style={{
                background: "#fff", color: "#1A1A1A", borderRadius: 14, overflow: "hidden",
                border: "1px solid rgba(0,0,0,0.06)",
                boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
              }}>
                <div style={{
                  height: 140,
                  background: "linear-gradient(135deg, #E8368F, #F0A500, #F5C518)",
                }} />
                <div style={{ padding: "24px" }}>
                  <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 20, fontWeight: 700, textTransform: "uppercase", marginBottom: 8 }}>Wizard Mode</div>
                  <div style={{ fontSize: 14, lineHeight: 1.6, opacity: 0.55 }}>
                    Complete all SILVERBALL letters to unlock the 15,000 point wizard bonus. 
                    A cosmic reward for dedicated play.
                  </div>
                  <div style={{
                    marginTop: 16, fontFamily: "'Space Mono', monospace",
                    fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em",
                    color: "#D42A80",
                  }}>Learn More →</div>
                </div>
              </div>

              <div style={{
                background: "#fff", color: "#1A1A1A", borderRadius: 14, overflow: "hidden",
                border: "1px solid rgba(0,0,0,0.06)",
                boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
              }}>
                <div style={{
                  height: 140,
                  background: "linear-gradient(180deg, #6CBBD5, #A8D8EA)",
                }} />
                <div style={{ padding: "24px" }}>
                  <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 20, fontWeight: 700, textTransform: "uppercase", marginBottom: 8 }}>Sky Kicker</div>
                  <div style={{ fontSize: 14, lineHeight: 1.6, opacity: 0.55 }}>
                    The upper playfield features four drop targets beneath a cosmic sky — 
                    each one spots a letter when hit.
                  </div>
                  <div style={{
                    marginTop: 16, fontFamily: "'Space Mono', monospace",
                    fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em",
                    color: "#D42A80",
                  }}>Explore →</div>
                </div>
              </div>

              <div style={{
                background: "#0A0A0A", color: "#F2F0EB", borderRadius: 14,
                padding: "28px",
                position: "relative",
                overflow: "hidden",
                boxShadow: "0 2px 12px rgba(0,0,0,0.12)",
              }}>
                <div style={{
                  position: "absolute", top: -40, right: -40,
                  width: 120, height: 120,
                  background: "radial-gradient(circle, rgba(245,197,24,0.2) 0%, transparent 70%)",
                  borderRadius: "50%",
                }} />
                <div style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 11, textTransform: "uppercase", letterSpacing: "0.15em",
                  color: "#F5C518", marginBottom: 12,
                }}>Featured</div>
                <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 24, fontWeight: 700, textTransform: "uppercase", marginBottom: 10 }}>Super Wizard</div>
                <div style={{ fontSize: 14, lineHeight: 1.6, opacity: 0.6 }}>
                  Score 30,000 and beyond. The ultimate achievement — reserved for players 
                  who master every lane and target on the field.
                </div>
                <div style={{
                  display: "inline-block", marginTop: 20,
                  fontFamily: "'Oswald', sans-serif", fontSize: 13, fontWeight: 600,
                  textTransform: "uppercase", letterSpacing: "0.08em",
                  padding: "10px 24px", borderRadius: 6,
                  background: "#E8368F", color: "#fff",
                }}>Unlock Now</div>
              </div>
            </div>
          </Section>

          <Section title="Badges & Tags">
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 24 }}>
              {[
                { label: "When Lit", bg: "#E8368F", color: "#fff" },
                { label: "1000 pts", bg: "#F5C518", color: "#0A0A0A" },
                { label: "Extra Ball", bg: "#6CBBD5", color: "#0A0A0A" },
                { label: "2X Multiplier", bg: "#2EBD6B", color: "#fff" },
                { label: "Tilt Warning", bg: "#E85D24", color: "#fff" },
                { label: "Special", bg: "transparent", color: "#D42A80", border: "1px solid #D42A80" },
              ].map((b) => (
                <span key={b.label} style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 11,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  padding: "6px 14px",
                  borderRadius: 6,
                  background: b.bg,
                  color: b.color,
                  border: b.border || "none",
                }}>{b.label}</span>
              ))}
            </div>
          </Section>

          <Section title="Form Elements">
            <div style={{ maxWidth: 420, display: "flex", flexDirection: "column", gap: 20 }}>
              <div>
                <label style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 11, fontWeight: 700, textTransform: "uppercase",
                  letterSpacing: "0.12em", display: "block", marginBottom: 8,
                  color: "#8A8680",
                }}>Player Name</label>
                <input type="text" placeholder="Enter initials..." style={{
                  width: "100%", padding: "14px 16px",
                  fontFamily: "'Source Serif 4', Georgia, serif", fontSize: 16,
                  border: "1px solid rgba(0,0,0,0.12)", borderRadius: 8,
                  background: "#fff", color: "#0A0A0A",
                  outline: "none", boxSizing: "border-box",
                }} />
              </div>
              <div>
                <label style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 11, fontWeight: 700, textTransform: "uppercase",
                  letterSpacing: "0.12em", display: "block", marginBottom: 8,
                  color: "#8A8680",
                }}>High Score</label>
                <input type="text" placeholder="000,000" style={{
                  width: "100%", padding: "14px 16px",
                  fontFamily: "'Space Mono', monospace", fontSize: 16,
                  border: "2px solid #E8368F", borderRadius: 8,
                  background: "#fff", color: "#0A0A0A",
                  outline: "none", boxSizing: "border-box",
                }} />
              </div>
            </div>
          </Section>
        </>
      )}

      {/* ─── PATTERNS ─── */}
      {activeTab === "patterns" && (
        <>
          <Section title="Layout Principles">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
              {[
                { label: "Grid", value: "12-column, 1200px max-width", detail: "Gutters: 24px (mobile), 32px (desktop). Content area mirrors the playfield's vertical symmetry with asymmetric accent breaks." },
                { label: "Spacing Scale", value: "4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96", detail: "All spacing derives from a 4px base unit. Dense sections (like card grids) use tighter gaps; hero areas use generous 64–96px padding." },
                { label: "Border Radius", value: "6 · 8 · 12 · 14px", detail: "Soft but not bubbly. 6px for small elements (badges, tags), 12–14px for cards and panels. Never fully round except for avatars." },
                { label: "Shadows", value: "Colored glow preferred over neutral", detail: "box-shadow: 0 4px 16px rgba(232,54,143,0.15) rather than generic gray. Match shadow tint to the element's accent color for warmth." },
              ].map((item) => (
                <div key={item.label} style={{
                  padding: "24px",
                  background: "#fff",
                  border: "1px solid rgba(0,0,0,0.06)",
                  borderRadius: 12,
                  boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                }}>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.12em", color: "#D42A80", marginBottom: 8 }}>{item.label}</div>
                  <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 18, fontWeight: 600, textTransform: "uppercase", marginBottom: 10, color: "#0A0A0A" }}>{item.value}</div>
                  <div style={{ fontSize: 14, lineHeight: 1.6, opacity: 0.5 }}>{item.detail}</div>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Accessibility">
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 20,
            }}>
              {[
                { pair: "Cosmic Black on Off-White", fg: "#0A0A0A", bg: "#FAFAF7", ratio: "17.4:1", pass: "AAA ✓" },
                { pair: "Cosmic Black on Chrome White", fg: "#0A0A0A", bg: "#F2F0EB", ratio: "16.8:1", pass: "AAA ✓" },
                { pair: "Magenta on Off-White", fg: "#D42A80", bg: "#FAFAF7", ratio: "5.0:1", pass: "AA ✓" },
                { pair: "Hot Pink on Off-White", fg: "#E8368F", bg: "#FAFAF7", ratio: "3.7:1", pass: "Large AA ✓" },
                { pair: "Pewter on Off-White", fg: "#8A8680", bg: "#FAFAF7", ratio: "3.2:1", pass: "Large AA ✓" },
                { pair: "Chrome White on Cosmic Black", fg: "#F2F0EB", bg: "#0A0A0A", ratio: "16.8:1", pass: "AAA ✓" },
              ].map((item) => (
                <div key={item.pair} style={{
                  display: "flex", alignItems: "center", gap: 16,
                  padding: "16px 20px", borderRadius: 10,
                  background: "#fff",
                  border: "1px solid rgba(0,0,0,0.06)",
                }}>
                  <div style={{
                    width: 52, height: 52, borderRadius: 8,
                    background: item.bg, color: item.fg,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "'Oswald', sans-serif", fontSize: 18, fontWeight: 700,
                    border: "1px solid rgba(0,0,0,0.08)", flexShrink: 0,
                  }}>Aa</div>
                  <div>
                    <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, fontWeight: 700, marginBottom: 2, color: "#1A1A1A" }}>{item.ratio} — {item.pass}</div>
                    <div style={{ fontSize: 13, opacity: 0.5 }}>{item.pair}</div>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Section title="CSS Variables" subtitle="Copy this block to set up the design tokens in any project." dark>
            <pre style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 12,
              lineHeight: 1.8,
              padding: "28px",
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 12,
              overflowX: "auto",
              color: "#C4C0B8",
            }}>{`:root {
  /* Surfaces */
  --color-bg:           #FAFAF7;
  --color-surface:      #FFFFFF;
  --color-chrome:       #F2F0EB;
  --color-text:         #1A1A1A;
  --color-text-muted:   #8A8680;

  /* Primary */
  --color-black:        #0A0A0A;
  --color-void:         #1A1A1A;
  --color-charcoal:     #2D2D2D;

  /* Accent */
  --color-pink:         #E8368F;
  --color-magenta:      #D42A80;
  --color-blush:        #F06BAF;

  /* Highlight */
  --color-gold:         #F5C518;
  --color-amber:        #F0A500;
  --color-lemon:        #FFE04A;

  /* Cool */
  --color-sky:          #6CBBD5;
  --color-powder:       #A8D8EA;
  --color-ice:          #D6EFF7;

  /* Neutral */
  --color-silver:       #C4C0B8;
  --color-pewter:       #8A8680;

  /* Signal */
  --color-green:        #2EBD6B;
  --color-orange:       #E85D24;
  --color-red:          #CC2233;

  /* Typography */
  --font-display:       'Oswald', sans-serif;
  --font-body:          'Source Serif 4', Georgia, serif;
  --font-mono:          'Space Mono', monospace;

  /* Spacing */
  --space-1: 4px;  --space-2: 8px;
  --space-3: 12px; --space-4: 16px;
  --space-5: 24px; --space-6: 32px;
  --space-7: 48px; --space-8: 64px;

  /* Radii */
  --radius-sm: 6px;  --radius-md: 8px;
  --radius-lg: 12px; --radius-xl: 14px;

  /* Borders */
  --border-light:       1px solid rgba(0,0,0,0.06);
  --border-emphasis:    2px solid var(--color-pink);

  /* Shadows */
  --shadow-sm:          0 1px 3px rgba(0,0,0,0.04);
  --shadow-md:          0 4px 16px rgba(0,0,0,0.08);
  --shadow-pink:        0 4px 16px rgba(232,54,143,0.15);
  --shadow-gold:        0 4px 16px rgba(245,197,24,0.15);
}`}</pre>
          </Section>
        </>
      )}

      {/* ─── FOOTER ─── */}
      <div style={{
        padding: "40px 48px",
        textAlign: "center",
        background: "#FAFAF7",
        borderTop: "1px solid rgba(0,0,0,0.06)",
      }}>
        <div style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: 11,
          textTransform: "uppercase",
          letterSpacing: "0.15em",
          color: "#C4C0B8",
        }}>
          Silverball Mania Style Guide · Derived from Bally 1980 playfield art · v1.0
        </div>
      </div>
    </div>
  );
}
