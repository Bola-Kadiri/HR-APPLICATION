import { Link } from 'react-router-dom'; // Import NavLink instead of Link
import alphamead_img from '../../assets/amg-logo-1.png';
import './Navbar.css';


const Navbar = () => {
  return (
    <div className="nav-bar">
      <img src={alphamead_img} alt="alphamead-logo" />
      <div className="nav-links">
        <Link
          to="/"
          className="nav-link"
          activeClassName="active"
          exact // Ensures the link is active only when it matches exactly
        >
          Home
        </Link>
        <Link to="/job-page" className="nav-link" activeClassName="active">
          Job List
        </Link>
        <Link to="/career-page" className="nav-link" activeClassName="active">
          Career Page
        </Link>
        <Link to="/contact" className="nav-link" activeClassName="active">
          Contact
        </Link>
        <button>
          <Link to="/register">Register</Link>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
