import { Link } from "react-router-dom";
import PageTransition from "./pagetransition";
import { handleSubmit } from "../utils/handlesubmit.ts";

function Admin() {
  return (
<PageTransition>
      <div className="flex flex-col justify-center items-center w-2/5 min-w-96 text-center text-2xl text-[#FFFFFF] gap-9 bg-black p-8 rounded-3xl border-[#302f2f] border">
        <h1 className="text-[#FFFFFF] text-6xl mb-6"> Welcome Lecturer </h1>
        <form className="flex flex-col gap-3 space-y-7 items-center" onSubmit={(e) => handleSubmit(e, "http://localhost:5000/login")}>
        <div className="flex flex-col gap-3">
          <input
            className="rounded-xl border-[#302f2f] border text-white gap-2 w-60 cursor-text font-medium bg-black min-w-80 px-3 py-5 text-base"
            type="text"
            placeholder="Username"
          />
          <input
            className="rounded-xl border-[#302f2f] border text-white gap-2 w-60 cursor-text font-medium bg-black min-w-80 px-3 py-5 text-base"
            type="password"
            placeholder="Password"
          />
          </div>
        <div className="flex flex-col gap-2 justify-center items-center">
        <Link to="/admin/admininter"> <button type='submit'
            className="visited:text-black hover:bg-gray-200 no-underline flex justify-center rounded-lg p-3 border text-xl-1 cursor-pointer bg-white w-60 font-medium text-black"
          >
            {" "}
            Login{" "}
          </button></Link>
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
export default Admin;
