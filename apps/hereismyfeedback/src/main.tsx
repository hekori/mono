import React, { StrictMode, useContext } from "react";
import * as ReactDOM from "react-dom";

import App from "./app/app";
import { GlobalProvider } from "./GlobalProvider";

ReactDOM.render(
  <StrictMode>
    <GlobalProvider>
      <App />
    </GlobalProvider>
  </StrictMode>,
  document.getElementById("root")
);
