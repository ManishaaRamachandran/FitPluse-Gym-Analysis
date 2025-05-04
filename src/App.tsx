
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import OwnerLogin from "./pages/OwnerLogin";
import MemberLogin from "./pages/MemberLogin";
import SignUp from "./pages/SignUp";
import OwnerDashboard from "./pages/OwnerDashboard";
import MemberDashboard from "./pages/MemberDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/owner-login" element={<OwnerLogin />} />
          <Route path="/member-login" element={<MemberLogin />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/owner-dashboard/*" element={<OwnerDashboard />} />
          <Route path="/member-dashboard/*" element={<MemberDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
