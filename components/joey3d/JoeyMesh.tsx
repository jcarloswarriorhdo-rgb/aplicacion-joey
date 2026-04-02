"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useSpring, animated } from "@react-spring/three";
import * as THREE from "three";
import type { Group, Mesh } from "three";

export type Joey3DState = "idle" | "run" | "jump" | "excited" | "dead";

interface Props { state?: Joey3DState; speed?: number }

// ─── Shared materials ─────────────────────────────────────────────────────────
function useMaterials() {
  return useMemo(() => ({
    body:  new THREE.MeshStandardMaterial({ color:"#E8953A", roughness:0.45, metalness:0.05 }),
    dark:  new THREE.MeshStandardMaterial({ color:"#C26A20", roughness:0.5,  metalness:0.0  }),
    belly: new THREE.MeshStandardMaterial({ color:"#F5D8A8", roughness:0.6,  metalness:0.0  }),
    eye:   new THREE.MeshStandardMaterial({ color:"#1A2A4A", roughness:0.1,  metalness:0.3  }),
    iris:  new THREE.MeshStandardMaterial({ color:"#3B82F6", roughness:0.1,  metalness:0.2, emissive:"#1D4ED8", emissiveIntensity:0.3 }),
    nose:  new THREE.MeshStandardMaterial({ color:"#2D1400", roughness:0.3,  metalness:0.0  }),
    white: new THREE.MeshStandardMaterial({ color:"#FFFFFF", roughness:0.5,  metalness:0.0  }),
    shorts:new THREE.MeshStandardMaterial({ color:"#3B82F6", roughness:0.65, metalness:0.0  }),
    rope:  new THREE.MeshStandardMaterial({ color:"#C8955A", roughness:0.8,  metalness:0.0  }),
    ear:   new THREE.MeshStandardMaterial({ color:"#F2A07A", roughness:0.6,  metalness:0.0  }),
    shadow:new THREE.MeshStandardMaterial({ color:"#000000", roughness:1, transparent:true, opacity:0.18 }),
  }), []);
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function Limb({ args, position, rotation, material, children }: {
  args: [number,number,number]; position:[number,number,number];
  rotation?:[number,number,number]; material: THREE.Material; children?: React.ReactNode
}) {
  return (
    <group position={position} rotation={rotation ?? [0,0,0]}>
      <mesh material={material}>
        <capsuleGeometry args={[args[0], args[1], 8, 12]}/>
      </mesh>
      {children}
    </group>
  );
}

// ─── Main Mesh ────────────────────────────────────────────────────────────────
export function JoeyMesh({ state = "idle", speed = 1 }: Props) {
  const root    = useRef<Group>(null!);
  const bodyRef = useRef<Group>(null!);
  const headRef = useRef<Group>(null!);
  const legLF   = useRef<Group>(null!); // left  front thigh
  const legRF   = useRef<Group>(null!); // right front thigh
  const legLB   = useRef<Group>(null!); // left  back  shin
  const legRB   = useRef<Group>(null!); // right back  shin
  const armL    = useRef<Group>(null!);
  const armR    = useRef<Group>(null!);
  const tailRef = useRef<Group>(null!);
  const earL    = useRef<Group>(null!);
  const earR    = useRef<Group>(null!);
  const shadowRef = useRef<Mesh>(null!);

  const mat = useMaterials();

  // spring for jump Y
  const { jumpY } = useSpring({
    jumpY: state === "jump" ? 1.8 : 0,
    config: { tension: 240, friction: 18 },
  });

  // spring for dead tilt
  const { deadRot } = useSpring({
    deadRot: state === "dead" ? Math.PI * 0.55 : 0,
    config: { tension: 120, friction: 20 },
  });

  const t = useRef(0);

  useFrame((_, delta) => {
    t.current += delta * speed;
    const time = t.current;

    const isRun     = state === "run";
    const isJump    = state === "jump";
    const isExcited = state === "excited";
    const isDead    = state === "dead";

    // ── Body bob / run bounce ──────────────────────────────────────────────
    if (isRun) {
      bodyRef.current.position.y = Math.abs(Math.sin(time * 10)) * 0.06;
      bodyRef.current.rotation.z = Math.sin(time * 10) * 0.04;
    } else if (isExcited) {
      bodyRef.current.position.y = Math.abs(Math.sin(time * 8)) * 0.14;
      bodyRef.current.rotation.z = Math.sin(time * 8) * 0.06;
    } else if (!isDead) {
      bodyRef.current.position.y = Math.sin(time * 1.4) * 0.04;
      bodyRef.current.rotation.z = 0;
    }

    // ── Head slight sway ──────────────────────────────────────────────────
    if (!isDead) {
      headRef.current.rotation.y = isRun
        ? Math.sin(time * 10) * 0.06
        : Math.sin(time * 1.4) * 0.04;
      headRef.current.rotation.z = isExcited ? Math.sin(time * 8) * 0.08 : 0;
    }

    // ── Legs ──────────────────────────────────────────────────────────────
    const legFreq = isRun ? 10 : isExcited ? 8 : 0;
    if (legFreq > 0) {
      legLF.current.rotation.x =  Math.sin(time * legFreq) * 0.55;
      legRF.current.rotation.x = -Math.sin(time * legFreq) * 0.55;
      legLB.current.rotation.x =  Math.sin(time * legFreq + 0.5) * 0.45;
      legRB.current.rotation.x = -Math.sin(time * legFreq + 0.5) * 0.45;
    } else if (isJump) {
      const tuck = Math.sin(time * 5) * 0.6;
      legLF.current.rotation.x = -0.5 + tuck;
      legRF.current.rotation.x = -0.5 - tuck;
      legLB.current.rotation.x =  0.4 - tuck * 0.5;
      legRB.current.rotation.x =  0.4 + tuck * 0.5;
    } else {
      legLF.current.rotation.x *= 0.85;
      legRF.current.rotation.x *= 0.85;
      legLB.current.rotation.x *= 0.85;
      legRB.current.rotation.x *= 0.85;
    }

    // ── Arms ──────────────────────────────────────────────────────────────
    if (isRun) {
      armL.current.rotation.x = -Math.sin(time * 10) * 0.5;
      armR.current.rotation.x =  Math.sin(time * 10) * 0.5;
    } else if (isExcited) {
      armL.current.rotation.x = Math.sin(time * 8) * 0.7;
      armR.current.rotation.x = Math.sin(time * 8 + Math.PI) * 0.7;
    } else {
      armL.current.rotation.x *= 0.9;
      armR.current.rotation.x *= 0.9;
    }

    // ── Tail ──────────────────────────────────────────────────────────────
    tailRef.current.rotation.z = Math.sin(time * (isRun ? 10 : 1.4)) * (isRun ? 0.3 : 0.15);

    // ── Ear twitch ────────────────────────────────────────────────────────
    const earPulse = (Math.sin(time * 3) > 0.96) ? Math.sin(time * 20) * 0.12 : 0;
    earL.current.rotation.z =  earPulse;
    earR.current.rotation.z = -earPulse;

    // ── Ground shadow scale ───────────────────────────────────────────────
    if (shadowRef.current) {
      const sy = isJump ? 0.5 + Math.sin(time * 5) * 0.3 : 1;
      shadowRef.current.scale.set(sy, 1, sy);
    }

    // ── Dead spin ─────────────────────────────────────────────────────────
    if (isDead) {
      root.current.rotation.y += delta * 2.5;
    }
  });

  return (
    <>
      {/* Ground shadow */}
      <mesh ref={shadowRef} rotation={[-Math.PI/2, 0, 0]} position={[0, -1.18, 0]} scale={[1, 0.5, 1]}>
        <circleGeometry args={[0.55, 32]}/>
        <primitive object={mat.shadow}/>
      </mesh>

      {/* Dead tilt wrapper */}
      <animated.group ref={root} rotation-z={deadRot}>
        {/* Jump Y offset */}
        <animated.group position-y={jumpY}>
          <group ref={bodyRef}>

            {/* ── TAIL ───────────────────────────────────────────────── */}
            <group ref={tailRef} position={[-0.32, -0.05, 0]}>
              <mesh material={mat.dark} rotation={[0,0,Math.PI*0.55]}>
                <capsuleGeometry args={[0.07, 0.55, 8, 8]}/>
              </mesh>
            </group>

            {/* ── BACK LEGS ──────────────────────────────────────────── */}
            <group ref={legLF} position={[-0.16, -0.7, 0.14]}>
              <mesh material={mat.dark}>
                <capsuleGeometry args={[0.1, 0.35, 8, 8]}/>
              </mesh>
              <group position={[0, -0.38, 0.06]}>
                <mesh material={mat.body}>
                  <capsuleGeometry args={[0.08, 0.28, 8, 8]}/>
                </mesh>
                {/* foot */}
                <mesh material={mat.dark} position={[0.06, -0.22, 0.1]} rotation={[0.4,0,0]}>
                  <capsuleGeometry args={[0.06, 0.22, 8, 8]}/>
                </mesh>
              </group>
            </group>

            <group ref={legRF} position={[0.16, -0.7, 0.14]}>
              <mesh material={mat.dark}>
                <capsuleGeometry args={[0.1, 0.35, 8, 8]}/>
              </mesh>
              <group position={[0, -0.38, 0.06]}>
                <mesh material={mat.body}>
                  <capsuleGeometry args={[0.08, 0.28, 8, 8]}/>
                </mesh>
                <mesh material={mat.dark} position={[-0.06, -0.22, 0.1]} rotation={[0.4,0,0]}>
                  <capsuleGeometry args={[0.06, 0.22, 8, 8]}/>
                </mesh>
              </group>
            </group>

            {/* ── SMALL FRONT LEGS ───────────────────────────────────── */}
            <group ref={legLB} position={[-0.12, -0.38, 0.22]}>
              <mesh material={mat.body} rotation={[0.3,0,0.15]}>
                <capsuleGeometry args={[0.065, 0.22, 8, 8]}/>
              </mesh>
            </group>
            <group ref={legRB} position={[0.12, -0.38, 0.22]}>
              <mesh material={mat.body} rotation={[0.3,0,-0.15]}>
                <capsuleGeometry args={[0.065, 0.22, 8, 8]}/>
              </mesh>
            </group>

            {/* ── BODY ────────────────────────────────────────────────── */}
            <mesh material={mat.body} position={[0, 0, 0]}>
              <capsuleGeometry args={[0.38, 0.52, 12, 16]}/>
            </mesh>
            {/* belly */}
            <mesh material={mat.belly} position={[0, 0.04, 0.28]} scale={[0.62, 0.78, 0.28]}>
              <sphereGeometry args={[0.72, 16, 16]}/>
            </mesh>
            {/* shorts */}
            <mesh material={mat.shorts} position={[0, -0.52, 0.04]} scale={[1.08, 0.55, 1.08]}>
              <cylinderGeometry args={[0.38, 0.32, 0.48, 16, 1, true]}/>
            </mesh>
            {/* rope belt */}
            <mesh material={mat.rope} position={[0, -0.28, 0.0]}>
              <torusGeometry args={[0.39, 0.04, 8, 32]}/>
            </mesh>
            {/* belt knot */}
            <mesh material={mat.rope} position={[0, -0.28, 0.39]}>
              <sphereGeometry args={[0.07, 8, 8]}/>
            </mesh>

            {/* ── ARMS ────────────────────────────────────────────────── */}
            <group ref={armL} position={[-0.42, 0.3, 0.1]}>
              <mesh material={mat.body} rotation={[0.2,0,-0.3]}>
                <capsuleGeometry args={[0.085, 0.3, 8, 8]}/>
              </mesh>
              {/* hand */}
              <mesh material={mat.dark} position={[-0.06, -0.26, 0.06]}>
                <sphereGeometry args={[0.09, 8, 8]}/>
              </mesh>
            </group>
            <group ref={armR} position={[0.42, 0.3, 0.1]}>
              <mesh material={mat.body} rotation={[0.2,0,0.3]}>
                <capsuleGeometry args={[0.085, 0.3, 8, 8]}/>
              </mesh>
              <mesh material={mat.dark} position={[0.06, -0.26, 0.06]}>
                <sphereGeometry args={[0.09, 8, 8]}/>
              </mesh>
            </group>

            {/* ── NECK ────────────────────────────────────────────────── */}
            <mesh material={mat.body} position={[0, 0.62, 0.06]} rotation={[0.1,0,0]}>
              <capsuleGeometry args={[0.16, 0.22, 8, 8]}/>
            </mesh>

            {/* ── HEAD ────────────────────────────────────────────────── */}
            <group ref={headRef} position={[0, 0.95, 0.06]}>
              {/* skull */}
              <mesh material={mat.body}>
                <sphereGeometry args={[0.32, 20, 20]}/>
              </mesh>
              {/* snout */}
              <mesh material={mat.belly} position={[0, -0.08, 0.26]} scale={[0.72, 0.62, 0.55]}>
                <sphereGeometry args={[0.24, 14, 14]}/>
              </mesh>
              {/* nose */}
              <mesh material={mat.nose} position={[0, -0.02, 0.46]}>
                <sphereGeometry args={[0.085, 10, 10]}/>
              </mesh>
              {/* nose gloss */}
              <mesh material={mat.white} position={[-0.028, 0.02, 0.49]}>
                <sphereGeometry args={[0.028, 8, 8]}/>
              </mesh>

              {/* ── EYES ────────────────────────────────────────────── */}
              {([-0.14, 0.14] as number[]).map((x, i) => (
                <group key={i} position={[x, 0.1, 0.26]}>
                  {/* white sclera */}
                  <mesh material={mat.white}>
                    <sphereGeometry args={[0.1, 12, 12]}/>
                  </mesh>
                  {/* iris */}
                  <mesh material={mat.iris} position={[0, 0, 0.04]}>
                    <sphereGeometry args={[0.07, 12, 12]}/>
                  </mesh>
                  {/* pupil */}
                  <mesh material={mat.eye} position={[0, 0, 0.09]}>
                    <sphereGeometry args={[0.045, 10, 10]}/>
                  </mesh>
                  {/* eye gloss */}
                  <mesh material={mat.white} position={[-0.02, 0.025, 0.12]}>
                    <sphereGeometry args={[0.018, 8, 8]}/>
                  </mesh>
                </group>
              ))}

              {/* ── EARS ────────────────────────────────────────────── */}
              <group ref={earL} position={[-0.18, 0.3, -0.04]}>
                <mesh material={mat.dark} rotation={[0.1, 0, -0.2]}>
                  <capsuleGeometry args={[0.075, 0.38, 8, 8]}/>
                </mesh>
                <mesh material={mat.ear} position={[0, 0, 0.04]} rotation={[0.1, 0, -0.2]}>
                  <capsuleGeometry args={[0.042, 0.28, 8, 8]}/>
                </mesh>
              </group>
              <group ref={earR} position={[0.18, 0.3, -0.04]}>
                <mesh material={mat.dark} rotation={[0.1, 0, 0.2]}>
                  <capsuleGeometry args={[0.075, 0.38, 8, 8]}/>
                </mesh>
                <mesh material={mat.ear} position={[0, 0, 0.04]} rotation={[0.1, 0, 0.2]}>
                  <capsuleGeometry args={[0.042, 0.28, 8, 8]}/>
                </mesh>
              </group>

              {/* ── HAIR TUFT ───────────────────────────────────────── */}
              {([[-0.06, 0.32, 0.06], [0, 0.36, 0.04], [0.06, 0.32, 0.06]] as [number,number,number][]).map((p,i) => (
                <mesh key={i} material={mat.dark} position={p} rotation={[0.2,0,(i-1)*0.3]}>
                  <capsuleGeometry args={[0.03, 0.1, 6, 6]}/>
                </mesh>
              ))}

              {/* ── CHEEK BLUSH ─────────────────────────────────────── */}
              {(state === "idle" || state === "excited") && (
                <>
                  <mesh material={
                    useMemo(()=> new THREE.MeshStandardMaterial({color:"#F97316",transparent:true,opacity:0.22,roughness:1}),[])
                  } position={[-0.24, 0.02, 0.22]}>
                    <sphereGeometry args={[0.1, 8, 8]}/>
                  </mesh>
                  <mesh material={
                    useMemo(()=> new THREE.MeshStandardMaterial({color:"#F97316",transparent:true,opacity:0.22,roughness:1}),[])
                  } position={[0.24, 0.02, 0.22]}>
                    <sphereGeometry args={[0.1, 8, 8]}/>
                  </mesh>
                </>
              )}
            </group>

          </group>
        </animated.group>
      </animated.group>
    </>
  );
}
