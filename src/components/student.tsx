import { Link } from "react-router-dom";
import PageTransition from "./pagetransition.tsx";
import { handleSubmit } from "../utils/handlesubmit.ts";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
function Student() {
  const home = useLocation().pathname;
  const navigate = useNavigate();

    const [error, setError] = useState("");
  
    
    const updateError = (error : string) => {
      setError(error);
    };
  
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      const result = await handleSubmit(
        e,
        `${import.meta.env.VITE_BACKEND_URL}/login`,
        home,
        navigate
      );
      if (result == "WRONG_CREDS") {
        updateError("Username or password entered is incorrect.");
      }
    };
    
  return (
    <PageTransition>
      <div className="flex flex-col justify-center items-center w-2/5 min-w-96 text-2xl text-[#FFFFFF] gap-9 bg-black p-8 rounded-3xl border-[#302f2f] border">
        <h1 className="text-[#FFFFFF] text-6xl mb-6 text-center">
          {" "}
          Welcome Student{" "}
        </h1>
        <form
          className="space-y-7 flex gap-3 flex-col items-center"
          onSubmit={onSubmit}
        >
          <div className="flex flex-col gap-3">
            <input
              className="rounded-xl border-[#302f2f] border text-white gap-2 min-w-80 cursor-text font-medium bg-black p-4 text-base"
              type="text"
              placeholder="Username"
              name="username"
              required={true}
            />
            <input
              className="rounded-xl border-[#302f2f] border text-white gap-2 w-full cursor-text font-medium bg-black p-4 text-base"
              type="password"
              placeholder="Password"
              name="password"
              required={true}
            />
          </div>
          <div className="flex flex-col gap-2 justify-center items-center">
          <p className="text-[#FA003F] text-xl"> {error} </p>
            <button
              type="submit"
              className="visited:text-black hover:bg-gray-200 no-underline flex justify-center rounded-lg p-3 border text-xl-1 cursor-pointer bg-white w-60 font-medium text-black"
            >
              Login
            </button>
            <p className="text-base">
              {" "}
              Don&apos;t have account?{" "}
              <Link className="underline" to="/signup">
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </PageTransition>
  );
}

export default Student;
