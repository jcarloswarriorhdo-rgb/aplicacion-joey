import { MultipleChoiceGame } from "@/components/MultipleChoiceGame";
import { kinderColores } from "@/lib/gameData";

export default function ColoresPage() {
  return (
    <MultipleChoiceGame
      title="Colores"
      emoji="🎨"
      bgFrom="#DC2626"
      bgTo="#B91C1C"
      questions={kinderColores}
      backHref="/kinder"
    />
  );
}
