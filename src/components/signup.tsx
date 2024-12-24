import { handleSubmit } from "../utils/handlesubmit.ts";


// TODO: Style it as other components. This is just for testing.

function Signup() {

  

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-black border shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-white text-center mb-6">Signup</h1>
        <form className="space-y-4" onSubmit={(e) => handleSubmit(e, "http://localhost:5000/signup")}>
          <div className="space-y-3">
            <input name="username" type="text" placeholder="Enter your username" className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent" required />
            <input name="password" type="password" placeholder="Enter your password" className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent" required />
          </div>
          <button type="submit" className="w-full py-2 bg-white text-black font-semibold rounded-lg shadow-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-1">
            Signup
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
