import Quiz from "./quiz";
import {useState} from "react";
function UserInter() {
    let [quiz, setQuiz] = useState<string[]>([]);
  return (
    <div>
      <button className="inset-0 text-white"
      onClick={() => {setQuiz([...quiz, "This is a Quiz"]) }}>plus</button>
        {quiz.map((quiz) => (<Quiz key={quiz}>{quiz}</Quiz>))}
    </div>
  );
}

export default UserInter;