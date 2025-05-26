import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app";
import { enableMSSW } from "./api/mocks";

enableMSSW().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
});
