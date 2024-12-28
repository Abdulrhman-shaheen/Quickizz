import { QuestionIntf } from "../types/question";
import { answersUpdate } from "./answerUpdate";
import { scoreUpdate } from "./scoreUpdate";

export async function handleAnswer(
  question: QuestionIntf,
  choice: string,
  setSubmited: (update: boolean) => void,
  newScore: number,
  setScore: any
) {

  if (choice == question.correct) {
    setScore((prev: { scores: { [key: string]: number } }) => ({
      ...prev,
      scores: {...prev["scores"], [question.sess_id]: prev["scores"][question.sess_id] + 1 },
    }));
    await scoreUpdate(String(question.sess_id), newScore + 1);
    
  }
  

  setSubmited(true);
  answersUpdate(question.sess_id, question._id, choice);


}
