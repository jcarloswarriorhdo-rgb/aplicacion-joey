import { ActivityCard } from "@/components/ActivityCard";
import { Joey } from "@/components/Joey";

const activities = [
  { slug: "matematicas", emoji: "🔢", title: "Matemáticas", description: "Suma, resta, multiplicación…", color: "#1D4ED8" },
  { slug: "geografia",   emoji: "🌎", title: "Geografía",   description: "Capitales, estados, países",   color: "#065F46" },
  { slug: "espanol",     emoji: "📖", title: "Español",     description: "Gramática, ortografía",        color: "#92400E" },
  { slug: "ingles",      emoji: "🇬🇧", title: "Inglés",     description: "English for your grade",       color: "#6D28D9" },
];

export default async function GradoPage(props: PageProps<"/primaria/[grado]">) {
  const { grado } = await props.params;
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "linear-gradient(160deg,#059669,#10B981)" }}>
      <div className="flex items-center gap-3 px-4 pt-4">
        <a href="/primaria" className="text-white/80 text-3xl font-black">←</a>
        <h1 className="text-2xl font-black text-white">📚 {grado}° Primaria</h1>
      </div>
      <div className="flex justify-center py-4">
        <Joey mood="happy" size={100} />
      </div>
      <div className="px-4 pb-8 flex flex-col gap-3 max-w-md mx-auto w-full">
        <p className="text-white/80 font-bold text-center mb-2">Elige una materia</p>
        {activities.map((a) => (
          <ActivityCard key={a.slug}
            href={`/primaria/${grado}/${a.slug}`}
            emoji={a.emoji} title={a.title} description={a.description} color={a.color}
          />
        ))}
      </div>
    </div>
  );
}
