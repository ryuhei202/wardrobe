import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { App } from "./components/App";
import { reportWebVitals } from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [new BrowserTracing()],
  tracesSampleRate: 0,
  environment: process.env.NODE_ENV,
});

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Sentry.ErrorBoundary>
        <App />
      </Sentry.ErrorBoundary>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
