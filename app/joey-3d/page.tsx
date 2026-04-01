"use client";

import dynamic from "next/dynamic";
import { Suspense, useState } from "react";
import { useRouter } from "next/navigation";
import type { Joey3DState } from "@/components/joey3d/JoeyMesh";

// Dynamic import — Three.js is client-only
const Joey3DScene = dynamic(() => import("@/components/joey3d/Joey3DScene"), { ssr: false });

const STATES: { label: string; value: Joey3DState; emoji: string; color: string }[] = [
  { label: "Idle",      value: "idle",    emoji:"😌", color:"#8b5cf6" },
  { label: "Correr",    value: "run",     emoji:"🏃", color:"#22c55e" },
  { label: "Saltar",    value: "jump",    emoji:"⬆️", color:"#3b82f6" },
  { label: "Emocionado",value: "excited", emoji:"🎉", color:"#f59e0b" },
  { label: "💀 Dead",   value: "dead",    emoji:"💀", color:"#ef4444" },
];

export default function Joey3DPage() {
  const [state,   setState]   = useState<Joey3DState>("idle");
  const [speed,   setSpeed]   = useState(1);
  const [envPreset, setEnv]   = useState<"sunset"|"dawn"|"night"|"warehouse"|"forest"|"apartment"|"studio">("sunset");
  const router = useRouter();

  const ENV_OPTIONS = ["sunset","dawn","night","warehouse","forest","apartment","studio"] as const;

  return (
    <div style={{
      minHeight:"100vh", background:"linear-gradient(135deg,#0f0a1e,#1e1040,#0a1628)",
      display:"flex", flexDirection:"column", alignItems:"center",
      fontFamily:"system-ui,sans-serif", color:"white",
    }}>
      {/* Back */}
      <button onClick={()=>router.push("/")}
        style={{ position:"fixed", top:14, left:14, zIndex:100,
          background:"rgba(255,255,255,0.12)", border:"none", borderRadius:8,
          color:"white", padding:"6px 14px", cursor:"pointer", fontSize:13, fontWeight:"bold" }}>
        ← Inicio
      </button>

      {/* Header */}
      <div style={{ paddingTop:24, textAlign:"center", zIndex:10 }}>
        <h1 style={{ fontSize:26, fontWeight:900, margin:"0 0 4px",
          background:"linear-gradient(90deg,#fbbf24,#a78bfa)", WebkitBackgroundClip:"text",
          WebkitTextFillColor:"transparent" }}>
          🦘 Joey 3D
        </h1>
        <p style={{ margin:0, fontSize:12, color:"rgba(255,255,255,0.35)" }}>
          Three.js · React Three Fiber · Drei · React Spring
        </p>
      </div>

      {/* 3D Canvas */}
      <div style={{ width:"100%", maxWidth:700, height:480, position:"relative", flexShrink:0 }}>
        <Suspense fallback={
          <div style={{ height:"100%", display:"flex", alignItems:"center", justifyContent:"center",
            color:"rgba(255,255,255,0.4)", fontSize:14 }}>
            Cargando 3D...
          </div>
        }>
          <Joey3DScene state={state} speed={speed} envPreset={envPreset}/>
        </Suspense>
      </div>

      {/* Controls */}
      <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:14,
        padding:"16px 24px 28px", width:"100%", maxWidth:600 }}>

        {/* State buttons */}
        <div style={{ display:"flex", gap:8, flexWrap:"wrap", justifyContent:"center" }}>
          {STATES.map(s => (
            <button key={s.value} onClick={() => setState(s.value)}
              style={{
                padding:"9px 18px", borderRadius:12, border:"none", cursor:"pointer",
                fontWeight:800, fontSize:13, transition:"all 0.15s",
                background: state===s.value ? s.color : "rgba(255,255,255,0.1)",
                color: "white",
                boxShadow: state===s.value ? `0 0 18px ${s.color}99` : "none",
                transform: state===s.value ? "scale(1.08)" : "scale(1)",
              }}>
              {s.emoji} {s.label}
            </button>
          ))}
        </div>

        {/* Speed + Environment */}
        <div style={{ display:"flex", gap:24, flexWrap:"wrap", justifyContent:"center",
          background:"rgba(255,255,255,0.06)", borderRadius:16, padding:"14px 24px" }}>

          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <span style={{ fontSize:12, color:"rgba(255,255,255,0.5)", width:90 }}>
              Velocidad ×{speed.toFixed(1)}
            </span>
            <input type="range" min="0.3" max="3" step="0.1" value={speed}
              onChange={e => setSpeed(Number(e.target.value))}
              style={{ width:140, accentColor:"#8b5cf6" }}/>
          </div>

          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <span style={{ fontSize:12, color:"rgba(255,255,255,0.5)" }}>Ambiente</span>
            <select value={envPreset} onChange={e=>setEnv(e.target.value as typeof envPreset)}
              style={{ background:"rgba(255,255,255,0.1)", border:"1px solid rgba(255,255,255,0.2)",
                borderRadius:8, color:"white", padding:"4px 10px", fontSize:12, cursor:"pointer" }}>
              {ENV_OPTIONS.map(p => <option key={p} value={p} style={{background:"#1e1040"}}>{p}</option>)}
            </select>
          </div>
        </div>

        <p style={{ margin:0, fontSize:11, color:"rgba(255,255,255,0.2)", textAlign:"center" }}>
          Arrastra para rotar · Scroll para zoom · Click derecho para mover
        </p>
      </div>
    </div>
  );
}
