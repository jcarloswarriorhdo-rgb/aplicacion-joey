import { MultipleChoiceGame } from "@/components/MultipleChoiceGame";
import { primariaEspanol } from "@/lib/gameData";

export default async function EspPage(props: PageProps<"/primaria/[grado]/espanol">) {
  const { grado } = await props.params;
  const questions = primariaEspanol[grado] ?? primariaEspanol["1"];
  return (
    <MultipleChoiceGame title={`Español ${grado}°`} emoji="📖"
      bgFrom="#92400E" bgTo="#78350F" questions={questions} backHref={`/primaria/${grado}`} />
  );
}
