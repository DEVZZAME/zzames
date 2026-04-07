import { ImageResponse } from "next/og";

import { profile } from "@/lib/portfolio-data";

export const alt = "강한솔 포트폴리오";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          background:
            "linear-gradient(135deg, rgba(248,250,252,1) 0%, rgba(227,238,245,1) 45%, rgba(205,224,235,1) 100%)",
          color: "#162033",
          padding: "56px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            border: "1px solid rgba(22,32,51,0.08)",
            borderRadius: "32px",
            padding: "44px",
            backgroundColor: "rgba(255,255,255,0.78)",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            <div
              style={{
                fontSize: "20px",
                letterSpacing: "0.32em",
                textTransform: "uppercase",
                color: "#4d6177",
              }}
            >
              Back-end Developer Portfolio
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <div style={{ fontSize: "62px", fontWeight: 700, lineHeight: 1.1 }}>
                Designing data flows
              </div>
              <div style={{ fontSize: "62px", fontWeight: 700, lineHeight: 1.1 }}>
                into working services
              </div>
            </div>
            <div style={{ fontSize: "28px", color: "#4d6177", lineHeight: 1.4, maxWidth: "850px" }}>
              Settlement reconciliation, payout systems, external integrations, operational automation,
              and serverless delivery.
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <div style={{ fontSize: "34px", fontWeight: 700 }}>Hansol Kang</div>
              <div style={{ fontSize: "24px", color: "#4d6177" }}>{profile.email}</div>
            </div>
            <div
              style={{
                display: "flex",
                padding: "14px 22px",
                borderRadius: "999px",
                backgroundColor: "#162033",
                color: "#f8fafc",
                fontSize: "22px",
              }}
            >
              zzames.vercel.app
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
