import QuestionsTransition from "./questiontransition";
import Question from "./question";
import { fetchingData } from "../utils/fetchingData";
import { useState, useEffect } from "react";
import { getUser } from "../utils/getUser";
import { useNavigate, useParams } from "react-router-dom";
import { User } from "../types/user";
import { QuestionIntf } from "../types/question";
import Header from "./header";
import { sessionAnswers } from "../types/sessionAnswers";
import { io } from "socket.io-client";
import { Choices } from "../types/choices";

function StudentIntf() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  let sess_id = useParams()["sess_id"] as string;

  let [Questions, setQuestions] = fetchingData<QuestionIntf[]>(
    `${import.meta.env.VITE_BACKEND_URL}/questions?sess_id=${sess_id}`
  );

  let [answers, setAnswers] = fetchingData<sessionAnswers>(
    `${import.meta.env.VITE_BACKEND_URL}/answers?sess_id=${sess_id}`
  );

  let [choices, _] = fetchingData<Choices>(
    `${import.meta.env.VITE_BACKEND_URL}/choices`,
    {
      sess_id: sess_id,
      credentials: true,
    }
  );

  useEffect(() => {
    const socket = io("http://127.0.0.1:5000");
    console.log("Initializing socket connection...");

    // Handle connection events
    socket.on("connect", () => {
      socket.send("Hello, server!");
    });



    socket.on( `${sess_id}_new_question`, (data) => {
      setQuestions((prev) => (prev ? [...prev, data] : [data]));
    });

    socket.on(
      `${sess_id}_new_answer`,
      (data: { id: string; choice: "a" | "b" | "c" | "d" }) => {
        setAnswers((prev) => {
          let updatedPrev = { ...prev } as sessionAnswers;
          let updatedAnswers = { ...updatedPrev.answers };
          console.log("At least im here")
          console.log(updatedAnswers)

          if (!updatedAnswers[data.id]) {
            updatedAnswers[data.id] = { a: 0, b: 0, c: 0, d: 0 };
          }

          if (!updatedAnswers[data.id][data.choice]) {
            updatedAnswers[data.id][data.choice] = 0;
          }

          updatedAnswers[data.id][data.choice] += 1;
          
          updatedPrev.answers = updatedAnswers;
          console.log(updatedAnswers)
          return updatedPrev;
        });
      }
    );


    // Clean up on unmount
    return () => {
      socket.off("connect");
      socket.off("new_questionsas");
      socket.off("new_answer");
      socket.disconnect();
    };
  }, []);

  let [newScore, setScore] = fetchingData<{
    scores: { [key: string]: number };
  }>(`${import.meta.env.VITE_BACKEND_URL}/getscores`, {
    quizzes: [sess_id],
    watch: [user],
    credentials: true,
  });

  if (Number.isNaN(Number(sess_id))) {
    navigate("/student/home");
  }
  useEffect(() => {
    // if (document.cookie == "") {
    //   navigate("/");
    // }
    const fetchData = async () => {
      const result = await getUser(
        `${import.meta.env.VITE_BACKEND_URL}/getuser`
      );
      setUser(result);
    };

    fetchData();
  }, []);

  let total = Questions ? Questions.length : 0;
  
  console.log(Questions)
  
  return (
    <div>
      <Header
        user={user}
        navigate={navigate}
        score={
          String(newScore ? newScore["scores"][sess_id] : 0) +
          "/" +
          String(total)
        }
      />

      <div className="flex flex-col mt-5 gap-2 items-center">
        {Questions && choices ? (
          Questions.map((question) => (
            <QuestionsTransition key={question._id}>
              <Question
                question={question}
                score={newScore ? newScore["scores"][sess_id] : 0}
                setScore={setScore}
                choices={
                  answers
                    ? answers["answers"][question._id]
                    : { a: 0, b: 0, c: 0, d: 0 }
                }
                prevchoice={choices["answers"][question._id]}
                alreadyAnswered={
                  choices ? !!choices["answers"][question._id] : false
                }
                key={question._id}
              />
            </QuestionsTransition>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}
export default StudentIntf;
