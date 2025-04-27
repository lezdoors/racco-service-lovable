
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminRequests from "./pages/admin/Requests";
import AdminLogin from "./pages/admin/Login";
import MainLayout from "./components/layouts/MainLayout";
import AdminLayout from "./components/layouts/AdminLayout";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentCancel from "./pages/PaymentCancel";
import { initGTM } from './lib/google-tag-manager';
import { useEffect } from 'react';
import "./App.css";
import ThankYou from './pages/ThankYou';
import { AuthProvider, RequireAuth } from "./hooks/useAuth";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  useEffect(() => {
    // Initialize Google Tag Manager when the app loads
    initGTM();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<MainLayout />}>
                <Route index element={<Index />} />
                <Route path="success" element={<PaymentSuccess />} />
                <Route path="cancel" element={<PaymentCancel />} />
                <Route path="thank-you" element={<ThankYou />} />
              </Route>
              
              <Route path="/admin/login" element={<AdminLogin />} />
              
              <Route path="/admin" element={
                <RequireAuth>
                  <AdminLayout />
                </RequireAuth>
              }>
                <Route index element={<AdminDashboard />} />
                <Route path="requests" element={<AdminRequests />} />
              </Route>
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
