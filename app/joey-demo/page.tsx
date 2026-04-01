"use client";

import { useState } from "react";
import { JoeyAnimated, JoeyState } from "@/components/JoeyAnimated";
import { useRouter } from "next/navigation";

const STATES: { label: string; value: JoeyState; color: string }[] = [
  { label: "Idle",     value: "idle",    color: "#8b5cf6" },
  { label: "Correr",   value: "run",     color: "#22c55e" },
  { label: "Saltar",   value: "jump",    color: "#3b82f6" },
  { label: "Emocionado", value: "excited", color: "#f59e0b" },
  { label: "Dead",     value: "dead",    color: "#ef4444" },
];

export default function JoeyDemoPage() {
  const [state, setState] = useState<JoeyState>("run");
  const [speed, setSpeed] = useState(1);
  const router = useRouter();

  return (
    <div style={{ minHeight:"100vh", background:"linear-gradient(135deg,#1e1040,#0f0a1e)",
      display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
      fontFamily:"system-ui,sans-serif", color:"white", gap:32, padding:24 }}>

      <button onClick={()=>router.push("/")}
        style={{ position:"fixed", top:14, left:14, background:"rgba(255,255,255,0.12)",
          border:"none", borderRadius:8, color:"white", padding:"6px 14px",
          cursor:"pointer", fontSize:13, fontWeight:"bold" }}>
        ← Inicio
      </button>

      <h1 style={{ fontSize:28, fontWeight:900, margin:0, color:"#fbbf24",
        textShadow:"0 0 20px rgba(251,191,36,0.4)" }}>
        🦘 Joey — Canguro 2D Animado
      </h1>

      {/* Main showcase */}
      <div style={{ display:"flex", alignItems:"flex-end", gap:48, flexWrap:"wrap", justifyContent:"center" }}>
        <JoeyAnimated state={state} size={220} speed={speed}/>

        {/* Small previews of all states */}
        <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
          <p style={{ margin:0, fontSize:12, color:"rgba(255,255,255,0.4)", textAlign:"center" }}>
            Todos los estados
          </p>
          <div style={{ display:"flex", gap:20, flexWrap:"wrap", justifyContent:"center" }}>
            {STATES.map(s => (
              <div key={s.value} style={{ display:"flex", flexDirection:"column",
                alignItems:"center", gap:6, cursor:"pointer",
                opacity: state===s.value ? 1 : 0.55, transition:"opacity 0.2s" }}
                onClick={() => setState(s.value)}>
                <div style={{ background: state===s.value ? `${s.color}33` : "rgba(255,255,255,0.05)",
                  borderRadius:16, padding:"8px 8px 0",
                  border:`2px solid ${state===s.value ? s.color : "transparent"}`,
                  transition:"all 0.2s" }}>
                  <JoeyAnimated state={s.value} size={72} speed={speed}/>
                </div>
                <span style={{ fontSize:11, fontWeight:700, color: state===s.value ? s.color : "rgba(255,255,255,0.5)" }}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:16,
        background:"rgba(255,255,255,0.06)", borderRadius:20, padding:"20px 32px" }}>

        {/* State buttons */}
        <div style={{ display:"flex", gap:10, flexWrap:"wrap", justifyContent:"center" }}>
          {STATES.map(s => (
            <button key={s.value} onClick={() => setState(s.value)}
              style={{ padding:"9px 20px", borderRadius:12, border:"none", cursor:"pointer",
                fontWeight:800, fontSize:14, transition:"all 0.15s",
                background: state===s.value ? s.color : "rgba(255,255,255,0.1)",
                color: state===s.value ? "white" : "rgba(255,255,255,0.6)",
                boxShadow: state===s.value ? `0 0 16px ${s.color}88` : "none",
                transform: state===s.value ? "scale(1.06)" : "scale(1)" }}>
              {s.label}
            </button>
          ))}
        </div>

        {/* Speed */}
        <div style={{ display:"flex", alignItems:"center", gap:14 }}>
          <span style={{ fontSize:13, color:"rgba(255,255,255,0.5)", width:80 }}>
            Velocidad ×{speed.toFixed(1)}
          </span>
          <input type="range" min="0.3" max="3" step="0.1" value={speed}
            onChange={e => setSpeed(Number(e.target.value))}
            style={{ width:180, accentColor:"#8b5cf6" }}/>
        </div>
      </div>

      <p style={{ fontSize:12, color:"rgba(255,255,255,0.25)", margin:0, textAlign:"center" }}>
        Componente SVG puro · CSS animations · sin dependencias externas
      </p>
    </div>
  );
}
