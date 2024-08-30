import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { TodoProvider } from "./context";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <TodoProvider>
      {" "}
      {/* makes context values accessible to child components */}
      <App />
    </TodoProvider>
  </React.StrictMode>
);
