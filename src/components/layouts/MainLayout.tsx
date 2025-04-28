
import { Outlet, useLocation } from "react-router-dom";
import Header from "../navigation/Header";
import CustomFooter from "../navigation/CustomFooter";
import FloatingButton from "../ui/FloatingButton";

const MainLayout = () => {
  const location = useLocation();
  const isFormPage = location.hash === "#demande";

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <CustomFooter />
      {!isFormPage && <FloatingButton href="/#demande" />}
    </div>
  );
};

export default MainLayout;
