import Link from "next/link";
import { Joey } from "@/components/Joey";

const grades = [
  { g: "1", label: "1° Secundaria", ages: "12-13 años" },
  { g: "2", label: "2° Secundaria", ages: "13-14 años" },
  { g: "3", label: "3° Secundaria", ages: "14-15 años" },
];

export default function SecundariaPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "linear-gradient(160deg,#1E3A5F,#2563EB)" }}>
      <div className="flex items-center gap-3 px-4 pt-4">
        <a href="/" className="text-white/80 text-3xl font-black">←</a>
        <h1 className="text-2xl font-black text-white">🎓 Secundaria</h1>
      </div>
      <div className="flex justify-center py-4">
        <Joey mood="happy" size={100} />
      </div>
      <p className="text-white/80 font-bold text-center mb-4">¿En qué grado estás?</p>
      <div className="px-4 pb-8 flex flex-col gap-4 max-w-md mx-auto w-full">
        {grades.map(({ g, label, ages }) => (
          <Link key={g} href={`/secundaria/${g}`}
            className="flex items-center gap-4 rounded-3xl py-5 px-6 shadow-lg font-black transition-transform hover:scale-105 active:scale-95"
            style={{ background: "rgba(255,255,255,0.12)", border: "2px solid rgba(255,255,255,0.25)" }}>
            <span className="text-4xl">🎒</span>
            <div>
              <p className="text-white text-xl">{label}</p>
              <p className="text-white/60 text-sm font-semibold">{ages}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
