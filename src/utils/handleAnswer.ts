import { QuestionIntf } from "../types/question";
import { answersUpdate } from "./answerUpdate";

export function handleAnswer(
  question: QuestionIntf,
  choice: string,
  setSubmited: (update: boolean) => void,
  setScore: (update: (prev: number) => number) => void
) {
  if (choice == question.correct) {
    setScore((prev: number) => prev + 1);
  }
  setSubmited(true);
  answersUpdate(
    question.sess_id,
    question._id,
    choice
  );
}
