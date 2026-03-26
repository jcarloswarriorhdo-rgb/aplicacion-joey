import { MultipleChoiceGame } from "@/components/MultipleChoiceGame";
import { primariaGeografia } from "@/lib/gameData";

export default async function GeoPage(props: PageProps<"/primaria/[grado]/geografia">) {
  const { grado } = await props.params;
  const questions = primariaGeografia[grado] ?? primariaGeografia["1"];
  return (
    <MultipleChoiceGame title={`Geografía ${grado}°`} emoji="🌎"
      bgFrom="#065F46" bgTo="#047857" questions={questions} backHref={`/primaria/${grado}`} />
  );
}
