import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Header from "../components/header";
import { useEffect, useState } from "react";
import { User } from "../types/user";
import { getUser } from "../utils/getUser";
import LecturerQuestion from "./lecturerQuestion";



function LecturerIntf() {

     const navigate = useNavigate();
     const params = useParams();
     const [user, setUser] = useState<User | null>(null);
     const [questions, setQuestions] = useState<number[]>([0]); // Initialize with one question

     let sess_id = params["sess_id"];

     if (Number.isNaN(Number(sess_id))) {
          navigate("/lecturer/home");
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

    const handleNext = () => {
     setQuestions([...questions, questions.length]); // Add a new question index
   };
 
   const handleFinish = async () => {
     // Handle finish logic here
     navigate("/lecturer/home");
   };
     
  return (
     <div>
       <Header user={user} navigate={navigate} />
       <div className="p-6">
         <h2 className="text-2xl mb-4">Create a New Quiz</h2>
         {questions.map((index) => (
           <LecturerQuestion key={index} />
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