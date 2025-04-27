
import { Outlet } from "react-router-dom";
import AdminHeader from "../navigation/AdminHeader";
import AdminSidebar from "../navigation/AdminSidebar";
import { useState } from "react";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  return (
    <div className="flex min-h-screen bg-enedis-gray-100">
      <AdminSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <div className="flex flex-col flex-1">
        <AdminHeader toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
