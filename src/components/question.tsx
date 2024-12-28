import { useState } from "react";
import { QuestionIntf } from "../types/question";
import Choice from "./choice";
import { handleAnswer } from "../utils/handleAnswer";

function Question({
  question,
  score,
  setScore,
}: {
  question: QuestionIntf;
  score: number;
  setScore: any;
}) {
  const [selectedChoice, setSelectedChoice] = useState<string>("");
  const [submitted, setSubmited] = useState(false);

  return (
    <div className="flex flex-col items-center gap-2">
      <h1 className="text-xl mb-5 text-center pb-3">
        {question.question} 
      </h1>
      {(["a", "b", "c", "d"] as const).map((choice) => (
        <Choice
          key={choice}
          question={question}
          choice={choice}
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
