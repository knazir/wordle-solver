import React from "react";
import ReactDOM from "react-dom";
import ReactGA from "react-ga";

import App from "./components/App";

import "./index.css";

ReactGA.initialize("G-SZJNJJP2JP");
ReactGA.pageview(window.location.pathname + window.location.search);

ReactDOM.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
  document.getElementById("root")
);
