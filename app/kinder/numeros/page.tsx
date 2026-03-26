import { MultipleChoiceGame } from "@/components/MultipleChoiceGame";
import { kinderNumeros } from "@/lib/gameData";

export default function NumerosPage() {
  return (
    <MultipleChoiceGame
      title="Números"
      emoji="🔢"
      bgFrom="#7C3AED"
      bgTo="#6D28D9"
      questions={kinderNumeros}
      backHref="/kinder"
    />
  );
}
