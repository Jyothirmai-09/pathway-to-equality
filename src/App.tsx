
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { SpecificationProvider } from "@/hooks/useSpecification";
import Index from "./pages/Index";
import Specification from "./pages/Specification";
import Mentor from "./pages/Mentor";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Index />} />
        <Route path="/specification" element={<Specification />} />
        <Route path="/mentor" element={<Mentor />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <SpecificationProvider>
        <BrowserRouter>
          <div className="min-h-screen flex flex-col">
            <Header />
            <AnimatedRoutes />
          </div>
        </BrowserRouter>
      </SpecificationProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
