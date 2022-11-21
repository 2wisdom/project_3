import { createRoot } from "react-dom/client";
import React, { ReactDOM } from "react";
import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container as Element);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
