import { QuestionIntf } from "../types/question";

function Choice({
  question,
  choice,
  selectedChoice,
  submitted,
  handleChoiceSelection,
}: {
  question: QuestionIntf;
  choice: "a" | "b" | "c" | "d";
  selectedChoice: string;
  submitted: boolean;
  handleChoiceSelection: (choice: string) => void;
}) {
  let value = "";
  if (submitted) {
    
    if (question.correct === choice) {
      value += "border-green-500 ";
    }
    else if (selectedChoice == choice) {
      value += "border-red-500 ";
    }
    else{
      value += "border-gray-500 ";
    }
  } else {
    value += "border-white hover:bg-white/10 hover:duration-300 cursor-pointer";
  }

  return (
    <div
      className={` w-96 duration-300 border-4 box-border flex flex-row items-center gap-3 p-2 rounded-lg mt-2 ${value}`}
    >
      <label
        htmlFor={`choice-${question._id}-${choice}`}
        className={`${
          !submitted ? "cursor-pointer" : ""
        } flex flex-row items-center gap-3 w-full h-full p-2}`}
      >
        <div className="p-1 duration-300 border border-gray-300 rounded-full flex items-center justify-center">
          <input
            type="radio"
            id={`choice-${question._id}-${choice}`}
            name={`choice-${question._id}`}
            value={choice}
            onChange={() => handleChoiceSelection(choice)}
            disabled={submitted}
            className="cursor-pointer peer hidden"
            
          />

          <div className="w-2.5 h-2.5 duration-300 border-gray-300 rounded-full flex items-center justify-center peer-checked:border-blue-500 peer-checked:bg-white"></div>
        </div>
        <span className="text-base flex justify-between w-full">
          <p>{question[choice]}</p> <p>percent</p>
        </span>
      </label>
    </div>
  );
}

export default Choice;
