import { useState } from "react";
import { QuestionIntf } from "../types/question";
import Choice from "./choice";
import { handleAnswer } from "../utils/handleAnswer";

function Question({
  question,
  setScore,
}: {
  question: QuestionIntf;
  setScore: (update: (prev: number) => number) => void;
}) {
  const [selectedChoice, setSelectedChoice] = useState<string>("");
  const [submitted, setSubmited] = useState(false);

  return (
    <div>
      <h1 className="text-xl mb-5 text-center border-b border-gray-600 pb-3">
        {question.question}
      </h1>
      {(["a", "b", "c", "d"] as const).map((choice) => (
        <Choice
          key={choice}
          question={question}
          choice={choice}
          handleChoiceSelection={setSelectedChoice}
          submitted={submitted}
        />
      ))}
      <button
        onClick={() =>
          handleAnswer(question, selectedChoice, setSubmited, setScore)
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
