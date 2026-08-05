import { NextResponse } from "next/server";

/**
 * GET /api/stats
 * Devuelve datos de ejemplo o consulta BOT_STATS_URL si está configurada.
 */
export async function GET() {
  const BOT_STATS_URL = process.env.BOT_STATS_URL;

  if (BOT_STATS_URL) {
    try {
      const res = await fetch(BOT_STATS_URL);
      if (res.ok) {
        const data = await res.json();
        return NextResponse.json({ source: "bot", ...data });
      }
    } catch (err) {
      console.error("Error fetching BOT_STATS_URL:", err);
    }
  }

  // fallback estático
  const example = {
    guilds: 1250,
    users: 385000,
    uptime: "99.9%"
  };

  return NextResponse.json({ source: "static", ...example });
}