import { useState } from "react";
import { QuestionIntf } from "../types/question";
import Choice from "./choice";
import { handleAnswer } from "../utils/handleAnswer";

function Question({
  question,
  score,
  setScore,
  choices,
  alreadyAnswered,
}: {
  question: QuestionIntf;
  score: number;
  setScore: any;
  choices: { a: number; b: number; c: number; d: number };
  alreadyAnswered: boolean;
}) {
  const [selectedChoice, setSelectedChoice] = useState<string>("");
  const [submitted, setSubmited] = useState(alreadyAnswered);
  

  let total_choices = 0;
  (["a", "b", "c", "d"] as const).map((choice) => {
    total_choices += choices && choices[choice] ? choices[choice] : 0;
  });

  let percentages = { a: 0, b: 0, c: 0, d: 0 };

  (["a", "b", "c", "d"] as const).map((choice) => {
    percentages[choice] = choices && choices[choice]
      ? Number(((choices && choices[choice] / total_choices) * 100).toFixed(2))
      : 0;
  });

  percentages = total_choices > 0 ? percentages : { a: 0, b: 0, c: 0, d: 0 };

  return (
    <div className="flex flex-col items-center gap-2">
      <h1 className="text-xl mb-5 text-center pb-3">{question.question}</h1>
      {(["a", "b", "c", "d"] as const).map((choice) => (
        <Choice
          key={choice}
          question={question}
          choice={choice}
          votes={choices && choices[choice] ? choices[choice] : 0}
          percent={percentages[choice]}
          selectedChoice={selectedChoice}
          handleChoiceSelection={setSelectedChoice}
          submitted={submitted}
        />
      ))}
      <button
        onClick={() =>
          handleAnswer(question, selectedChoice, setSubmited, score, setScore)
        }
        className="bg-white text-black text-base  font-semibold hover:bg-gray-200 focus:ring-2 focus:ring-gray-500 py-1 px-2 rounded-lg mt-6 disabled:bg-gray-400"
        disabled={submitted}
      >
        Submit
      </button>
    </div>
  );
}

export default Question;
