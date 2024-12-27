import { getUser } from "../utils/getUser";
import { useState, useEffect } from "react";
import Header from "./header";
import { User } from "../types/user";
import { useNavigate } from "react-router-dom";
function StudentHome() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

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

  return (
    <div>
      <Header user={user} navigate={navigate} />
      <div className="flex flex-wrap m-12 gap-10">
        <div className="border min-w-96 h-96"></div>
        <div className="border min-w-96 h-96"></div>
        <div className="border min-w-96 h-96"></div>
      </div>
    </div>
  );
}

export default StudentHome;
