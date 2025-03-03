import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { SettingProvider } from "./context/SettingContext.jsx";

createRoot(document.getElementById("root")).render(
  <SettingProvider>
    <App />
  </SettingProvider>
);
