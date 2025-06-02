
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { PlanProvider } from "@/context/PlanContext";
import Index from "./pages/Index";
import SectionPage from "./pages/SectionPage";
import Summary from "./pages/Summary";
import BMRCalculator from "./pages/BMRCalculator";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <PlanProvider>
          <Toaster />
          <Sonner />
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
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
