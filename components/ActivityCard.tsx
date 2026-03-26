import Link from "next/link";

interface Props {
  href: string;
  emoji: string;
  title: string;
  description: string;
  color: string;
}

export function ActivityCard({ href, emoji, title, description, color }: Props) {
  return (
    <Link href={href}
      className="flex items-center gap-4 rounded-3xl p-4 shadow-lg font-black transition-transform hover:scale-105 active:scale-95"
      style={{ background: color }}>
      <span className="text-4xl">{emoji}</span>
      <div>
        <p className="text-white text-lg leading-tight">{title}</p>
        <p className="text-white/75 text-sm font-semibold">{description}</p>
      </div>
    </Link>
  );
}
