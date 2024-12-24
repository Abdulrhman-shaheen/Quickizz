import { Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "./Home";
import User from "./user";
import Admin from "./admin";
import UserInter from "./userinter";
import Error from "./error"
import Signup from "./signup";
import { useLocation } from "react-router-dom";

function Router() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<User />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/user/userinter" element={<UserInter />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Error />} /> 
      </Routes>
    </AnimatePresence>
  );
}

export default Router;
