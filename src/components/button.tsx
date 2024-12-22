import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Buttons() {
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
      <div className="flex flex-col justify-center items-center text-2xl text-[#FFFFFF] gap-20 bg-black p-20 rounded-3xl border-[#302f2f] border">
        <h1 className="text-[#FFFFFF] text-7xl mb-4">
          Welcome to <span>QUICKIZZ</span>
        </h1>
        <div className="flex flex-col gap-4 items-center">
          <Link
            className="visited:text-black flex justify-center rounded-lg px-3 py-5 border text-xl-1  bg-white w-60 font-medium text-black"
            to="/user"
          >
            {" "}
            Login as User{" "}
          </Link>
          <Link
            className="visited:text-black flex justify-center rounded-lg px-3 py-5 border text-xl-1  bg-white w-60 font-medium text-black"
            to="/admin"
          >
            Login as Admin
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default Buttons;
