import { MultipleChoiceGame } from "@/components/MultipleChoiceGame";
import { primariaIngles } from "@/lib/gameData";

export default async function EngPage(props: PageProps<"/primaria/[grado]/ingles">) {
  const { grado } = await props.params;
  const questions = primariaIngles[grado] ?? primariaIngles["1"];
  return (
    <MultipleChoiceGame title={`English ${grado}°`} emoji="🇬🇧"
      bgFrom="#6D28D9" bgTo="#5B21B6" questions={questions} backHref={`/primaria/${grado}`} />
  );
}
