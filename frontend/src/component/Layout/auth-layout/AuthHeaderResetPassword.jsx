
import logo from "../../../assets/amg-logo-1.png"
import { Link } from "react-router-dom";

const AuthHeaderResetPassword = () => {
  return (
    <div className="auth-header">
    <Link to='/'>
      <img src={logo} alt="logo" />
    </Link>
    <span>
      Remember your password now? <Link to="/login">Login here</Link>
    </span>
  </div>
  )
}

export default AuthHeaderResetPassword
