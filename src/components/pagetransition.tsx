import { motion } from "framer-motion";
import { FC } from "react";

const PageTransition: FC <React.PropsWithChildren> = ({children}) =>{
    let previousAnimation = localStorage.getItem("animation") || "100vh";
    return (
      <motion.div  className="absolute box-border h-screen w-screen flex flex-col justify-center items-center"
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
        {children}
    </motion.div>)
}

export default PageTransition;