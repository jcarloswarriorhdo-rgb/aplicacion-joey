import { MultipleChoiceGame } from "@/components/MultipleChoiceGame";
import { secundariaAlgebra } from "@/lib/gameData";

export default async function AlgPage(props: PageProps<"/secundaria/[grado]/algebra">) {
  const { grado } = await props.params;
  const questions = secundariaAlgebra[grado] ?? secundariaAlgebra["1"];
  return (
    <MultipleChoiceGame title={`Álgebra ${grado}°`} emoji="➗"
      bgFrom="#4338CA" bgTo="#3730A3" questions={questions} backHref={`/secundaria/${grado}`} />
  );
}
