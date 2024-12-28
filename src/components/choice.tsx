import { QuestionIntf } from "../types/question";

function Choice({
  question,
  choice,
  submitted,
  handleChoiceSelection,
}: {
  question: QuestionIntf;
  choice: "a" | "b" | "c" | "d";
  submitted: boolean;
  handleChoiceSelection: (choice: string) => void;
}) {
  return (
<div
  className="hover:bg-white/10 hover:duration-300 cursor-pointer border box-border border-white flex flex-row items-center gap-3 p-2 rounded-lg mt-2"
>
  <label
    htmlFor={`choice-${question._id}-${choice}`}
    className="cursor-pointer flex flex-row items-center gap-3 w-full h-full p-2"
  >
    <input
      type="radio"
      id={`choice-${question._id}-${choice}`}
      name={`choice-${question._id}`}
      value={choice}
      onChange={() => handleChoiceSelection(choice)}
      disabled={submitted}
      className="cursor-pointer"
    />
    <span className="text-base">{question[choice]}</span>
  </label>
</div>
  );
}

export default Choice;
