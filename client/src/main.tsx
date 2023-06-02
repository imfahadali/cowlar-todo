import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import UserProvider from "./context/UserProvider";

import "./index.css";

const GClientID = "";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>
);
