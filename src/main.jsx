import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { AppContext } from "./useContextHook/useContextApi.jsx";
import { ThemeProvider } from "./useContextHook/useTheme.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <AppContext>
          <App />
        </AppContext>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
);
