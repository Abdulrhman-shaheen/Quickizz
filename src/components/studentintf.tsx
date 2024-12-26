import QuestionsTransition from "./questiontransition";
import Question from "./question";
import {fetchingData} from "../utils/fetchingData";
import {useState} from "react";

function StudentIntf() {

  let [score, setScore] = useState(0);

  // let tempdata = 
  //   [{_id: "As5d5dd98d",
  //     sess_id: "1",
  //     question: "Which planet is known as the Red Planet?",
  //     a: "Earth",
  //     b: "Mars",
  //     c: "Jupiter",
  //     d: "Saturn",
  //     correct: "b",
  //   }];
  /*
  This is the data that will be fetched from the backend, 
  **tempdata** is just to test on the page, this can be deleted 
  after setting the backend.
  */
  let data = fetchingData(`${import.meta.env.VITE_BACKEND_URL}/questions`);

  let total = data.length;
  let login_data = fetchingData(`${import.meta.env.VITE_BACKEND_URL}/login`);
  return (
    <div>
      <header className="border-b-2 text-black text-2xl p-6">
        <div className="flex flex-row justify-between items-center">
          {login_data.map((user) => (
          <h1
            className="text-white before:content-attr-letters before:inline-block before:w-10 before:h-10 before:text-center before:bg-white before:text-black before:leading-10 before:rounded-full before:align-middle before:text-base before:mr-4"
            data-letters={user.firstname.charAt(0) + user.lastname.charAt(0)}
          >
            {user.firstname} {" "} {user.lastname}
          </h1>
          ))}
          <p className="text-white flex items-center">
            Score: {score}/{total}
          </p>
          <button className="bg-white text-xl flex justify-center font-semibold shadow-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-1 text-black py-1 px-2 rounded-lg">
            Sign out
          </button>
        </div>
      </header>
      <div className="flex flex-col mt-5 gap-2 items-center">
        {data.map((questions) => (
          <QuestionsTransition key={questions._id}>
            <Question question={questions} setScore={setScore} key={questions._id} />
          </QuestionsTransition>
        ))}
      </div>
    </div>
  );
}

export default StudentIntf;
