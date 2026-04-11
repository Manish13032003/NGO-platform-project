import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Education from "./pages/Education";
import Healthcare from "./pages/Healthcare";
import Donations from "./pages/Donations";
import Volunteers from "./pages/Volunteers";
import Reports from "./pages/Reports";
import DashboardLayout from "./components/layout/DashboardLayout";
import DashboardOverview from "./pages/dashboard/DashboardOverview";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/education" element={<Education />} />
          <Route path="/healthcare" element={<Healthcare />} />
          <Route path="/donations" element={<Donations />} />
          <Route path="/volunteers" element={<Volunteers />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardOverview />} />
            <Route path="education" element={<Education />} />
            <Route path="healthcare" element={<Healthcare />} />
            <Route path="donations" element={<Donations />} />
            <Route path="volunteers" element={<Volunteers />} />
            <Route path="reports" element={<Reports />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
