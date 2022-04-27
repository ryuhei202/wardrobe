import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// import { App } from "./components/App";
import { reportWebVitals } from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

Sentry.init({
  dsn: "https://b4f86b4f452545ddaaf64d1c905015fe@o1202316.ingest.sentry.io/6327651",
  integrations: [new BrowserTracing()],
  tracesSampleRate: 0,
  // environment: "development",
});

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Sentry.ErrorBoundary>
        {/* <App /> */}
        <button
          onClick={() => {
            throw new Error("エラーーーーーーーーーーーー");
          }}
        >
          エラー
        </button>
      </Sentry.ErrorBoundary>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
