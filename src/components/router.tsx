import { Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Buttons from "./button";
import User from "./user";
import Admin from "./admin";
import { useLocation } from "react-router-dom";

function Router() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Buttons />} />
        <Route path="/user" element={<User />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </AnimatePresence>
  );
}

export default Router;
