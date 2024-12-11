
import logo from "../../assets/amg-logo-1.png";
import { Link } from "react-router-dom";

const AuthHeaderLogin = () => {
  return (
    <div className="auth-header">
    <Link to='/'>
      <img src={logo} alt="logo" />
    </Link>
    <span>
    Don&apos;t have an account?{" "} <Link to="/register">Register here</Link>
    </span>
  </div>
  )
}

export default AuthHeaderLogin
