import { ActivityCard } from "@/components/ActivityCard";
import { Joey } from "@/components/Joey";

const activities = [
  { href: "/kinder/numeros",  emoji: "🔢", title: "Números",   description: "Cuenta del 1 al 10",        color: "#7C3AED" },
  { href: "/kinder/letras",   emoji: "🔤", title: "Letras",    description: "Aprende el ABC",             color: "#DB2777" },
  { href: "/kinder/colores",  emoji: "🎨", title: "Colores",   description: "Identifica los colores",     color: "#DC2626" },
  { href: "/kinder/palabras", emoji: "💬", title: "Palabras",  description: "Reconoce palabras",          color: "#059669" },
  { href: "/kinder/ingles",   emoji: "🇬🇧", title: "Inglés",   description: "Hello! Basic English",       color: "#2563EB" },
];

export default function KinderPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "linear-gradient(160deg,#7C3AED,#A855F7)" }}>
      <div className="flex items-center gap-3 px-4 pt-4">
        <a href="/" className="text-white/80 text-3xl font-black">←</a>
        <h1 className="text-2xl font-black text-white">🌟 Kinder</h1>
      </div>

      <div className="flex justify-center py-4">
        <Joey mood="happy" size={120} />
      </div>

      <div className="px-4 pb-8 flex flex-col gap-3 max-w-md mx-auto w-full">
        <p className="text-white/80 font-bold text-center mb-2">¿Qué quieres aprender hoy?</p>
        {activities.map((a) => (
          <ActivityCard key={a.href} {...a} />
        ))}
      </div>
    </div>
  );
}
