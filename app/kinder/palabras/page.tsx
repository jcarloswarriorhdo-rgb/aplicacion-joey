import { MultipleChoiceGame } from "@/components/MultipleChoiceGame";
import { kinderPalabras } from "@/lib/gameData";

export default function PalabrasPage() {
  return (
    <MultipleChoiceGame
      title="Palabras"
      emoji="💬"
      bgFrom="#059669"
      bgTo="#047857"
      questions={kinderPalabras}
      backHref="/kinder"
    />
  );
}
