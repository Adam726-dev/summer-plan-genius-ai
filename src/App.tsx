
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { PlanProvider } from "@/context/PlanContext";
import { Toaster } from "sonner";
import Index from "./pages/Index";
import SectionPage from "./pages/SectionPage";
import Summary from "./pages/Summary";
import BMRCalculator from "./pages/BMRCalculator";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <PlanProvider>
        <Toaster />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dieta" element={<SectionPage />} />
            <Route path="/silownia" element={<SectionPage />} />
            <Route path="/imprezy" element={<SectionPage />} />
            <Route path="/wakacje" element={<SectionPage />} />
            <Route path="/kalkulator-bmr" element={<BMRCalculator />} />
            <Route path="/podsumowanie" element={<Summary />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </PlanProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
