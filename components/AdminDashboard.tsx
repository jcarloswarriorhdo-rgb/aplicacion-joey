"use client";

import { useState, useEffect, useCallback } from "react";
import type { PlayerSession } from "@/lib/analytics";

// ── Helpers ────────────────────────────────────────────────────────────────────

function formatDuration(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  if (m < 60) return s > 0 ? `${m}m ${s}s` : `${m}m`;
  const h = Math.floor(m / 60);
  const rm = m % 60;
  return rm > 0 ? `${h}h ${rm}m` : `${h}h`;
}

function topCategory(cats: Record<string, number>): string {
  const entries = Object.entries(cats);
  if (!entries.length) return "—";
  return entries.sort((a, b) => b[1] - a[1])[0][0];
}

function relativeTime(iso: string): string {
  const diff = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (diff < 60) return "hace un momento";
  if (diff < 3600) return `hace ${Math.floor(diff / 60)}m`;
  if (diff < 86400) return `hace ${Math.floor(diff / 3600)}h`;
  return `hace ${Math.floor(diff / 86400)}d`;
}

function isToday(iso: string): boolean {
  const d = new Date(iso);
  const now = new Date();
  return d.getDate() === now.getDate() &&
    d.getMonth() === now.getMonth() &&
    d.getFullYear() === now.getFullYear();
}

function deviceIcon(device: string): string {
  if (device === "Móvil") return "📱";
  if (device === "Tablet") return "🪙";
  return "💻";
}

// ── Stat card ─────────────────────────────────────────────────────────────────

function StatCard({ label, value, sub, color }: {
  label: string; value: string | number; sub?: string; color: string;
}) {
  return (
    <div className="rounded-2xl p-5 flex flex-col gap-1"
      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
      <p className="text-xs font-bold uppercase tracking-widest" style={{ color }}>{label}</p>
      <p className="text-3xl font-black text-white">{value}</p>
      {sub && <p className="text-xs text-slate-500 font-medium">{sub}</p>}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export function AdminDashboard() {
  const [sessions, setSessions] = useState<PlayerSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [search, setSearch] = useState("");
  const [filterDevice, setFilterDevice] = useState("Todos");
  const [sortBy, setSortBy] = useState<"lastSeen" | "sessionStart" | "totalPlayTime" | "gamesCompleted">("lastSeen");
  const [sortDir, setSortDir] = useState<"desc" | "asc">("desc");
  const [clearing, setClearing] = useState(false);
  const [confirmClear, setConfirmClear] = useState(false);
  const [ticker, setTicker] = useState(0); // forces relative time re-render

  const fetchSessions = useCallback(async () => {
    try {
      const res = await fetch("/api/analytics/sessions", { cache: "no-store" });
      if (res.status === 401) { window.location.href = "/admin"; return; }
      const data = await res.json() as { sessions: PlayerSession[] };
      setSessions(data.sessions ?? []);
      setLastUpdated(new Date());
    } catch {
      // silent — will retry on next interval
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch + poll every 15s
  useEffect(() => {
    fetchSessions();
    const id = setInterval(fetchSessions, 15_000);
    return () => clearInterval(id);
  }, [fetchSessions]);

  // Tick relative timestamps every 30s
  useEffect(() => {
    const id = setInterval(() => setTicker(t => t + 1), 30_000);
    return () => clearInterval(id);
  }, []);

  async function handleLogout() {
    await fetch("/api/admin/auth", { method: "DELETE" });
    window.location.href = "/admin";
  }

  async function handleClear() {
    if (!confirmClear) { setConfirmClear(true); return; }
    setClearing(true);
    await fetch("/api/analytics/sessions", { method: "DELETE" });
    await fetchSessions();
    setClearing(false);
    setConfirmClear(false);
  }

  function toggleSort(col: typeof sortBy) {
    if (sortBy === col) setSortDir(d => d === "desc" ? "asc" : "desc");
    else { setSortBy(col); setSortDir("desc"); }
  }

  // ── Derived stats ────────────────────────────────────────────────────────────

  const todayCount = sessions.filter(s => isToday(s.lastSeen)).length;

  const allCats = sessions.flatMap(s => Object.entries(s.categories));
  const catTotals: Record<string, number> = {};
  allCats.forEach(([k, v]) => { catTotals[k] = (catTotals[k] || 0) + v; });
  const topCat = Object.entries(catTotals).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "—";

  const avgTime = sessions.length
    ? Math.round(sessions.reduce((a, s) => a + s.totalPlayTime, 0) / sessions.length)
    : 0;

  // ── Filtered + sorted ────────────────────────────────────────────────────────

  const filtered = sessions
    .filter(s =>
      (!search || s.playerName.toLowerCase().includes(search.toLowerCase())) &&
      (filterDevice === "Todos" || s.device === filterDevice)
    )
    .sort((a, b) => {
      const mul = sortDir === "desc" ? -1 : 1;
      if (sortBy === "lastSeen" || sortBy === "sessionStart") {
        return mul * (new Date(a[sortBy]).getTime() - new Date(b[sortBy]).getTime());
      }
      return mul * (a[sortBy] - b[sortBy]);
    });

  const SortBtn = ({ col, label }: { col: typeof sortBy; label: string }) => (
    <button onClick={() => toggleSort(col)}
      className="flex items-center gap-1 font-bold text-xs uppercase tracking-wide hover:text-white transition-colors cursor-pointer"
      style={{ color: sortBy === col ? "#a5b4fc" : "#64748b" }}>
      {label}
      <span style={{ opacity: sortBy === col ? 1 : 0.3 }}>
        {sortBy === col ? (sortDir === "desc" ? " ↓" : " ↑") : " ↕"}
      </span>
    </button>
  );

  return (
    <div className="min-h-screen"
      style={{ background: "linear-gradient(135deg,#0f172a 0%,#0f172a 60%,#1e1040 100%)" }}>

      {/* ── Header ────────────────────────────────────────────────────────── */}
      <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 border-b"
        style={{ background: "rgba(15,23,42,0.95)", backdropFilter: "blur(12px)", borderColor: "rgba(255,255,255,0.06)" }}>
        <div className="flex items-center gap-3">
          <span className="text-3xl">🦘</span>
          <div>
            <h1 className="text-lg font-black text-white">Joey Analytics</h1>
            <p className="text-xs text-slate-500 font-medium">
              {lastUpdated
                ? `Actualizado ${lastUpdated.toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}`
                : "Cargando…"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse inline-block"/>
            <span className="text-xs text-slate-400 font-medium hidden sm:inline">En vivo · 15s</span>
          </div>
          <button onClick={() => { fetchSessions(); }}
            className="px-3 py-1.5 rounded-lg text-xs font-bold text-slate-300 hover:text-white transition-colors cursor-pointer"
            style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)" }}>
            ↻ Actualizar
          </button>
          <button onClick={handleLogout}
            className="px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer"
            style={{ background: "rgba(239,68,68,0.12)", color: "#f87171", border: "1px solid rgba(239,68,68,0.2)" }}>
            Salir
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col gap-6">

        {/* ── Stat cards ────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Total jugadores" value={sessions.length} sub="desde el inicio" color="#a5b4fc" />
          <StatCard label="Activos hoy" value={todayCount} sub={new Date().toLocaleDateString("es-MX", { weekday: "long" })} color="#34d399" />
          <StatCard label="Categoría top" value={topCat || "—"} sub={topCat ? `${catTotals[topCat]} partidas` : undefined} color="#fbbf24" />
          <StatCard label="Tiempo promedio" value={formatDuration(avgTime)} sub="por sesión" color="#f472b6" />
        </div>

        {/* ── Filters ───────────────────────────────────────────────────── */}
        <div className="flex flex-wrap gap-3 items-center">
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Buscar por nombre…"
            className="rounded-xl px-4 py-2.5 text-sm text-white font-medium outline-none w-56"
            style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)" }}
          />
          {["Todos", "Desktop", "Móvil", "Tablet"].map(d => (
            <button key={d} onClick={() => setFilterDevice(d)}
              className="px-4 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer"
              style={{
                background: filterDevice === d ? "#6366f1" : "rgba(255,255,255,0.06)",
                color: filterDevice === d ? "white" : "#64748b",
                border: filterDevice === d ? "none" : "1px solid rgba(255,255,255,0.08)",
              }}>
              {d}
            </button>
          ))}
          <span className="ml-auto text-sm text-slate-500 font-medium">
            {filtered.length} de {sessions.length} registros
          </span>
        </div>

        {/* ── Table ─────────────────────────────────────────────────────── */}
        <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>

          {/* Table header */}
          <div className="grid gap-4 px-5 py-3"
            style={{ gridTemplateColumns: "2fr 1.2fr 1.5fr 1fr 1fr 1fr", background: "rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
            <span className="font-bold text-xs uppercase tracking-wide text-slate-500">Jugador</span>
            <span className="font-bold text-xs uppercase tracking-wide text-slate-500">Dispositivo</span>
            <span className="font-bold text-xs uppercase tracking-wide text-slate-500">Cat. favorita</span>
            <SortBtn col="gamesCompleted" label="Juegos" />
            <SortBtn col="totalPlayTime" label="Tiempo" />
            <SortBtn col="lastSeen" label="Últ. vez" />
          </div>

          {/* Rows */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-4xl animate-spin">⏳</div>
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 gap-2">
              <span className="text-5xl">🦘</span>
              <p className="text-slate-500 font-bold">Aún no hay jugadores registrados</p>
              <p className="text-slate-600 text-sm">Abre el juego para ver actividad aquí</p>
            </div>
          ) : (
            <div className="divide-y" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
              {filtered.map((s, i) => {
                const top = topCategory(s.categories);
                const isActive = (Date.now() - new Date(s.lastSeen).getTime()) < 5 * 60 * 1000;
                return (
                  <div key={s.id}
                    className="grid gap-4 px-5 py-4 items-center transition-colors hover:bg-white/[0.03]"
                    style={{ gridTemplateColumns: "2fr 1.2fr 1.5fr 1fr 1fr 1fr" }}>

                    {/* Name */}
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-sm font-black"
                        style={{ background: `hsl(${(i * 47) % 360},60%,35%)`, color: "white" }}>
                        {s.playerName[0]?.toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-white text-sm truncate">{s.playerName}</p>
                          {isActive && (
                            <span className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" title="Activo ahora"/>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 truncate">{s.ip}</p>
                      </div>
                    </div>

                    {/* Device */}
                    <div>
                      <p className="text-sm text-white font-medium">
                        {deviceIcon(s.device)} {s.device}
                      </p>
                      <p className="text-xs text-slate-500">{s.os} · {s.browser}</p>
                    </div>

                    {/* Top category */}
                    <div title={Object.entries(s.categories).map(([k, v]) => `${k}: ${v}`).join(", ")}>
                      <p className="text-sm text-white font-medium truncate">{top}</p>
                      <p className="text-xs text-slate-500">
                        {Object.keys(s.categories).length} categorías
                      </p>
                    </div>

                    {/* Games */}
                    <p className="text-sm font-bold text-white">{s.gamesCompleted}</p>

                    {/* Play time */}
                    <p className="text-sm font-bold text-white">{formatDuration(s.totalPlayTime)}</p>

                    {/* Last seen */}
                    <div key={ticker}>
                      <p className="text-xs text-slate-400 font-medium">{relativeTime(s.lastSeen)}</p>
                      <p className="text-xs text-slate-600">
                        {new Date(s.sessionStart).toLocaleDateString("es-MX", { day: "2-digit", month: "short" })}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* ── Danger zone ───────────────────────────────────────────────── */}
        <div className="flex justify-end pt-2">
          <button
            onClick={handleClear}
            disabled={clearing || sessions.length === 0}
            className="px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer"
            style={{
              background: confirmClear ? "rgba(239,68,68,0.25)" : "rgba(255,255,255,0.04)",
              color: confirmClear ? "#f87171" : "#475569",
              border: confirmClear ? "1px solid rgba(239,68,68,0.4)" : "1px solid rgba(255,255,255,0.06)",
            }}
            onBlur={() => setConfirmClear(false)}>
            {clearing ? "Borrando…" : confirmClear ? "⚠️ ¿Confirmar? Clic de nuevo" : "Limpiar todos los datos de prueba"}
          </button>
        </div>

      </div>
    </div>
  );
}
