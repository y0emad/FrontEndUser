import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import global_en from "./translation/en/global.json";
import global_ar from "./translation/ar/global.json";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
i18next.init({
  interpolation: { escapeValue: false },
  lng: "ar",
  resources: {
    en: {
      global: global_en,
    },
    ar: {
      global: global_ar,
    },
  },
});
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18next}>
      <App />
    </I18nextProvider>
  </React.StrictMode>
);
