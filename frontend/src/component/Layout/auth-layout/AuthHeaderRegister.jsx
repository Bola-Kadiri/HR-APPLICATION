import "./AuthHeader.css";
import logo from "../../../assets/amg-logo-1.png";
import { Link } from "react-router-dom";

const AuthHeaderRegister = () => {
  return (
    <div className="auth-header">
      <Link to='/'>
        <img src={logo} alt="logo" />
      </Link>
      <span>
        Already have an account? <Link to="/login">Login here</Link>
      </span>
    </div>
  );
};

export default AuthHeaderRegister;
