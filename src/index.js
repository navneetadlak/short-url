import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";

const root = document.getElementById("root");

// Use createRoot instead of ReactDOM.render
const rootElement = ReactDOM.createRoot(root);

rootElement.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
