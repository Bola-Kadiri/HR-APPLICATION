import { Outlet } from "react-router-dom";
import AuthHeader from "./AuthHeader";


const AuthLayout = () => {
  return (
    <div className="flex">
      <AuthHeader/>
      <Outlet />
    </div>
  );
};

export default AuthLayout;
