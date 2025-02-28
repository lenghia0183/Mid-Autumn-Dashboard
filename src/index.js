import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { SWRConfig } from "swr";

import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import { UserProvider } from "./context";
import { LoadingProvider } from "./context/loadingContext";
import loadingMiddleware from "./middlewares/loadingMiddleware";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <I18nextProvider i18n={i18n}>
      <LoadingProvider>
        <SWRConfig
          value={{
            refreshInterval: 0,
            revalidateOnFocus: false,
            shouldRetryOnError: false,
            use: [loadingMiddleware],
          }}
        >
          <UserProvider>
            <App />
          </UserProvider>
        </SWRConfig>
      </LoadingProvider>
    </I18nextProvider>
  </StrictMode>
);
