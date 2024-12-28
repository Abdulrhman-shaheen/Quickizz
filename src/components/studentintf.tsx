import QuestionsTransition from "./questiontransition";
import Question from "./question";
import { fetchingData } from "../utils/fetchingData";
import { useState, useEffect } from "react";
import { getUser } from "../utils/getUser";
import { useNavigate, useParams } from "react-router-dom";
import { User } from "../types/user";
import { scoreUpdate } from "../utils/scoreUpdate";
import { QuestionIntf } from "../types/question";
import Header from "./header";

function StudentIntf() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  let [newscore, setNewScore] = useState(0);

  let sess_id = useParams()["sess_id"];
  if (Number.isNaN(Number(sess_id))) {
    navigate("/student/home");
  }
  useEffect(() => {
    if (document.cookie == "") {
      navigate("/");
    }
    const fetchData = async () => {
      const result = await getUser(
        `${import.meta.env.VITE_BACKEND_URL}/getuser`
      );
      setUser(result);
    };

    fetchData();
  }, []);

  let Questions = fetchingData<QuestionIntf[]>(
    `${import.meta.env.VITE_BACKEND_URL}/questions`
  );

  let total = Questions ? Questions.length : 0;
  scoreUpdate(sess_id ? sess_id : "", newscore);
  return (
    <div>
    <Header
        user={user}
        navigate={navigate}
        score={String(newscore) + "/" + String(total)}
      />
      <div className="flex flex-col mt-5 gap-2 items-center">
        {Questions ? (
          Questions.map((question) => (
            <QuestionsTransition key={question._id}>
              <Question
                question={question}
                setScore={setNewScore}
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
