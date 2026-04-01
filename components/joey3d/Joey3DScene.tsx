"use client";

import { Canvas } from "@react-three/fiber";
import {
  OrbitControls, Environment, ContactShadows,
  Grid, Float, PresentationControls,
} from "@react-three/drei";
import { JoeyMesh } from "./JoeyMesh";
import type { Joey3DState } from "./JoeyMesh";

interface Props {
  state: Joey3DState;
  speed: number;
  envPreset: "sunset"|"dawn"|"night"|"warehouse"|"forest"|"apartment"|"studio";
}

export default function Joey3DScene({ state, speed, envPreset }: Props) {
  return (
    <Canvas
      camera={{ position: [0, 0.4, 3.2], fov: 45 }}
      shadows
      style={{ background:"transparent" }}
      gl={{ antialias: true, alpha: true }}
    >
      {/* ── Lighting ─────────────────────────────────────────────────────── */}
      <ambientLight intensity={0.5}/>
      <directionalLight
        position={[4, 8, 5]} intensity={1.4}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-near={0.5}
        shadow-camera-far={30}
        shadow-camera-left={-4}
        shadow-camera-right={4}
        shadow-camera-top={4}
        shadow-camera-bottom={-4}
      />
      <directionalLight position={[-4, 2, -2]} intensity={0.35} color="#a78bfa"/>
      <pointLight position={[0, 3, 2]} intensity={0.6} color="#fbbf24"/>

      {/* ── Environment (HDRI) ───────────────────────────────────────────── */}
      <Environment preset={envPreset} background={false}/>

      {/* ── Ground ───────────────────────────────────────────────────────── */}
      <Grid
        position={[0, -1.2, 0]}
        args={[10, 10]}
        cellSize={0.5}
        cellThickness={0.4}
        cellColor="#8b5cf6"
        sectionSize={2}
        sectionThickness={0.8}
        sectionColor="#a78bfa"
        fadeDistance={8}
        fadeStrength={1.2}
        followCamera={false}
        infiniteGrid
      />
      <ContactShadows
        position={[0, -1.19, 0]}
        opacity={0.45}
        scale={4}
        blur={2}
        far={3}
      />

      {/* ── Joey ─────────────────────────────────────────────────────────── */}
      {state === "idle" ? (
        <Float speed={1.4} rotationIntensity={0.15} floatIntensity={0.25}>
          <JoeyMesh state={state} speed={speed}/>
        </Float>
      ) : state === "run" ? (
        // When running, add subtle presentation orbit
        <PresentationControls
          global
          snap
          speed={0.6}
          zoom={1}
          rotation={[0, 0.2, 0]}
          polar={[-0.1, 0.1]}
          azimuth={[-0.2, 0.2]}
        >
          <JoeyMesh state={state} speed={speed}/>
        </PresentationControls>
      ) : (
        <JoeyMesh state={state} speed={speed}/>
      )}

      {/* ── Camera controls ──────────────────────────────────────────────── */}
      <OrbitControls
        enablePan
        enableZoom
        minDistance={1.5}
        maxDistance={8}
        minPolarAngle={0.2}
        maxPolarAngle={Math.PI * 0.72}
        target={[0, 0, 0]}
        autoRotate={state === "dead"}
        autoRotateSpeed={1.5}
      />
    </Canvas>
  );
}
