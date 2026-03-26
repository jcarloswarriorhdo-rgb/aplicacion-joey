import { ActivityCard } from "@/components/ActivityCard";
import { Joey } from "@/components/Joey";

const activities = [
  { slug: "algebra",  emoji: "➗", title: "Álgebra",  description: "Ecuaciones y funciones",    color: "#4338CA" },
  { slug: "historia", emoji: "📜", title: "Historia", description: "Civilizaciones y eventos",  color: "#92400E" },
  { slug: "ciencias", emoji: "🔬", title: "Ciencias", description: "Bio, Física, Química",      color: "#065F46" },
  { slug: "ingles",   emoji: "🇬🇧", title: "Inglés",  description: "Advanced English",          color: "#1D4ED8" },
];

export default async function SecGradoPage(props: PageProps<"/secundaria/[grado]">) {
  const { grado } = await props.params;
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "linear-gradient(160deg,#1E3A5F,#2563EB)" }}>
      <div className="flex items-center gap-3 px-4 pt-4">
        <a href="/secundaria" className="text-white/80 text-3xl font-black">←</a>
        <h1 className="text-2xl font-black text-white">🎓 {grado}° Secundaria</h1>
      </div>
      <div className="flex justify-center py-4">
        <Joey mood="happy" size={100} />
      </div>
      <div className="px-4 pb-8 flex flex-col gap-3 max-w-md mx-auto w-full">
        <p className="text-white/80 font-bold text-center mb-2">Elige una materia</p>
        {activities.map((a) => (
          <ActivityCard key={a.slug}
            href={`/secundaria/${grado}/${a.slug}`}
            emoji={a.emoji} title={a.title} description={a.description} color={a.color} />
        ))}
      </div>
    </div>
  );
}
