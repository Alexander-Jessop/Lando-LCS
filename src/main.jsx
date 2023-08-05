import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import FBProvider from "./Firebase/FBProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <FBProvider>
      <App />
    </FBProvider>
  </React.StrictMode>
);
