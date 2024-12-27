import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Header from "../components/header";
import { useEffect, useState } from "react";
import { User } from "../types/user";
import { getUser } from "../utils/getUser";


function LecturerIntf() {

     const [user, setUser] = useState<User | null>(null);
     const params = useParams();
     let sess_id = params["sess_id"];
     const navigate = useNavigate();
     const [question, setQuestion] = useState("");
     const [answers, setAnswers] = useState(["", "", "", ""]);
     const [correctAnswer, setCorrectAnswer] = useState<number | null>(null);

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

     

     if (Number.isNaN(Number(sess_id))) {
          navigate("/lecturer/home");
     }

     const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          setQuestion(e.target.value);
     };

     const handleAnswerChange = (index: number, value: string) => {
          const newAnswers = [...answers];
          newAnswers[index] = value;
          setAnswers(newAnswers);
        };

     const handleCorrectAnswerChange = (index: number) => {
          setCorrectAnswer(index);
     };


     const handleNext = () => {
          // TODO: Send the question, answers, and correct answer to the db
          // Reset the form for the next question
          setQuestion("");
          setAnswers(["", "", "", ""]);
          setCorrectAnswer(null);
        };
      
        const handleFinish = () => {
          // TODO: Send the question, answers, and correct answer to the db
          navigate("/lecturer/home");
        };

     // TODO: Add a new quiz to the db with the given session ID

     return (
          <div>
            <Header user={user} navigate={navigate} />
            <div className="p-6">
              <h2 className="text-2xl mb-4">Create a New Quiz</h2>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Question:
                  </label>
                  <input
                    type="text"
                    value={question}
                    onChange={handleQuestionChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="mb-4">
                  {answers.map((answer, index) => (
                    <div key={index} className="mb-2">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Answer {index + 1}:
                      </label>
                      <input
                        type="text"
                        value={answer}
                        onChange={(e) => handleAnswerChange(index, e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                      <label className="inline-flex items-center mt-2">
                        <input
                          type="radio"
                          name="correctAnswer"
                          checked={correctAnswer === index}
                          onChange={() => handleCorrectAnswerChange(index)}
                          className="form-radio"
                        />
                        <span className="ml-2">Correct Answer</span>
                      </label>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between">
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