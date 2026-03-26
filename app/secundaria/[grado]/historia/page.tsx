import { MultipleChoiceGame } from "@/components/MultipleChoiceGame";
import { secundariaHistoria } from "@/lib/gameData";

export default async function HisPage(props: PageProps<"/secundaria/[grado]/historia">) {
  const { grado } = await props.params;
  const questions = secundariaHistoria[grado] ?? secundariaHistoria["1"];
  return (
    <MultipleChoiceGame title={`Historia ${grado}°`} emoji="📜"
      bgFrom="#92400E" bgTo="#78350F" questions={questions} backHref={`/secundaria/${grado}`} />
  );
}
