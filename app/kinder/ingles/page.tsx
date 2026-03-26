import { MultipleChoiceGame } from "@/components/MultipleChoiceGame";
import { kinderIngles } from "@/lib/gameData";

export default function InglesPage() {
  return (
    <MultipleChoiceGame
      title="English"
      emoji="🇬🇧"
      bgFrom="#2563EB"
      bgTo="#1D4ED8"
      questions={kinderIngles}
      backHref="/kinder"
    />
  );
}
