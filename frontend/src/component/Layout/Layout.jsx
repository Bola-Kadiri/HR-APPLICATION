import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../footer/Footer";

const Layout = () => {
  return (
    <div className="flex">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
