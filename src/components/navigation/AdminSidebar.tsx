
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  BarChart,
  Clock,
  FileText,
  Home,
  Map,
  Settings,
  User,
  Users,
} from "lucide-react";

interface AdminSidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

type NavItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

const AdminSidebar = ({ isOpen, setIsOpen }: AdminSidebarProps) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems: NavItem[] = [
    {
      label: "Tableau de bord",
      href: "/admin",
      icon: <Home size={20} />,
    },
    {
      label: "Demandes",
      href: "/admin/requests",
      icon: <FileText size={20} />,
    },
    {
      label: "Planning",
      href: "/admin/schedule",
      icon: <Clock size={20} />,
    },
    {
      label: "Techniciens",
      href: "/admin/technicians",
      icon: <Users size={20} />,
    },
    {
      label: "Cartographie",
      href: "/admin/map",
      icon: <Map size={20} />,
    },
    {
      label: "Statistiques",
      href: "/admin/stats",
      icon: <BarChart size={20} />,
    },
    {
      label: "Clients",
      href: "/admin/clients",
      icon: <User size={20} />,
    },
    {
      label: "Paramètres",
      href: "/admin/settings",
      icon: <Settings size={20} />,
    },
  ];

  return (
    <aside
      className={cn(
        "bg-white border-r fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-200 lg:static lg:transform-none",
        {
          "-translate-x-full lg:translate-x-0": !isOpen,
        }
      )}
    >
      <div className="p-4 border-b flex items-center">
        <Link to="/" className="flex items-center space-x-2">
          <img
            src="/logo-enedis.svg"
            alt="Enedis"
            className="h-8 w-auto"
            onError={(e) => {
              e.currentTarget.src = "https://placeholder.co/100x40/0063AF/FFFFFF?text=ENEDIS";
            }}
          />
          <span className="font-semibold text-enedis-gray-800">Admin</span>
        </Link>
      </div>

      <nav className="p-2">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                to={item.href}
                className={cn(
                  "flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  currentPath === item.href
                    ? "bg-enedis-blue text-white"
                    : "text-enedis-gray-700 hover:bg-enedis-lightBlue hover:text-enedis-blue"
                )}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
