import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Header from "../components/header";
import { useEffect, useState } from "react";
import { User } from "../types/user";
import { getUser } from "../utils/getUser";


function LecturerIntf() {

     const navigate = useNavigate();
     const params = useParams();
     const [user, setUser] = useState<User | null>(null);
     const [question, setQuestion] = useState("");
     const [answers, setAnswers] = useState(["", "", "", ""]);
     const [correctAnswer, setCorrectAnswer] = useState<number | null>(null);

     let sess_id = params["sess_id"];

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

     // TODO: Handle in the backend
     const sendDataToDB = async () => {
          try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/add-question`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
               sess_id: sess_id,
               question: question,
               a: answers[0],
               b: answers[1],
               c: answers[2],
               d: answers[3],
               correct: transform_radio(correctAnswer),
              }),
            });
            if (!response.ok) {
              throw new Error("Failed to send data to the database");
            }
            const result = await response.json();
            console.log(result);
          } catch (error) {
            console.error("Error:", error);
          }
     };

     const handleNext = async (e: React.FormEvent) => {
          e.preventDefault();
          await sendDataToDB();
          // Reset the form for the next question
          setQuestion("");
          setAnswers(["", "", "", ""]);
          setCorrectAnswer(null);
     };
      
      
     const handleFinish = async (e: React.FormEvent) => {
          e.preventDefault();
          await sendDataToDB();
          navigate("/lecturer/home");
     };


     const transform_radio = (index: number | null) => {
          if (index === 0) { return "a"; }
          else if (index === 1) { return "b"; }
          else if (index === 2) { return "c"; }
          else if (index === 3) { return "d"; }
     }

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