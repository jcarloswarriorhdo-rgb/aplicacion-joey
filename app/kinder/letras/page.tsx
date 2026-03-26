import { MultipleChoiceGame } from "@/components/MultipleChoiceGame";
import { kinderLetras } from "@/lib/gameData";

export default function LetrasPage() {
  return (
    <MultipleChoiceGame
      title="Letras"
      emoji="🔤"
      bgFrom="#DB2777"
      bgTo="#BE185D"
      questions={kinderLetras}
      backHref="/kinder"
    />
  );
}
