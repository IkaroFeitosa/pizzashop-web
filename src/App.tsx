import "@/global.css";
import { RouterProvider } from "react-router";
import { router } from "./routes";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Toaster } from "sonner";
import { ThemeProvider } from "./components/theme/theme-provider";
export function App() {
  return (
    <HelmetProvider>
      <ThemeProvider storageKey="pizza-shop-theme" defaultTheme="dark">
        <Helmet titleTemplate="%s | Pizza Shop" />
        <RouterProvider router={router} />
        <Toaster richColors />
      </ThemeProvider>
    </HelmetProvider>
  );
}
