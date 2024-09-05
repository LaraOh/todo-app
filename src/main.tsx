import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { TodoProvider } from "./context";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <TodoProvider>
      {" "}
      {/* makes context values accessible to child components */}
      <App />
    </TodoProvider>
  </React.StrictMode>
);
