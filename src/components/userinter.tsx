import QuestionsTransition from "./questiontransition";
import {useState} from "react";

function UserInter() {
    let [quiz, setQuiz] = useState<string[]>([]);
  return (
    <div>
        <header className="border-b-2 text-black text-2xl p-4">
        <div>
            <h1 
            className="text-white before:content-attr-letters before:inline-block before:w-10 before:h-10 before:text-center before:bg-white before:text-black before:leading-10 before:rounded-full before:align-middle before:text-base before:mr-4" data-letters="AA"
            >Ali AboHendy</h1>
        </div>
        </header>
         <div className="w-full">
      <button className="inset-0 text-black"
      onClick={() => {setQuiz([...quiz, "This is a Quiz"]) }}>plus</button>
        {quiz.map((quiz) => (<QuestionsTransition key={quiz}>{quiz}</QuestionsTransition>))}
    </div> 
        </div>
  );
}

export default UserInter;