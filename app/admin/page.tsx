"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!password.trim()) return;
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/admin/dashboard");
    } else {
      setError("Contraseña incorrecta. Intenta de nuevo.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center"
      style={{ background: "linear-gradient(135deg,#0f172a 0%,#1e1b4b 100%)" }}>
      <div className="w-full max-w-sm mx-4">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-3">🦘</div>
          <h1 className="text-3xl font-black text-white">Joey Analytics</h1>
          <p className="text-slate-400 mt-1 text-sm font-medium">Panel de administración</p>
        </div>

        {/* Card */}
        <form onSubmit={handleLogin}
          className="rounded-2xl p-8 flex flex-col gap-4"
          style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>

          <label className="text-slate-300 text-sm font-bold">Contraseña de acceso</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="••••••••"
            autoFocus
            className="w-full rounded-xl px-4 py-3 text-white font-medium outline-none text-base"
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.15)",
            }}
          />

          {error && (
            <p className="text-red-400 text-sm font-medium text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading || !password.trim()}
            className="w-full py-3 rounded-xl font-black text-white text-base transition-all"
            style={{
              background: password.trim() ? "#6366f1" : "rgba(255,255,255,0.1)",
              opacity: loading ? 0.7 : 1,
              cursor: password.trim() && !loading ? "pointer" : "not-allowed",
            }}>
            {loading ? "Verificando..." : "Entrar al panel →"}
          </button>
        </form>

        <p className="text-center text-slate-600 text-xs mt-6">
          Solo administradores autorizados
        </p>
      </div>
    </div>
  );
}
