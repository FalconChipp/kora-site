import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "KORA — Care. Insight. Better Outcomes.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          backgroundColor: "#10281D",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Mark */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="60 90 520 520"
          width={72}
          height={72}
          style={{ marginBottom: 32 }}
        >
          <g transform="translate(60 90)">
            <rect x="0" y="0" width="178" height="520" rx="46" ry="46" fill="#FFFFFF" />
            <path d="M 230 230 C 230 103 322 0 442 0 L 520 0 C 512 121 417 230 286 230 Z" fill="#5D8545" />
            <path d="M 220 275 C 350 275 470 374 520 520 L 365 520 C 281 488 220 396 220 275 Z" fill="#FFFFFF" />
          </g>
        </svg>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              fontSize: 20,
              fontWeight: 600,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#7AAE5D",
            }}
          >
            KORA
          </div>
          <div
            style={{
              fontSize: 56,
              fontWeight: 700,
              color: "#F5F0E8",
              lineHeight: 1.1,
              maxWidth: 800,
            }}
          >
            Care. Insight. Better Outcomes.
          </div>
          <div
            style={{
              fontSize: 24,
              color: "rgba(245,240,232,0.55)",
              marginTop: 8,
            }}
          >
            The outcomes platform for residential children's care.
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 48,
            right: 80,
            fontSize: 16,
            color: "rgba(245,240,232,0.3)",
            letterSpacing: "0.05em",
          }}
        >
          koraplatform.co.uk
        </div>
      </div>
    ),
    { ...size }
  );
}
