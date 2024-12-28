import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Header from "../components/header";
import { useEffect, useState } from "react";
import { User } from "../types/user";
import { QuestionIntf } from "../types/question";
import { getUser } from "../utils/getUser";
import LecturerQuestion from "./lecturerQuestion";



function LecturerIntf() {

    const navigate = useNavigate();
    const params = useParams();
    const [user, setUser] = useState<User | null>(null);
    const [questions, setQuestions] = useState<number[]>([0]); // Initialize with one question
    const [old_questions, setOldQuestions] = useState<QuestionIntf[]>([]); // Initialize with one question


    let sess_id = params["sess_id"];

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

    // TODO: Handle requesting old questions from the backend, they should be returned in the form of an array of QuestionIntf

    useEffect(() => {
      if (document.cookie == "") {
        navigate("/");
      }

      const fetchData = async () => {
        const result = await getUser(`${import.meta.env.VITE_BACKEND_URL}/getuser`);
        setUser(result);
  
        const questionsResult = await fetch(`${import.meta.env.VITE_BACKEND_URL}/questions?sess_id=${sess_id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const questionsData = await questionsResult.json();
        setOldQuestions(questionsData);
      };
  
      fetchData();
    }, [navigate, sess_id]);
     
  return (
      <div>
        <Header user={user} navigate={navigate} />
        <div className="p-6">
          <h2 className="text-2xl mb-4"> Quiz # {sess_id}</h2>
          
          {old_questions.length > 0 ? (
            old_questions.map((question) => (
            <LecturerQuestion key={question._id} old={true} oldQuestion={question} />
            ))
          ) : (
            <p className="text-gray-400">No previous questions available</p>
          )}



          {questions.map((index) => (
            <LecturerQuestion key={index} old={false} oldQuestion={null} />
          ))}
          <div className="flex justify-between mt-4">
            <button
              onClick={handleNext}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Next
            </button>
            <button
              onClick={handleFinish}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Finish
            </button>
          </div>
        </div>
      </div>
    );
  }
 
 export default LecturerIntf;