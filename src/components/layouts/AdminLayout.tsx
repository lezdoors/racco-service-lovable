
import { Outlet, Navigate } from "react-router-dom";
import AdminHeader from "../navigation/AdminHeader";
import AdminSidebar from "../navigation/AdminSidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/hooks/useAuth";
import { useState, useEffect } from "react";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const isMobile = useIsMobile();
  const { user, isLoading } = useAuth();
  
  // Auto-close sidebar on mobile devices
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
  }, [isMobile]);
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-enedis-gray-100">
        <div className="flex flex-col items-center">
          <div className="h-8 w-8 border-4 border-t-enedis-blue border-r-enedis-blue border-b-transparent border-l-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-enedis-gray-700">Chargement...</p>
        </div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }
  
  return (
    <div className="flex min-h-screen bg-enedis-gray-100">
      <AdminSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <div className="flex flex-col flex-1">
        <AdminHeader toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 p-3 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
