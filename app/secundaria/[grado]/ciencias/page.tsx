import { MultipleChoiceGame } from "@/components/MultipleChoiceGame";
import { secundariaCiencias } from "@/lib/gameData";

export default async function CiePage(props: PageProps<"/secundaria/[grado]/ciencias">) {
  const { grado } = await props.params;
  const questions = secundariaCiencias[grado] ?? secundariaCiencias["1"];
  return (
    <MultipleChoiceGame title={`Ciencias ${grado}°`} emoji="🔬"
      bgFrom="#065F46" bgTo="#047857" questions={questions} backHref={`/secundaria/${grado}`} />
  );
}
