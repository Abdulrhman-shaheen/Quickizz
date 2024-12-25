import QuestionsTransition from "./questiontransition";
import { useState, useEffect } from "react";
import Question from "./question";

function StudentIntf() {
  let [data, setData] = useState<{ [key: string]: string }[]>([{
    "sess_id": "1",
    "question": "Which planet is known as the Red Planet?",
    "a": "Earth",
    "b": "Mars",
    "c": "Jupiter",
    "d": "Saturn",
    "correct": "b"
  }]);

  // useEffect(() => {
  //   fetchInfo();
  // }, []);

  // const fetchInfo = () => {
  //   const url = "https://jsonplaceholder.typicode.com/users";

  //   return fetch(url)
  //     .then((res) => res.json())
  //     .then((d) => setData(d));
  // };

  let score = 0;
  let total = 0;

  return (
    <div>
      <header className="border-b-2 text-black text-2xl p-6">
        <div className="flex flex-row justify-between items-center">
          <h1
            className="text-white before:content-attr-letters before:inline-block before:w-10 before:h-10 before:text-center before:bg-white before:text-black before:leading-10 before:rounded-full before:align-middle before:text-base before:mr-4"
            data-letters="AA"
          >
            Ali AboHendy
          </h1>
          <p className="text-white flex items-center">
            Score: {score}/{total}
          </p>
          <button className="bg-white text-xl flex justify-center font-semibold shadow-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-1 text-black py-1 px-2 rounded-lg">
            Sign out
          </button>
        </div>
      </header>
      <div className="flex flex-col items-center">
        {data.map((questions, i) => (
          <QuestionsTransition key={questions.question}>
           <Question question={questions} key={questions.question}/>
          </QuestionsTransition>
        ))}
      </div>
    </div>
  );
}

export default StudentIntf;
