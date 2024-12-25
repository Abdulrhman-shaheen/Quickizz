import {motion} from "framer-motion";
import { FC } from "react";

const QuestionsTransition: FC <React.PropsWithChildren> = ({children}) =>{
    return(
        <motion.div className="border-white border-2 min-w-96 rounded-lg p-4 m-4 flex flex-col w-1/2 justify-center text-white"
        initial = {{y: "100vh", opacity: 0}}
        animate = {{y: "0vh", opacity: 1}}
        transition={{duration: 0.8}}
        onAnimationComplete={() => {
            document.querySelector("body")?.classList.remove("overflow-hidden")
          }}
          onAnimationStart={() => {document.querySelector("body")?.classList.add("overflow-hidden")}}
        >
            {children}
        </motion.div>
    )
};

export default QuestionsTransition;