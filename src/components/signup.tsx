import { handleSubmit } from "../utils/handlesubmit.ts";
import { data, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

function Signup() {
  const home = useLocation().pathname;
  const navigate = useNavigate();

  const [error, setError] = useState("");

  
  const updateError = (error : string) => {
    setError(error);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const result = await handleSubmit(
      e,
      `${import.meta.env.VITE_BACKEND_URL}/signup`,
      home,
      navigate
    );
    if (result == "USER_EXISTS") {
      updateError("Username already exists");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-black flex flex-col border border-[#302f2f] shadow-lg rounded-3xl p-8 max-w-lg w-full">
        <h1 className="text-5xl font-bold text-white text-center mb-12">
          Signup
        </h1>

        <form
          className="space-y-7 flex gap-3 flex-col items-center"
          onSubmit={onSubmit}
        >
          <div className="space-y-4 flex flex-col items-center">
            <input
              name="firstname"
              type="text"
              placeholder="First Name"
              className="min-w-96 p-4 border text-white border-[#302f2f] rounded-xl focus:outline-none bg-black focus:ring-2 focus:ring-gray-600 focus:border-transparent"
              required
            />
            <input
              name="lastname"
              type="text"
              placeholder="Last Name"
              className="min-w-96 p-4 border text-white border-[#302f2f] rounded-xl focus:outline-none bg-black focus:ring-2 focus:ring-gray-600 focus:border-transparent"
              required
            />
            <input
              name="username"
              type="text"
              placeholder="Username"
              className=" min-w-96 p-4 border text-white border-[#302f2f] rounded-xl focus:outline-none bg-black focus:ring-2 focus:ring-gray-600 focus:border-transparent"
              required
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="min-w-96 p-4 border text-white border-[#302f2f] rounded-xl focus:outline-none bg-black focus:ring-2 focus:ring-gray-600 focus:border-transparent"
              required
            />
          </div>
          <div className="flex items-center space-x-4">
            <p className="text-[#FA003F]"> {error} </p>
          </div>
          <button
            type="submit"
            className="w-52 flex justify-center p-3 text-2xl bg-white text-black font-semibold rounded-2xl shadow-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-1"
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
