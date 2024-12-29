import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Header from "../components/header";
import { useEffect, useState } from "react";
import { User } from "../types/user";
import { QuestionIntf } from "../types/question";
import { getUser } from "../utils/getUser";
import LecturerQuestion from "./lecturerQuestion";
import { fetchingData } from "../utils/fetchingData";
import Question from "./question";
import QuestionsTransition from "./questiontransition";
import { sessionAnswers } from "../types/sessionAnswers";

function LecturerIntf() {
  const navigate = useNavigate();
  const params = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [questions, setQuestions] = useState<number[]>([0]); // Initialize with one question
  const [_, __] = useState<any>(null);

  let sess_id = params["sess_id"];
  // TODO: Handle requesting old questions from the backend, they should be returned in the form of an array of QuestionIntf
  // Done
  const [old_questions, setOldQuestions] = fetchingData<QuestionIntf[]>(
    `${import.meta.env.VITE_BACKEND_URL}/questions?sess_id=${sess_id}`
  );

  if (Number.isNaN(Number(sess_id))) {
    navigate("/lecturer/home");
  }

  const handleNext = () => {
    setQuestions([...questions, questions.length]); // Add a new question index
  };

  const handleFinish = async () => {
    // Handle finish logic here
    navigate("/lecturer/home");
  };

  useEffect(() => {
    if (document.cookie == "") {
      navigate("/");
    }

    const fetchData = async () => {
      const result = await getUser(
        `${import.meta.env.VITE_BACKEND_URL}/getuser`
      );
      setUser(result);

      const questionsResult = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/questions?sess_id=${sess_id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const questionsData = await questionsResult.json();
      setOldQuestions(questionsData);
    };

    fetchData();
  }, [navigate, sess_id]);

  let [answers, ___] = fetchingData<sessionAnswers>(
    `${import.meta.env.VITE_BACKEND_URL}/answers?sess_id=${sess_id}`
  );

  return (
    <div>
      <Header user={user} navigate={navigate} score={` Quiz #${sess_id}`} />
      <div className="flex flex-col items-center ">
        <div className="p-6 w-1/2 min-w-min flex flex-col gap-3">
          {old_questions && old_questions.length > 0 ? (
            old_questions.map((question) => (
              <QuestionsTransition key={question._id}>
                <Question
                  question={question}
                  score={_}
                  setScore={__}
                  prevchoice=""
                  choices={
                    answers
                      ? answers["answers"][question._id]
                      : { a: 0, b: 0, c: 0, d: 0 }
                  }
                  key={question._id}
                  alreadyAnswered={true}
                />
              </QuestionsTransition>
            ))
          ) : (
            <p className="text-gray-400">No previous questions available</p>
          )}

          {questions.map((index) => (
            <div key={index}>
              <LecturerQuestion key={index} old={false} oldQuestion={null} />
            </div>
          ))}

          <div className="flex justify-between">
            <button
              onClick={handleNext}
              className="bg-white hover:bg-white/15 hover:text-white text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Next
            </button>
            <button
              onClick={handleFinish}
              className="bg-white hover:bg-white/15 hover:text-white text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Finish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LecturerIntf;
