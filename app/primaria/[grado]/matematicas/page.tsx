import { MultipleChoiceGame } from "@/components/MultipleChoiceGame";
import { primariaMatematicas } from "@/lib/gameData";

export default async function MatPage(props: PageProps<"/primaria/[grado]/matematicas">) {
  const { grado } = await props.params;
  const questions = primariaMatematicas[grado] ?? primariaMatematicas["1"];
  return (
    <MultipleChoiceGame title={`Matemáticas ${grado}°`} emoji="🔢"
      bgFrom="#1D4ED8" bgTo="#1E40AF" questions={questions} backHref={`/primaria/${grado}`} />
  );
}
