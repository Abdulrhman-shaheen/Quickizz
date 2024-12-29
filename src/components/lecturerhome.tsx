import Header from "../components/header";
import { User } from "../types/user";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../utils/getUser";
import Dialogue from "./dialogue";
import QuestionsTransition from "./questiontransition";

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
  
    const sessions = user ? user["sessions"] : [];
  
    return (
      <div>
        <Header user={user} navigate={navigate} />
        {sessions.length > 0 ? (
          sessions.map((session) => (
            <div key={session} className="flex flex-col items-center mt-6">
            <QuestionsTransition>
                <button
                  onClick={() => navigate(`/lecturer/interface/${session}`)}
                  className="bg-transparent flex flex-row items-center justify-between rounded-lg hover:bg-white/15 text-white p-2 w-full h-full duration-200"
                >
                  <p className="text-2xl">Quiz: {session}</p>
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
          
          {/* TODO: Handle creating new session for the lecturer in the database if the session doesn't exist */
            // Done
          }
          {dialogOpen && (<Dialogue toggle={toggleDialog} navigate={navigate} userType={"lecturer"}/>
  )}
  
        </div>
      </div>
    );
  }
  
export default LecturerHome;