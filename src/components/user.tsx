import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function User() {
  const previousAnimation = localStorage.getItem("animation") || "100vh";
  return (
    <motion.div
      className="box-border h-screen w-screen flex flex-col justify-center items-center"
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
      onAnimationComplete={() => {
        localStorage.setItem(
          "animation",
          previousAnimation === "-100vh" ? "100vh" : "-100vh"
        );
      }}
    >
      <div className="flex flex-col justify-center items-center w-2/5  text-2xl text-[#FFFFFF] gap-9 bg-black p-10 rounded-3xl border-[#302f2f] border">
        <h1 className="text-[#FFFFFF] text-6xl mb-6"> Welcome Student </h1>
        <div className="flex flex-col gap-3">
          <input
            className="rounded-3xl border-[#302f2f] border text-white gap-2 w-60 cursor-text font-medium bg-black min-w-80 px-3 py-5 text-base"
            type="text"
            placeholder="Username"
          />
          <input
            className="rounded-3xl border-[#302f2f] border text-white gap-2 w-60 cursor-text font-medium bg-black min-w-80 px-3 py-5 text-base"
            type="password"
            placeholder="Password"
          />
        </div>
        <div className="flex flex-col gap-2 justify-center items-center">
          <Link
            className="visited:text-black no-underline flex justify-center rounded-lg px-3 py-5 border text-xl-1 cursor-pointer bg-white w-60 font-medium text-black"
            to="/userinter"
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
