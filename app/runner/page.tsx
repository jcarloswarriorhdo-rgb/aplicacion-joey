"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

// Preload Joey sprite
let joeyImg: HTMLImageElement | null = null;
if (typeof window !== "undefined") {
  joeyImg = new window.Image();
  joeyImg.src = "/joey.png";
}

// ─── Constants ───────────────────────────────────────────────────────────────
const CW = 800, CH = 400;
const GY = 318;          // ground surface y
const KX = 110;          // kangaroo x (fixed)
const GRAVITY = 0.58;
const JUMP_V = -13.5;
const DJUMP_V = -10.5;
const MAX_LIVES = 3;

// ─── Stages ──────────────────────────────────────────────────────────────────
const STAGES = [
  { name: "Desierto 🏜️",  sky: ["#f97316","#fbbf24"], ground: ["#d4a017","#7c5a00"], dur: 25, sp: 4,    types: ["roca"],                          rate: 90 },
  { name: "Sabana 🌿",     sky: ["#4ade80","#16a34a"], ground: ["#65a30d","#365314"], dur: 30, sp: 5.5,  types: ["roca","ave"],                    rate: 72 },
  { name: "Bosque 🌲",     sky: ["#164e63","#0e7490"], ground: ["#14532d","#052e16"], dur: 35, sp: 7.5,  types: ["roca","ave","doble"],            rate: 58 },
  { name: "Ciudad 🏙️",    sky: ["#1e293b","#334155"], ground: ["#374151","#111827"], dur: 40, sp: 9.5,  types: ["roca","ave","doble","muro"],     rate: 47 },
  { name: "Galaxia ⚡",    sky: ["#2e1065","#4c1d95"], ground: ["#1e1b4b","#0f0a1e"], dur: 45, sp: 12,   types: ["roca","ave","doble","muro","ave2"], rate: 38 },
];

// obstacle: w=width h=height fy=px above ground
const OBS: Record<string,{w:number,h:number,fy:number}> = {
  roca:  { w: 44, h: 44, fy: 0   },
  doble: { w: 88, h: 44, fy: 0   },
  muro:  { w: 22, h: 80, fy: 0   },
  ave:   { w: 52, h: 28, fy: 88  },
  ave2:  { w: 52, h: 28, fy: 148 },
};

// ─── Leaderboard ─────────────────────────────────────────────────────────────
interface LBEntry { name: string; score: number; stages: number; date: string }
const LB_KEY = "joey_runner_lb";

function getLB(): LBEntry[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(LB_KEY) || "[]"); }
  catch { return []; }
}

function saveLB(e: LBEntry): LBEntry[] {
  const lb = getLB();
  lb.push(e);
  lb.sort((a, b) => b.score - a.score);
  const top = lb.slice(0, 20);
  localStorage.setItem(LB_KEY, JSON.stringify(top));
  return top;
}

// ─── Game State ───────────────────────────────────────────────────────────────
type Phase = "menu" | "playing" | "stageend" | "gameover" | "victory";

interface Obs  { type:string; x:number; y:number; w:number; h:number; passed:boolean }
interface Particle { x:number; y:number; vx:number; vy:number; life:number; max:number; color:string; r:number }

interface GS {
  phase: Phase;
  si: number;
  score: number;
  total: number;
  lives: number;
  timeLeft: number;
  ticks: number;
  speed: number;
  gx: number;
  // kangaroo
  ky: number; kvy: number; kjumps: number; kinv: number; kleg: number;
  kdead: boolean; krot: number;
  obs: Obs[];
  nextObs: number;
  combo: number;
  particles: Particle[];
  playerName: string;
}

function initGS(name: string): GS {
  return {
    phase: "menu", si: 0, score: 0, total: 0, lives: MAX_LIVES,
    timeLeft: STAGES[0].dur, ticks: 0, speed: STAGES[0].sp, gx: 0,
    ky: GY, kvy: 0, kjumps: 0, kinv: 0, kleg: 0,
    kdead: false, krot: 0,
    obs: [], nextObs: 80, combo: 0, particles: [],
    playerName: name,
  };
}

function startStage(gs: GS, si: number): GS {
  const s = STAGES[si];
  return { ...gs, phase: "playing", si, score: 0, lives: MAX_LIVES,
    timeLeft: s.dur, ticks: 0, speed: s.sp, gx: 0,
    ky: GY, kvy: 0, kjumps: 0, kinv: 0, kleg: 0,
    kdead: false, krot: 0, obs: [], nextObs: 80, combo: 0, particles: [] };
}

// ─── Canvas Helpers ───────────────────────────────────────────────────────────
function rr(ctx: CanvasRenderingContext2D, x:number, y:number, w:number, h:number, r:number) {
  ctx.beginPath();
  ctx.moveTo(x+r,y); ctx.lineTo(x+w-r,y); ctx.quadraticCurveTo(x+w,y,x+w,y+r);
  ctx.lineTo(x+w,y+h-r); ctx.quadraticCurveTo(x+w,y+h,x+w-r,y+h);
  ctx.lineTo(x+r,y+h); ctx.quadraticCurveTo(x,y+h,x,y+h-r);
  ctx.lineTo(x,y+r); ctx.quadraticCurveTo(x,y,x+r,y); ctx.closePath();
}

const KANG_H = 130; // sprite height in canvas px
const KANG_W = 90;  // sprite width in canvas px

function drawKang(ctx: CanvasRenderingContext2D, footY:number, legT:number, inAir:boolean, dead:boolean, rot:number) {
  ctx.save();

  const cx = KX, cy = footY - KANG_H;

  if (dead) { ctx.translate(cx + KANG_W/2, cy + KANG_H/2); ctx.rotate(rot); ctx.translate(-(cx + KANG_W/2), -(cy + KANG_H/2)); }

  // bounce/squash when running on ground
  const scaleX = inAir ? 1 : 1 + Math.sin(legT * Math.PI * 4) * 0.04;
  const scaleY = inAir ? 1 : 1 - Math.sin(legT * Math.PI * 4) * 0.04;

  ctx.translate(cx + KANG_W/2, cy + KANG_H/2);
  ctx.scale(scaleX, scaleY);
  ctx.translate(-(cx + KANG_W/2), -(cy + KANG_H/2));

  if (joeyImg?.complete && joeyImg.naturalWidth > 0) {
    // use real Joey sprite
    if (dead) ctx.globalAlpha = 0.7;
    ctx.drawImage(joeyImg, cx - 10, cy - 10, KANG_W + 20, KANG_H + 20);
    ctx.globalAlpha = 1;
  } else {
    // fallback: simple shape
    ctx.fillStyle = "#f0a355";
    rr(ctx, cx, cy, KANG_W, KANG_H, 20); ctx.fill();
    ctx.fillStyle = "white"; ctx.font = "bold 28px system-ui"; ctx.textAlign = "center";
    ctx.fillText("🦘", cx + KANG_W/2, cy + KANG_H/2 + 10);
  }

  void inAir; void legT;
  ctx.restore();
}

function drawObs(ctx: CanvasRenderingContext2D, o: Obs, t: number) {
  ctx.save();
  switch (o.type) {
    case "roca": case "doble": {
      const g = ctx.createLinearGradient(o.x,o.y,o.x,o.y+o.h);
      g.addColorStop(0,"#9ca3af"); g.addColorStop(1,"#4b5563");
      ctx.fillStyle = g; rr(ctx,o.x,o.y,o.w,o.h,7); ctx.fill();
      ctx.strokeStyle="#374151"; ctx.lineWidth=2; ctx.stroke();
      if (o.type==="doble") {
        ctx.beginPath(); ctx.moveTo(o.x+o.w/2,o.y+4); ctx.lineTo(o.x+o.w/2,o.y+o.h-4);
        ctx.strokeStyle="rgba(0,0,0,0.3)"; ctx.lineWidth=2; ctx.stroke();
      }
      break;
    }
    case "muro": {
      ctx.fillStyle="#dc2626"; rr(ctx,o.x,o.y,o.w,o.h,4); ctx.fill();
      ctx.fillStyle="#fca5a5";
      for(let i=0;i<4;i++) { rr(ctx,o.x+3,o.y+10+i*19,o.w-6,8,3); ctx.fill(); }
      break;
    }
    case "ave": case "ave2": {
      const flap = Math.sin(t * 0.18) * 8;
      const bx = o.x+o.w/2, by = o.y+o.h/2;
      const col = o.type==="ave" ? "#92400e" : "#6d28d9";
      const wCol = o.type==="ave" ? "#78350f" : "#5b21b6";
      ctx.fillStyle = col;
      ctx.beginPath(); ctx.ellipse(bx,by,o.w/2,o.h/2,0,0,Math.PI*2); ctx.fill();
      ctx.fillStyle = wCol;
      ctx.beginPath(); ctx.ellipse(bx-8,by-6+flap,18,7,-0.4,0,Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.ellipse(bx+8,by-6+flap,18,7,0.4,0,Math.PI*2); ctx.fill();
      ctx.fillStyle="white"; ctx.beginPath(); ctx.arc(bx+12,by,4,0,Math.PI*2); ctx.fill();
      ctx.fillStyle="#1e1b4b"; ctx.beginPath(); ctx.arc(bx+13,by,2.5,0,Math.PI*2); ctx.fill();
      ctx.fillStyle="#f59e0b";
      ctx.beginPath(); ctx.moveTo(bx+18,by); ctx.lineTo(bx+26,by+2); ctx.lineTo(bx+18,by+4);
      ctx.closePath(); ctx.fill();
      break;
    }
  }
  ctx.restore();
}

function drawBg(ctx: CanvasRenderingContext2D, si: number, gx: number, t: number) {
  const s = STAGES[si];
  const sky = ctx.createLinearGradient(0,0,0,GY);
  sky.addColorStop(0,s.sky[0]); sky.addColorStop(1,s.sky[1]);
  ctx.fillStyle = sky; ctx.fillRect(0,0,CW,GY);

  // stage decorations
  if (si===0) { // desert sun + dunes
    ctx.fillStyle="rgba(255,220,0,0.35)";
    ctx.beginPath(); ctx.arc(700,55,42,0,Math.PI*2); ctx.fill();
    ctx.fillStyle="rgba(255,220,0,0.12)";
    ctx.beginPath(); ctx.arc(700,55,62,0,Math.PI*2); ctx.fill();
    for(let i=0;i<3;i++){
      ctx.fillStyle="rgba(180,90,0,0.18)";
      ctx.beginPath();
      const dx=((gx*0.25+i*340)%(CW+300))-150;
      ctx.ellipse(dx,GY+8,160,38,0,Math.PI,0); ctx.fill();
    }
  }
  if (si===1) { // savanna trees
    ctx.fillStyle="rgba(250,210,80,0.2)";
    ctx.beginPath(); ctx.arc(680,45,38,0,Math.PI*2); ctx.fill();
    for(let i=0;i<4;i++){
      const tx=((gx*0.18+i*260)%(CW+260))-130;
      ctx.fillStyle="#5d4037"; ctx.fillRect(tx,GY-68,11,68);
      ctx.fillStyle="#2d6a4f";
      ctx.beginPath(); ctx.ellipse(tx+5,GY-80,42,20,0,0,Math.PI*2); ctx.fill();
    }
  }
  if (si===2) { // forest trees
    for(let i=0;i<6;i++){
      const tx=((gx*0.28+i*165)%(CW+200))-100;
      ctx.fillStyle="#1a3d1e";
      ctx.beginPath(); ctx.moveTo(tx,GY); ctx.lineTo(tx+22,GY-90); ctx.lineTo(tx+44,GY); ctx.fill();
      ctx.fillStyle="#0f2b12";
      ctx.beginPath(); ctx.moveTo(tx+5,GY-58); ctx.lineTo(tx+22,GY-130); ctx.lineTo(tx+39,GY-58); ctx.fill();
    }
  }
  if (si===3) { // city buildings
    for(let i=0;i<7;i++){
      const bx=((gx*0.12+i*145)%(CW+200))-100;
      const bh=55+(i*53)%90;
      ctx.fillStyle=`hsl(${210+i*15},15%,${22+i*2}%)`;
      ctx.fillRect(bx,GY-bh,68,bh);
      ctx.fillStyle="rgba(255,255,180,0.5)";
      for(let r=0;r<3;r++) for(let c=0;c<2;c++){
        if((i+r+c)%3===0) ctx.fillRect(bx+8+c*26,GY-bh+10+r*22,12,10);
      }
    }
  }
  if (si===4) { // galaxy stars + nebula
    ctx.fillStyle="rgba(120,40,200,0.18)";
    ctx.beginPath(); ctx.ellipse(350,160,220,110,0,0,Math.PI*2); ctx.fill();
    for(let i=0;i<50;i++){
      const sx=(i*179+gx*0.04)%CW, sy=(i*101)%(GY-25);
      const alpha=0.35+((i*37)%5)*0.1;
      ctx.fillStyle=`rgba(255,255,255,${alpha})`;
      ctx.beginPath(); ctx.arc(sx,sy,0.8+(i%2)*0.8,0,Math.PI*2); ctx.fill();
    }
  }

  // ground
  const gc = ctx.createLinearGradient(0,GY,0,CH);
  gc.addColorStop(0,s.ground[0]); gc.addColorStop(1,s.ground[1]);
  ctx.fillStyle = gc; ctx.fillRect(0,GY,CW,CH-GY);

  // ground line
  ctx.beginPath(); ctx.moveTo(0,GY); ctx.lineTo(CW,GY);
  ctx.strokeStyle="rgba(0,0,0,0.25)"; ctx.lineWidth=2; ctx.stroke();

  // ground ticks
  const spacing=40;
  for(let i=0;i<CW/spacing+2;i++){
    const mx=((i*spacing)-(gx%spacing)+CW)%CW;
    ctx.fillStyle="rgba(0,0,0,0.12)"; ctx.fillRect(mx,GY+2,3,6);
  }

  void t;
}

function drawHUD(ctx: CanvasRenderingContext2D, gs: GS) {
  const s = STAGES[gs.si];
  ctx.fillStyle="rgba(0,0,0,0.42)";
  rr(ctx,8,8,CW-16,50,10); ctx.fill();

  // stage
  ctx.fillStyle="white"; ctx.font="bold 14px system-ui";
  ctx.textAlign="left"; ctx.fillText(`Etapa ${gs.si+1}: ${s.name}`,16,38);

  // score
  ctx.textAlign="center"; ctx.font="bold 20px system-ui";
  ctx.fillStyle="#fbbf24"; ctx.fillText(`⭐ ${(gs.total+gs.score).toLocaleString()}`,CW/2,38);

  // hearts
  for(let i=0;i<MAX_LIVES;i++){
    ctx.font="20px system-ui";
    ctx.fillStyle=i<gs.lives?"#ef4444":"rgba(255,255,255,0.2)";
    ctx.textAlign="right"; ctx.fillText("❤",CW-12-i*26,38);
  }

  // timer bar
  const tw=180, tx=CW/2-tw/2, ratio=gs.timeLeft/s.dur;
  ctx.fillStyle="rgba(255,255,255,0.18)"; rr(ctx,tx,50,tw,8,4); ctx.fill();
  const tc=ratio>0.5?"#22c55e":ratio>0.25?"#f59e0b":"#ef4444";
  ctx.fillStyle=tc; rr(ctx,tx,50,tw*Math.max(0,ratio),8,4); ctx.fill();

  if(gs.combo>=3){
    ctx.font="bold 13px system-ui"; ctx.textAlign="left";
    ctx.fillStyle="#a78bfa"; ctx.fillText(`🔥 Combo ×${gs.combo}`,16,76);
  }
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function RunnerPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gsRef    = useRef<GS>(initGS(""));
  const rafRef   = useRef<number>(0);
  const router   = useRouter();

  const [uiPhase,    setUiPhase]    = useState<Phase>("menu");
  const [playerName, setPlayerName] = useState("");
  const [lb,         setLb]         = useState<LBEntry[]>([]);
  const [info,       setInfo]       = useState({ stageName:"", stageScore:0, total:0, si:0 });

  // ── Jump ────────────────────────────────────────────────────────────────────
  const jump = useCallback(() => {
    const gs = gsRef.current;
    if (gs.phase !== "playing" || gs.kdead) return;
    if (gs.kjumps < 2) {
      gs.kvy = gs.kjumps === 0 ? JUMP_V : DJUMP_V;
      gs.kjumps++;
      // jump particles
      for(let i=0;i<8;i++){
        const a=(Math.PI*2/8)*i;
        gs.particles.push({ x:KX, y:gs.ky, vx:Math.cos(a)*3, vy:Math.sin(a)*3-1,
          life:30, max:30, color:"#fbbf24", r:3+Math.random()*3 });
      }
    }
  }, []);

  const onKey = useCallback((e: KeyboardEvent) => {
    if (e.code==="Space"||e.code==="ArrowUp") { e.preventDefault(); jump(); }
  }, [jump]);

  const onTouch = useCallback((e: TouchEvent) => { e.preventDefault(); jump(); }, [jump]);
  const onClick  = useCallback(() => jump(), [jump]);

  // ── Game loop ────────────────────────────────────────────────────────────────
  const tick = useCallback(() => {
    const gs  = gsRef.current;
    const cvs = canvasRef.current;
    if (!cvs) return;
    const ctx = cvs.getContext("2d");
    if (!ctx) return;

    if (gs.phase === "playing") {
      gs.ticks++;
      const s = STAGES[gs.si];

      gs.speed    = s.sp + gs.ticks * 0.0012;
      gs.timeLeft = Math.max(0, s.dur - gs.ticks / 60);
      gs.gx      += gs.speed;

      // kangaroo physics
      if (!gs.kdead) {
        gs.ky  += gs.kvy;
        gs.kvy += GRAVITY;
        if (gs.ky >= GY) { gs.ky = GY; gs.kvy = 0; gs.kjumps = 0; }
        if (gs.ky === GY) gs.kleg += gs.speed * 0.038;
        if (gs.kinv > 0) gs.kinv--;
      } else {
        gs.krot += 0.09;
        gs.ky    = Math.min(gs.ky + 4, GY + 40);
      }

      // spawn obstacles
      gs.nextObs--;
      if (gs.nextObs <= 0) {
        const type = s.types[Math.floor(Math.random()*s.types.length)];
        const def  = OBS[type];
        gs.obs.push({ type, x:CW+10, y:GY-def.h-def.fy, w:def.w, h:def.h, passed:false });
        gs.nextObs = s.rate + Math.floor(Math.random()*(s.rate*0.6)) - Math.min(30, gs.ticks*0.008);
      }

      // move + score obstacles
      for (const o of gs.obs) {
        o.x -= gs.speed;
        if (!o.passed && o.x+o.w < KX-18) {
          o.passed = true;
          gs.combo++;
          gs.score += 10 + (gs.combo>=5 ? gs.combo*2 : 0);
          for(let i=0;i<6;i++){
            const a=(Math.PI*2/6)*i;
            gs.particles.push({ x:KX, y:gs.ky-60, vx:Math.cos(a)*4, vy:Math.sin(a)*4-2,
              life:35, max:35, color:["#fbbf24","#a78bfa","#34d399"][i%3], r:4+Math.random()*3 });
          }
        }
      }
      gs.obs = gs.obs.filter(o => o.x > -120);

      // collision (AABB with shrink)
      if (!gs.kdead && gs.kinv === 0) {
        const kx1=KX-10, ky1=gs.ky-112, kx2=KX+12, ky2=gs.ky-2;
        for (const o of gs.obs) {
          if (kx1<o.x+o.w-6 && kx2>o.x+6 && ky1<o.y+o.h-6 && ky2>o.y+6) {
            gs.lives--; gs.combo = 0;
            for(let i=0;i<20;i++){
              const a=Math.random()*Math.PI*2, sp=2+Math.random()*5;
              gs.particles.push({ x:KX, y:gs.ky-55, vx:Math.cos(a)*sp, vy:Math.sin(a)*sp-2,
                life:45, max:45, color:"#ef4444", r:3+Math.random()*4 });
            }
            if (gs.lives <= 0) {
              gs.kdead = true;
              setTimeout(() => {
                const g = gsRef.current;
                g.total += g.score;
                const finalLB = saveLB({ name:g.playerName||"Joey", score:g.total,
                  stages:g.si, date:new Date().toLocaleDateString("es-MX") });
                setLb(finalLB);
                setInfo({ stageName:s.name, stageScore:g.score, total:g.total, si:g.si });
                g.phase = "gameover"; setUiPhase("gameover");
              }, 1400);
            } else {
              gs.kinv = 90;
            }
            break;
          }
        }
      }

      // particles
      for (const p of gs.particles) {
        p.x += p.vx; p.y += p.vy; p.vy += 0.12; p.life--;
      }
      gs.particles = gs.particles.filter(p => p.life > 0);

      // stage complete
      if (gs.timeLeft <= 0 && !gs.kdead) {
        gs.total += gs.score;
        const finalLB = getLB();
        setLb(finalLB);
        setInfo({ stageName:s.name, stageScore:gs.score, total:gs.total, si:gs.si });
        if (gs.si >= STAGES.length-1) {
          const saved = saveLB({ name:gs.playerName||"Joey", score:gs.total,
            stages:STAGES.length, date:new Date().toLocaleDateString("es-MX") });
          setLb(saved);
          gs.phase = "victory"; setUiPhase("victory");
        } else {
          gs.phase = "stageend"; setUiPhase("stageend");
        }
        return;
      }
    }

    // ── Render ────────────────────────────────────────────────────────────────
    const g = gsRef.current;
    ctx.clearRect(0, 0, CW, CH);

    if (["playing","stageend","gameover","victory"].includes(g.phase)) {
      drawBg(ctx, g.si, g.gx, g.ticks);
      g.obs.forEach(o => drawObs(ctx, o, g.ticks));

      // kangaroo (flash when invincible)
      if (g.kinv % 6 < 4 || g.kinv === 0) {
        drawKang(ctx, g.ky, g.kleg, g.kjumps > 0, g.kdead, g.krot);
      }

      // particles
      g.particles.forEach(p => {
        const alpha = p.life/p.max;
        ctx.globalAlpha = alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r*alpha, 0, Math.PI*2); ctx.fill();
      });
      ctx.globalAlpha = 1;

      if (g.phase === "playing") drawHUD(ctx, g);
    }

    rafRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [tick]);

  useEffect(() => {
    window.addEventListener("keydown", onKey);
    window.addEventListener("touchstart", onTouch, { passive:false });
    window.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("touchstart", onTouch);
      window.removeEventListener("click", onClick);
    };
  }, [onKey, onTouch, onClick]);

  // ── Actions ──────────────────────────────────────────────────────────────────
  const startGame = () => {
    const name = playerName.trim() || "Joey";
    const gs = startStage({ ...initGS(name) }, 0);
    gs.playerName = name;
    gsRef.current = gs;
    setUiPhase("playing");
  };

  const nextStage = () => {
    const gs = gsRef.current;
    const next = startStage(gs, gs.si+1);
    next.total = gs.total;
    next.playerName = gs.playerName;
    gsRef.current = next;
    setUiPhase("playing");
  };

  const restart = () => {
    const name = gsRef.current.playerName;
    const gs = startStage({ ...initGS(name) }, 0);
    gs.playerName = name;
    gsRef.current = gs;
    setUiPhase("playing");
  };

  // ── Rank badge ───────────────────────────────────────────────────────────────
  const rankBadge = (i: number) => ["🥇","🥈","🥉"][i] ?? `${i+1}°`;

  // ── Overlay styles ────────────────────────────────────────────────────────────
  const overlay: React.CSSProperties = {
    position:"absolute",inset:0,display:"flex",flexDirection:"column",
    alignItems:"center",justifyContent:"center",gap:14,padding:"28px 32px",
    background:"rgba(10,5,25,0.82)",overflowY:"auto",
  };
  const cardBox: React.CSSProperties = {
    background:"rgba(255,255,255,0.07)",borderRadius:14,
    padding:"12px 20px",width:"100%",maxWidth:400,
  };
  const lbRow = (_entry: LBEntry, i: number, isMe: boolean): React.CSSProperties => ({
    display:"flex",justifyContent:"space-between",fontSize:13,padding:"5px 6px",
    borderBottom:"1px solid rgba(255,255,255,0.08)",borderRadius:4,
    background: isMe ? "rgba(139,92,246,0.25)" : "transparent",
    color: i===0?"#fbbf24":i===1?"#e2e8f0":i===2?"#cd9c00":"rgba(255,255,255,0.75)",
  });

  const myScore = info.total;
  const myPos   = lb.findIndex(e => e.name===(gsRef.current.playerName||"Joey") && e.score===myScore);

  return (
    <div style={{minHeight:"100vh",background:"#0a0515",display:"flex",flexDirection:"column",
      alignItems:"center",justifyContent:"center",fontFamily:"system-ui,sans-serif",
      color:"white",padding:16}}>

      {/* back */}
      <div style={{position:"fixed",top:12,left:12,zIndex:100}}>
        <button onClick={()=>router.push("/")}
          style={{background:"rgba(255,255,255,0.12)",border:"none",borderRadius:8,
            color:"white",padding:"6px 14px",cursor:"pointer",fontSize:13,fontWeight:"bold"}}>
          ← Inicio
        </button>
      </div>

      <div style={{position:"relative",borderRadius:16,overflow:"hidden",
        boxShadow:"0 0 60px rgba(139,92,246,0.35)",maxWidth:"100%"}}>
        <canvas ref={canvasRef} width={CW} height={CH}
          style={{display:"block",maxWidth:"100%",height:"auto"}}/>

        {/* ── MENU ──────────────────────────────────────────────────────────── */}
        {uiPhase==="menu" && (
          <div style={overlay}>
            <div style={{fontSize:52}}>🦘</div>
            <h1 style={{fontSize:30,fontWeight:900,margin:0,color:"#fbbf24",
              textShadow:"0 0 24px rgba(251,191,36,0.5)",textAlign:"center"}}>
              Joey Runner
            </h1>
            <p style={{color:"rgba(200,175,255,0.8)",margin:0,textAlign:"center",maxWidth:380,fontSize:14}}>
              Ayuda a Joey a superar <strong>5 etapas</strong> de obstáculos cada vez más difíciles.
              Salta con <kbd style={{background:"rgba(255,255,255,0.18)",padding:"1px 7px",
              borderRadius:4,fontFamily:"monospace"}}>ESPACIO</kbd> · ¡Doble salto disponible!
            </p>
            <input value={playerName} onChange={e=>setPlayerName(e.target.value)}
              onKeyDown={e=>e.key==="Enter"&&startGame()}
              placeholder="Tu nombre..."
              style={{background:"rgba(255,255,255,0.1)",border:"2px solid rgba(139,92,246,0.5)",
                borderRadius:12,color:"white",padding:"10px 20px",fontSize:17,fontWeight:"bold",
                outline:"none",textAlign:"center",width:210}}/>
            <button onClick={startGame}
              style={{background:"linear-gradient(135deg,#8b5cf6,#6d28d9)",border:"none",
                borderRadius:16,color:"white",padding:"13px 44px",fontSize:19,
                fontWeight:900,cursor:"pointer",boxShadow:"0 0 24px rgba(139,92,246,0.45)"}}>
              ¡JUGAR! 🚀
            </button>
            {/* hint stages */}
            <div style={{display:"flex",gap:8,flexWrap:"wrap",justifyContent:"center",fontSize:13}}>
              {STAGES.map((s,i)=>(
                <span key={i} style={{background:"rgba(255,255,255,0.08)",
                  borderRadius:8,padding:"3px 10px",color:"rgba(255,255,255,0.65)"}}>
                  {i+1}. {s.name}
                </span>
              ))}
            </div>
            {getLB().length>0 && (
              <div style={cardBox}>
                <p style={{margin:"0 0 8px",fontWeight:700,color:"#fbbf24",fontSize:14}}>🏆 Mejores puntuaciones</p>
                {getLB().slice(0,5).map((e,i)=>(
                  <div key={i} style={{display:"flex",justifyContent:"space-between",
                    fontSize:13,padding:"3px 0",color:"rgba(255,255,255,0.75)"}}>
                    <span>{rankBadge(i)} {e.name}</span>
                    <span>{e.score.toLocaleString()} pts · {e.stages}/5 etapas</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── STAGE END ─────────────────────────────────────────────────────── */}
        {uiPhase==="stageend" && (
          <div style={overlay}>
            <div style={{fontSize:46}}>🎉</div>
            <h2 style={{fontSize:26,fontWeight:900,color:"#22c55e",margin:0}}>
              ¡Etapa {info.si+1} completada!
            </h2>
            <p style={{color:"rgba(255,255,255,0.6)",margin:0,fontSize:14}}>{info.stageName}</p>
            <div style={{...cardBox,textAlign:"center"}}>
              <p style={{margin:0,fontSize:12,color:"rgba(255,255,255,0.55)"}}>Puntos esta etapa</p>
              <p style={{margin:0,fontSize:30,fontWeight:900,color:"#fbbf24"}}>
                +{info.stageScore.toLocaleString()}
              </p>
              <p style={{margin:"4px 0 0",fontSize:12,color:"rgba(255,255,255,0.55)"}}>
                Total: <strong style={{color:"white"}}>{info.total.toLocaleString()}</strong>
              </p>
            </div>
            {lb.length>0 && (
              <div style={cardBox}>
                <p style={{margin:"0 0 8px",fontWeight:700,color:"#fbbf24",fontSize:14}}>🏆 Tabla de líderes</p>
                {lb.slice(0,5).map((e,i)=>{
                  const me=e.name===(gsRef.current.playerName||"Joey")&&e.score===info.total;
                  return (
                    <div key={i} style={lbRow(e,i,me)}>
                      <span>{rankBadge(i)} {e.name}{me?" ← tú":""}</span>
                      <span>{e.score.toLocaleString()}</span>
                    </div>
                  );
                })}
              </div>
            )}
            <button onClick={nextStage}
              style={{background:"linear-gradient(135deg,#8b5cf6,#6d28d9)",border:"none",
                borderRadius:16,color:"white",padding:"13px 36px",fontSize:17,
                fontWeight:900,cursor:"pointer",boxShadow:"0 0 20px rgba(139,92,246,0.4)"}}>
              Etapa {info.si+2}: {STAGES[info.si+1]?.name} →
            </button>
          </div>
        )}

        {/* ── GAME OVER ─────────────────────────────────────────────────────── */}
        {uiPhase==="gameover" && (
          <div style={overlay}>
            <div style={{fontSize:46}}>💀</div>
            <h2 style={{fontSize:26,fontWeight:900,color:"#ef4444",margin:0}}>¡Game Over!</h2>
            <p style={{color:"rgba(255,255,255,0.6)",margin:0,fontSize:14}}>
              Llegaste hasta la etapa {info.si+1} — {info.stageName}
            </p>
            <div style={{...cardBox,textAlign:"center"}}>
              <p style={{margin:0,fontSize:12,color:"rgba(255,255,255,0.55)"}}>Puntuación final</p>
              <p style={{margin:0,fontSize:32,fontWeight:900,color:"#fbbf24"}}>{info.total.toLocaleString()}</p>
              {myPos>=0 && (
                <p style={{margin:"4px 0 0",fontSize:13,color:"#a78bfa"}}>
                  {myPos===0?"🥇 ¡Nuevo récord!":myPos===1?"🥈 2° lugar":myPos===2?"🥉 3° lugar":`${myPos+1}° lugar en el ranking`}
                </p>
              )}
            </div>
            {lb.length>0 && (
              <div style={{...cardBox,maxHeight:180,overflowY:"auto"}}>
                <p style={{margin:"0 0 8px",fontWeight:700,color:"#fbbf24",fontSize:14}}>🏆 Clasificación global</p>
                {lb.slice(0,10).map((e,i)=>{
                  const me=e.name===(gsRef.current.playerName||"Joey")&&e.score===info.total;
                  return (
                    <div key={i} style={lbRow(e,i,me)}>
                      <span>{rankBadge(i)} {e.name}{me?" ← tú":""}</span>
                      <span>{e.score.toLocaleString()} · {e.stages}/5</span>
                    </div>
                  );
                })}
              </div>
            )}
            <div style={{display:"flex",gap:10}}>
              <button onClick={restart}
                style={{background:"linear-gradient(135deg,#8b5cf6,#6d28d9)",border:"none",
                  borderRadius:14,color:"white",padding:"12px 28px",fontSize:16,
                  fontWeight:900,cursor:"pointer"}}>
                🔄 Reintentar
              </button>
              <button onClick={()=>setUiPhase("menu")}
                style={{background:"rgba(255,255,255,0.12)",border:"none",borderRadius:14,
                  color:"white",padding:"12px 20px",fontSize:14,fontWeight:700,cursor:"pointer"}}>
                Menú
              </button>
            </div>
          </div>
        )}

        {/* ── VICTORY ───────────────────────────────────────────────────────── */}
        {uiPhase==="victory" && (
          <div style={{...overlay,justifyContent:"flex-start",paddingTop:24}}>
            <div style={{fontSize:46}}>🏆</div>
            <h2 style={{fontSize:24,fontWeight:900,color:"#fbbf24",margin:0,textAlign:"center"}}>
              ¡Joey completó todas las etapas!
            </h2>
            <div style={{...cardBox,textAlign:"center"}}>
              <p style={{margin:0,fontSize:12,color:"rgba(255,255,255,0.55)"}}>Puntuación final</p>
              <p style={{margin:0,fontSize:34,fontWeight:900,color:"#fbbf24"}}>{info.total.toLocaleString()}</p>
              {myPos>=0 && (
                <p style={{margin:"4px 0 0",fontSize:14,fontWeight:700,color:"#a78bfa"}}>
                  {myPos===0?"🥇 ¡NUEVO RÉCORD!":myPos===1?"🥈 ¡2° lugar!":myPos===2?"🥉 ¡3° lugar!":`🎉 Quedaste en el lugar ${myPos+1}`}
                </p>
              )}
            </div>
            {lb.length>0 && (
              <div style={{...cardBox,maxHeight:200,overflowY:"auto"}}>
                <p style={{margin:"0 0 8px",fontWeight:700,color:"#fbbf24",fontSize:14}}>🏆 Tabla de clasificación final</p>
                {lb.slice(0,10).map((e,i)=>{
                  const me=e.name===(gsRef.current.playerName||"Joey")&&e.score===info.total;
                  return (
                    <div key={i} style={lbRow(e,i,me)}>
                      <span>{rankBadge(i)} {e.name}{me?" ⬅ tú":""}</span>
                      <span>{e.score.toLocaleString()} · {e.stages}/5 etapas</span>
                    </div>
                  );
                })}
              </div>
            )}
            <div style={{display:"flex",gap:10}}>
              <button onClick={restart}
                style={{background:"linear-gradient(135deg,#fbbf24,#f59e0b)",border:"none",
                  borderRadius:14,color:"#1a1000",padding:"12px 28px",fontSize:16,
                  fontWeight:900,cursor:"pointer"}}>
                🔄 Jugar de nuevo
              </button>
              <button onClick={()=>router.push("/")}
                style={{background:"rgba(255,255,255,0.12)",border:"none",borderRadius:14,
                  color:"white",padding:"12px 20px",fontSize:14,fontWeight:700,cursor:"pointer"}}>
                Inicio
              </button>
            </div>
          </div>
        )}
      </div>

      {uiPhase==="playing" && (
        <p style={{marginTop:10,fontSize:12,color:"rgba(200,175,255,0.4)",textAlign:"center"}}>
          ESPACIO · Clic · Tap — saltar &nbsp;|&nbsp; Doble salto disponible
        </p>
      )}
    </div>
  );
}
