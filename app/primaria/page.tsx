import Link from "next/link";
import { Joey } from "@/components/Joey";

const grades = [
  { g: "1", label: "1° Primaria", ages: "6-7 años" },
  { g: "2", label: "2° Primaria", ages: "7-8 años" },
  { g: "3", label: "3° Primaria", ages: "8-9 años" },
  { g: "4", label: "4° Primaria", ages: "9-10 años" },
  { g: "5", label: "5° Primaria", ages: "10-11 años" },
  { g: "6", label: "6° Primaria", ages: "11-12 años" },
];

export default function PrimariaPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "linear-gradient(160deg,#059669,#10B981)" }}>
      <div className="flex items-center gap-3 px-4 pt-4">
        <a href="/" className="text-white/80 text-3xl font-black">←</a>
        <h1 className="text-2xl font-black text-white">📚 Primaria</h1>
      </div>
      <div className="flex justify-center py-4">
        <Joey mood="happy" size={100} />
      </div>
      <p className="text-white/80 font-bold text-center mb-4">¿En qué grado estás?</p>
      <div className="px-4 pb-8 grid grid-cols-2 gap-3 max-w-md mx-auto w-full">
        {grades.map(({ g, label, ages }) => (
          <Link key={g} href={`/primaria/${g}`}
            className="flex flex-col items-center justify-center gap-1 rounded-3xl py-5 px-3 shadow-lg font-black transition-transform hover:scale-105 active:scale-95"
            style={{ background: "rgba(255,255,255,0.15)", border: "2px solid rgba(255,255,255,0.3)" }}>
            <span className="text-4xl">📖</span>
            <span className="text-white text-base">{label}</span>
            <span className="text-white/60 text-xs font-semibold">{ages}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
