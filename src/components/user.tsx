import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { handleSubmit } from "../utils/handlesubmit.ts";
import { useLocation, useNavigate } from "react-router-dom";
function User() {
  const previousAnimation = localStorage.getItem("animation") || "100vh";
  const home = useLocation().pathname
  const navigate = useNavigate()

  return (
    <motion.div
      className="absolute box-border h-screen w-screen flex flex-col justify-center items-center"
      variants={{
        initial: {
          x: previousAnimation,
        },
        final: {
          x: "0vh",
        },
      }}
      initial="initial"
      animate="final"
      transition={{ duration: 0.3 }}
      onAnimationComplete={() => {
        localStorage.setItem(
          "animation",
          previousAnimation === "-100vh" ? "100vh" : "-100vh"
        );
        document.querySelector("body")?.classList.remove("overflow-hidden")
      }}
      onAnimationStart={() => {document.querySelector("body")?.classList.add("overflow-hidden")}}
    >
      <div className="flex flex-col justify-center items-center w-2/5 min-w-96 text-2xl text-[#FFFFFF] gap-9 bg-black p-8 rounded-3xl border-[#302f2f] border">
        <h1 className="text-[#FFFFFF] text-6xl mb-6 text-center"> Welcome Student </h1>
        <form className="flex flex-col gap-3" onSubmit={(e) => handleSubmit(e, `${import.meta.env.VITE_BACKEND_URL}/loginstudent`, home, navigate)}>
          <input
            className="rounded-xl border-[#302f2f] border text-white gap-2 min-w-80 cursor-text font-medium bg-black p-4 text-base"
            type="text"
            placeholder="Username"
          />
          <input
            className="rounded-xl border-[#302f2f] border text-white gap-2 w-full cursor-text font-medium bg-black p-4 text-base"
            type="password"
            placeholder="Password"
          />
        </form>
        <div className="flex flex-col gap-2 justify-center items-center">
          <Link
            className="visited:text-black hover:bg-gray-200 no-underline flex justify-center rounded-lg p-3 border text-xl-1 cursor-pointer bg-white w-60 font-medium text-black"
            to="/user/userinter"
          >
            {" "}
            Login{" "}
          </Link>
          <p className="text-base">
            {" "}
            Don&apos;t have account?{" "}
            <Link className="underline" to="/signup">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default User;
