"use client";

import { useEffect, useRef } from "react";

export type JoeyState = "idle" | "run" | "jump" | "dead" | "excited";

interface Props {
  state?: JoeyState;
  size?: number;
  /** Override animation speed multiplier (default 1) */
  speed?: number;
}

// ─── CSS injected once ───────────────────────────────────────────────────────
const CSS = `
@keyframes joey-bob      { 0%,100%{transform:translateY(0)}  50%{transform:translateY(-6px)} }
@keyframes joey-run-body { 0%,100%{transform:translateY(0) rotate(0deg)} 25%{transform:translateY(-3px) rotate(-2deg)} 75%{transform:translateY(2px) rotate(1deg)} }
@keyframes joey-leg-f    { 0%,100%{transform:rotate(-28deg)} 50%{transform:rotate(28deg)} }
@keyframes joey-leg-b    { 0%,100%{transform:rotate(28deg)}  50%{transform:rotate(-28deg)} }
@keyframes joey-foot-f   { 0%,100%{transform:rotate(12deg)}  50%{transform:rotate(-18deg)} }
@keyskiej joey-foot-b    { 0%,100%{transform:rotate(-12deg)} 50%{transform:rotate(18deg)}  }
@keyframes joey-arm-f    { 0%,100%{transform:rotate(-18deg)} 50%{transform:rotate(22deg)}  }
@keyframes joey-arm-b    { 0%,100%{transform:rotate(22deg)}  50%{transform:rotate(-18deg)} }
@keyframes joey-tail-sway{ 0%,100%{transform:rotate(-8deg)}  50%{transform:rotate(8deg)}  }
@keyframes joey-ear-twitch { 0%,85%,100%{transform:rotate(0deg)} 90%,95%{transform:rotate(-10deg)} }
@keyframes joey-jump-body { 0%{transform:translateY(0) scaleX(1) scaleY(1)} 40%{transform:translateY(-38px) scaleX(0.92) scaleY(1.08)} 70%{transform:translateY(-32px) scaleX(1.05) scaleY(0.96)} 100%{transform:translateY(0) scaleX(1) scaleY(1)} }
@keyframes joey-jump-legs { 0%,100%{transform:rotate(0deg)}  45%{transform:rotate(-35deg)} }
@keyframes joey-blink     { 0%,90%,100%{transform:scaleY(1)} 95%{transform:scaleY(0.1)} }
@keyframes joey-dead-spin { 0%{transform:rotate(0deg) translateY(0)} 100%{transform:rotate(360deg) translateY(20px)} }
@keyframes joey-excited-bounce { 0%,100%{transform:translateY(0) scaleX(1) scaleY(1)} 30%{transform:translateY(-14px) scaleX(0.95) scaleY(1.05)} 60%{transform:translateY(-8px) scaleX(1.04) scaleY(0.97)} }
`;

let cssInjected = false;
function injectCSS() {
  if (cssInjected || typeof document === "undefined") return;
  const el = document.createElement("style");
  el.textContent = CSS;
  document.head.appendChild(el);
  cssInjected = true;
}

// ─── Component ───────────────────────────────────────────────────────────────
export function JoeyAnimated({ state = "idle", size = 180, speed = 1 }: Props) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => { injectCSS(); }, []);

  const dur = (s: number) => `${(s / speed).toFixed(2)}s`;

  // animation config per state
  const isRun      = state === "run";
  const isJump     = state === "jump";
  const isDead     = state === "dead";
  const isExcited  = state === "excited";
  const isIdle     = state === "idle";

  // body animation
  const bodyAnim = isDead
    ? `joey-dead-spin ${dur(0.7)} ease-in forwards`
    : isJump
    ? `joey-jump-body ${dur(0.55)} ease-in-out infinite`
    : isRun
    ? `joey-run-body ${dur(0.36)} ease-in-out infinite`
    : isExcited
    ? `joey-excited-bounce ${dur(0.45)} ease-in-out infinite`
    : `joey-bob ${dur(2.2)} ease-in-out infinite`;

  const legRunDur = dur(0.36);
  const tailAnim = `joey-tail-sway ${isRun ? dur(0.36) : dur(1.8)} ease-in-out infinite`;
  const earAnim  = isIdle || isExcited ? `joey-ear-twitch ${dur(3)} ease-in-out infinite` : "none";
  const blinkAnim = `joey-blink ${dur(4)} ease-in-out infinite`;

  // colours
  const bodyCol  = "#E8953A";
  const bodyDark = "#C26A20";
  const bellyCol = "#F5D8A8";
  const earInner = "#F2A07A";

  const w = size, h = size * 1.3;

  return (
    <svg
      ref={ref}
      width={w} height={h}
      viewBox="0 0 120 156"
      xmlns="http://www.w3.org/2000/svg"
      style={{ overflow: "visible", userSelect: "none" }}
    >
      <defs>
        <radialGradient id="jb" cx="40%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#F5A84A"/>
          <stop offset="100%" stopColor={bodyDark}/>
        </radialGradient>
        <radialGradient id="jh" cx="38%" cy="28%" r="62%">
          <stop offset="0%" stopColor="#F5A84A"/>
          <stop offset="100%" stopColor="#C87428"/>
        </radialGradient>
        <radialGradient id="jbelly" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#FEF0D8"/>
          <stop offset="100%" stopColor={bellyCol}/>
        </radialGradient>
        <filter id="jshadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="1" dy="2" stdDeviation="2" floodColor="rgba(0,0,0,0.25)"/>
        </filter>
      </defs>

      {/* ── ROOT group (body animation) ── */}
      <g style={{ transformOrigin:"60px 100px", animation: bodyAnim }}>

        {/* ── TAIL ── */}
        <g style={{ transformOrigin:"52px 98px", animation: tailAnim }}>
          <path d="M52,98 Q28,110 34,128 Q38,138 44,132 Q36,122 40,112 Q46,104 54,100Z"
            fill={bodyDark} opacity="0.9"/>
          <path d="M52,98 Q30,108 36,126 Q39,133 43,128 Q37,119 41,111 Q46,104 53,101Z"
            fill={bodyCol} opacity="0.6"/>
        </g>

        {/* ── BACK LEGS ── */}
        {/* Thigh back */}
        <g style={{ transformOrigin:"58px 106px", animation: isRun ? `joey-leg-b ${legRunDur} ease-in-out infinite` : isJump ? `joey-jump-legs ${dur(0.55)} ease-in-out infinite` : "none" }}>
          <rect x="50" y="100" width="16" height="26" rx="7" fill={bodyDark} opacity="0.85"/>
          {/* Shin back */}
          <g style={{ transformOrigin:"58px 126px", animation: isRun ? `joey-foot-f ${legRunDur} ease-in-out infinite` : "none" }}>
            <rect x="51" y="124" width="14" height="20" rx="6" fill={bodyCol}/>
            <ellipse cx="55" cy="144" rx="10" ry="5" fill={bodyDark} opacity="0.75"/>
          </g>
        </g>
        {/* Thigh front */}
        <g style={{ transformOrigin:"62px 106px", animation: isRun ? `joey-leg-f ${legRunDur} ease-in-out infinite` : isJump ? `joey-jump-legs ${dur(0.55)} ease-in-out infinite 0.1s` : "none" }}>
          <rect x="54" y="100" width="16" height="26" rx="7" fill={bodyCol}/>
          {/* Shin front */}
          <g style={{ transformOrigin:"62px 126px", animation: isRun ? `joey-foot-b ${legRunDur} ease-in-out infinite` : "none" }}>
            <rect x="55" y="124" width="14" height="20" rx="6" fill={bodyCol}/>
            <ellipse cx="59" cy="144" rx="10" ry="5" fill={bodyDark} opacity="0.55"/>
          </g>
        </g>

        {/* ── BODY ── */}
        <ellipse cx="60" cy="96" rx="26" ry="32" fill="url(#jb)" filter="url(#jshadow)"/>
        {/* belly */}
        <ellipse cx="60" cy="98" rx="15" ry="22" fill="url(#jbelly)" opacity="0.85"/>

        {/* ── ARMS ── */}
        {/* Arm back */}
        <g style={{ transformOrigin:"44px 80px", animation: isRun ? `joey-arm-b ${legRunDur} ease-in-out infinite` : "none" }}>
          <path d="M44,80 Q34,90 36,102 Q38,106 42,104 Q40,94 46,84Z" fill={bodyDark} opacity="0.8"/>
        </g>
        {/* Arm front */}
        <g style={{ transformOrigin:"48px 80px", animation: isRun ? `joey-arm-f ${legRunDur} ease-in-out infinite` : "none" }}>
          <path d="M48,80 Q38,90 40,100 Q42,104 46,102 Q44,92 50,82Z" fill={bodyCol}/>
        </g>

        {/* ── NECK ── */}
        <path d="M53,72 Q56,64 60,62 Q64,64 67,72 Q64,76 60,77 Q56,76 53,72Z"
          fill={bodyCol}/>

        {/* ── HEAD ── */}
        <g style={{ transformOrigin:"60px 52px" }}>
          {/* Ears */}
          <g style={{ transformOrigin:"50px 28px", animation: earAnim }}>
            <ellipse cx="50" cy="30" rx="7" ry="16" fill={bodyDark} transform="rotate(-8,50,46)"/>
            <ellipse cx="50" cy="30" rx="4" ry="11" fill={earInner} opacity="0.7" transform="rotate(-8,50,46)"/>
          </g>
          <g style={{ transformOrigin:"70px 28px", animation: earAnim }}>
            <ellipse cx="70" cy="30" rx="7" ry="16" fill={bodyDark} transform="rotate(8,70,46)"/>
            <ellipse cx="70" cy="30" rx="4" ry="11" fill={earInner} opacity="0.7" transform="rotate(8,70,46)"/>
          </g>

          {/* Head shape */}
          <ellipse cx="60" cy="52" rx="20" ry="22" fill="url(#jh)" filter="url(#jshadow)"/>
          {/* Snout */}
          <ellipse cx="60" cy="60" rx="11" ry="8" fill={bellyCol} opacity="0.9"/>
          {/* Nose */}
          <ellipse cx="60" cy="57" rx="5" ry="3.5" fill="#2D1400"/>
          <ellipse cx="58.5" cy="56" rx="1.5" ry="1" fill="rgba(255,255,255,0.35)"/>

          {/* Eyes */}
          {/* Eye left */}
          <g style={{ transformOrigin:"52px 46px", animation: blinkAnim }}>
            <ellipse cx="52" cy="46" rx="5.5" ry="6" fill="#1A2A4A"/>
            <ellipse cx="50" cy="44" rx="1.8" ry="2" fill="white" opacity="0.7"/>
            <ellipse cx="54" cy="44" rx="1" ry="1" fill="rgba(255,255,255,0.4)"/>
            {/* iris */}
            <ellipse cx="52" cy="46" rx="3.5" ry="3.8" fill="#3B82F6" opacity="0.8"/>
            <ellipse cx="52" cy="46" rx="2" ry="2.2" fill="#1A2A4A"/>
          </g>
          {/* Eye right */}
          <g style={{ transformOrigin:"68px 46px", animation: blinkAnim }}>
            <ellipse cx="68" cy="46" rx="5.5" ry="6" fill="#1A2A4A"/>
            <ellipse cx="66" cy="44" rx="1.8" ry="2" fill="white" opacity="0.7"/>
            <ellipse cx="70" cy="44" rx="1" ry="1" fill="rgba(255,255,255,0.4)"/>
            <ellipse cx="68" cy="46" rx="3.5" ry="3.8" fill="#3B82F6" opacity="0.8"/>
            <ellipse cx="68" cy="46" rx="2" ry="2.2" fill="#1A2A4A"/>
          </g>

          {/* Eyebrows */}
          {isDead ? (
            <>
              <path d="M47,40 L57,42" stroke={bodyDark} strokeWidth="2" strokeLinecap="round" transform="rotate(15,52,41)"/>
              <path d="M63,40 L73,42" stroke={bodyDark} strokeWidth="2" strokeLinecap="round" transform="rotate(-15,68,41)"/>
            </>
          ) : isExcited || isJump ? (
            <>
              <path d="M47,40 Q52,36 57,40" stroke={bodyDark} strokeWidth="2" fill="none" strokeLinecap="round"/>
              <path d="M63,40 Q68,36 73,40" stroke={bodyDark} strokeWidth="2" fill="none" strokeLinecap="round"/>
            </>
          ) : (
            <>
              <path d="M47,41 Q52,39 57,41" stroke={bodyDark} strokeWidth="1.8" fill="none" strokeLinecap="round"/>
              <path d="M63,41 Q68,39 73,41" stroke={bodyDark} strokeWidth="1.8" fill="none" strokeLinecap="round"/>
            </>
          )}

          {/* Mouth */}
          {isDead ? (
            <path d="M55,64 Q60,60 65,64" stroke={bodyDark} strokeWidth="1.8" fill="none" strokeLinecap="round"/>
          ) : isExcited || isJump ? (
            <path d="M55,64 Q60,69 65,64" stroke={bodyDark} strokeWidth="2" fill="none" strokeLinecap="round"/>
          ) : (
            <path d="M56,64 Q60,67 64,64" stroke={bodyDark} strokeWidth="1.8" fill="none" strokeLinecap="round"/>
          )}

          {/* Cheek blush */}
          {(isExcited || isIdle) && (
            <>
              <ellipse cx="46" cy="54" rx="5" ry="3" fill="#F97316" opacity="0.25"/>
              <ellipse cx="74" cy="54" rx="5" ry="3" fill="#F97316" opacity="0.25"/>
            </>
          )}

          {/* Hair tuft */}
          <path d="M56,32 Q58,22 60,26 Q62,20 64,28 Q62,24 60,30 Q58,24 56,32Z"
            fill={bodyDark} opacity="0.9"/>
        </g>

        {/* ── SHORTS ── */}
        <path d="M42,106 Q44,118 50,122 L70,122 Q76,118 78,106 Q72,110 60,110 Q48,110 42,106Z"
          fill="#3B82F6" opacity="0.88"/>
        <path d="M58,108 L58,122 M62,108 L62,122" stroke="rgba(255,255,255,0.25)" strokeWidth="1"/>
        {/* rope belt */}
        <path d="M42,106 Q60,112 78,106" stroke="#D4A574" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
        {/* knot */}
        <circle cx="60" cy="108" r="3.5" fill="#C8955A"/>
        <circle cx="60" cy="108" r="2" fill="#B07840"/>
      </g>

      {/* ── GROUND SHADOW ── */}
      <ellipse cx="60" cy="152" rx={isJump ? 10 : 18} ry="3"
        fill="rgba(0,0,0,0.18)"
        style={{ transition:"rx 0.3s ease" }}/>
    </svg>
  );
}
