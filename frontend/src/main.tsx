import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <div className="bg-[#2b2b2b] p-10">
    <App />
  </div>
);
