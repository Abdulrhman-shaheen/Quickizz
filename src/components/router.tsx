import { Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Home from "./home";
import Student from "./student";
import Lecturer from "./lecturer";

import StudentIntf from "./studentintf";
import LecturerIntf from "./lecturerintf";

import StudentHome from "./studenthome";
import LecturerHome from "./lecturerhome";

import Error from "./error"
import Signup from "./signup";
import { useLocation } from "react-router-dom";

function Router() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/student" element={<Student />} />
        <Route path="/lecturer" element={<Lecturer />} />
        
        <Route path="/student/home" element={<StudentHome />} />
        <Route path="/lecturer/home" element={<LecturerHome />} />
        

        <Route path="/student/interface" element={<StudentIntf />} />
        <Route path="/lecturer/interface" element={<LecturerIntf />} />
        
        <Route path="/signup" element={<Signup />} />
        <Route path="/student/interface/:sess_id" element={<StudentIntf />} />
        <Route path="/lecturer/interface/:sess_id" element={<LecturerIntf />} />

        <Route path="*" element={<Error />} /> 
      </Routes>
    </AnimatePresence>
  );
}

export default Router;
