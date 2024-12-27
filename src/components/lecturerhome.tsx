import Header from "../components/header";
import { User } from "../types/user";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../utils/getUser";
import Dialogue from "./dialogue";

function LecturerHome() {
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
  
    return (
      <div>
        <Header user={user} navigate={navigate} />
        {quizzes.length > 0 ? (
          quizzes.map((quiz) => (
            <div key={quiz} className="flex  m-12 gap-10">
              <div className="border min-w-96 h-96"></div>
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
          {dialogOpen && (<Dialogue toggle={toggleDialog} navigate={navigate} userType={"lecturer"}/>
  )}
  
        </div>
      </div>
    );
  }
  
export default LecturerHome;