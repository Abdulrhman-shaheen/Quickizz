import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Router from "./components/router";
import "./index.css";

createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
      <Router />
    </BrowserRouter>
);
