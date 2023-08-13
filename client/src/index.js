import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthProvider } from "contexts/auth.context";
import ErrorBoundary from "components/errorBoundary/ErrorBoundary";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <ErrorBoundary fallback={<p>Something went wrong</p>}>
        <App />
      </ErrorBoundary>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
