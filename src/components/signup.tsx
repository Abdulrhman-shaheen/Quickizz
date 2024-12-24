import { handleSubmit } from "../utils/handlesubmit.ts";

// TODO: Style it as other components. This is just for testing.

function Signup() {

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-black flex flex-col border border-[#302f2f] shadow-lg rounded-3xl p-8 max-w-lg w-full">
        <h1 className="text-5xl font-bold text-white text-center mb-12">Signup</h1>
        <form className="space-y-7 flex gap-3 flex-col items-center" onSubmit={(e) => handleSubmit(e, "http://localhost:5000/signup")}>
          <div className="space-y-4 flex flex-col items-center">
            <input  name="username" type="text" placeholder="Enter your username" className=" min-w-96 p-4 border text-white border-[#302f2f] rounded-xl focus:outline-none bg-black focus:ring-2 focus:ring-gray-600 focus:border-transparent" required />
            <input name="password" type="password" placeholder="Enter your password" className="min-w-96 p-4 border text-white border-[#302f2f] rounded-xl focus:outline-none bg-black focus:ring-2 focus:ring-gray-600 focus:border-transparent" required />
          </div>
          <button type="submit" className="w-52 flex justify-center p-3 text-2xl bg-white text-black font-semibold rounded-2xl shadow-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-1">
            Signup
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
