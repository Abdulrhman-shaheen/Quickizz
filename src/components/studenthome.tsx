import { getUser } from "../utils/getUser";
import { useState, useEffect } from "react";
import { User } from "../types/user";
import { useNavigate } from "react-router-dom";
import Header from "./header";
import Dialogue from "./dialogue";
import QuestionsTransition from "./questiontransition";
import { fetchingData } from "../utils/fetchingData";
import { Choices } from "../types/choices";

function StudentHome() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const toggleDialog = () => {
    setDialogOpen(!dialogOpen);
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
    };

    fetchData();
  }, []);

  const quizzes = user ? user["quizzes"] : [];
  const quizScores = fetchingData<Choices[]>(`${import.meta.env.VITE_BACKEND_URL}/updateuserquizzes`)

  return (
    <div>
      <Header user={user} navigate={navigate} />
      {quizzes.length > 0 ? (
        quizzes.map((quiz: number) => (
          <div key={quiz} className="flex flex-col items-center mt-6">
            <QuestionsTransition>
                <button
                  onClick={() => navigate(`/student/interface/${quiz}`)}
                  className="bg-transparent flex flex-row items-center justify-between hover:bg-white/15 text-white p-2 w-full h-full duration-200"
                >
                  <p className="text-2xl">Quiz: {quiz}</p>
                  <p className="text-xl">Score: {quizScores?.find(qs => qs.sess_id.includes(quiz.toString()))?.score ?? "0"}</p>
                </button>
            </QuestionsTransition>
          </div>
        ))
      ) : (
        <div className="flex justify-center items-center h-96 text-2xl font-inter text-gray-200 italic">
          No previous quizzes available
        </div>
      )}
      <div className="absolute bottom-10 right-10 mr-auto text-2xl font-inter text-gray-300 italic">
        <button onClick={() => toggleDialog()} className="bg-white hover:bg-gray-300  text-black font-bold py-2 px-4 rounded-full transform transition-transform duration-600 hover:rotate-180">
          +
        </button>
        {dialogOpen && (<Dialogue toggle={toggleDialog} navigate={navigate} userType={"student"}/>
)}

      </div>
    </div>
  );
}

export default StudentHome;
