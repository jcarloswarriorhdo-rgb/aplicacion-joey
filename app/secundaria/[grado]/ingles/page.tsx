import { MultipleChoiceGame } from "@/components/MultipleChoiceGame";
import { secundariaIngles } from "@/lib/gameData";

export default async function SecEngPage(props: PageProps<"/secundaria/[grado]/ingles">) {
  const { grado } = await props.params;
  const questions = secundariaIngles[grado] ?? secundariaIngles["1"];
  return (
    <MultipleChoiceGame title={`English ${grado}°`} emoji="🇬🇧"
      bgFrom="#1D4ED8" bgTo="#1E40AF" questions={questions} backHref={`/secundaria/${grado}`} />
  );
}
