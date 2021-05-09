import React, { StrictMode } from "react";
import * as ReactDOM from "react-dom";
import "tailwindcss/tailwind.css";
import { GlobalProvider } from "./GlobalProvider";
import { App } from "./app/app";

ReactDOM.render(
  <StrictMode>
    <GlobalProvider>
      <App />
    </GlobalProvider>
  </StrictMode>,
  document.getElementById("root")
);
