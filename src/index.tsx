import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { App } from "./components/App";
import { reportWebVitals } from "./reportWebVitals";
import Bugsnag from "@bugsnag/js";
import BugsnagPluginReact from "@bugsnag/plugin-react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

if (process.env.NODE_ENV === "production") {
  Bugsnag.start({
    apiKey: process.env.REACT_APP_BUGSNAG_API_KEY || "",
    plugins: [new BugsnagPluginReact()],
    enabledReleaseStages: ["production"],
    releaseStage: process.env.NODE_ENV,
  });
}
const ErrorBoundary = Bugsnag.getPlugin("react")?.createErrorBoundary(React)!;

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      {process.env.NODE_ENV === "production" ? (
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      ) : (
        <App />
      )}
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
