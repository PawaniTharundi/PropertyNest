import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {" "}
    {/* StrictMode helps highlight potential problems in the app during development */}
    <App /> {/* Renders the App component into the root DOM element */}
  </React.StrictMode>
);
