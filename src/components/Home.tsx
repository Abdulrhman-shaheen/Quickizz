import { Link } from "react-router-dom";
import PageTransition from "./pagetransition";

function Home() {  return (
        <PageTransition>
            <div className="flex flex-col justify-center min-w-96 items-center text-2xl text-[#FFFFFF] gap-20 bg-black p-20 rounded-3xl border-[#302f2f] border">
        <h1 className="text-[#FFFFFF] text-6xl mb-4 text-center">
          Welcome to <span className="font-outfit">QUICKIZZ</span>
        </h1>
        <div className="flex flex-col gap-4 items-center">
          <Link
            className="visited:text-black hover:bg-gray-200 flex justify-center rounded-lg px-3 py-5 border text-xl-1  bg-white w-60 font-medium text-black"
            to="/student"
          >
            {" "}
            Login as Student{" "}
          </Link>
          <Link
            className="visited:text-black hover:bg-gray-200 flex justify-center rounded-lg px-3 py-5 border text-xl-1  bg-white w-60 font-medium text-black"
            to="/lecturer"
          >
            Login as Lecturer
          </Link>
        </div>
      </div>
    </PageTransition>
  );
}

export default Home;
