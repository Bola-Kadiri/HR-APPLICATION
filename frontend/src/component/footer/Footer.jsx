import './Footer.css'
import logo from '../../assets/amg-logo-1.png';
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Footer =()=>{
    return(
        <div className="footer">
            <div className="footer-content">
                <div className="footer-content-left">
                    <img src={logo} alt="" />
                    <p>Est class vel si sit orci rutrum at morbi commodo pellentesque. 
                        Faucibus sociosqu suspendisse integer id justo enim letius eleifend 
                        volutpat suscipit consectetur.
                    </p>
                    <div className='footer-content-left-icons'>
                        <div className="icons">
                            <FaFacebook className='icon'/>
                        </div>
                        <div className="icons">
                            <FaTwitter className='icon'/>
                        </div>
                        <div className="icons">
                            < FaYoutube className='icon'/>
                        </div>
                    </div>
                </div>
                <div className="footer-content-right">
                    <div className='category'>
                       <h2>Categories</h2>
                       <Link to={"#"}>Full Time</Link>
                       <Link to={"#"}>Part Time</Link>
                       <Link to={"#"}>Internship</Link>
                    </div>
                    <div className='company'>
                       <h2>Company</h2>
                       <Link to={"#"}>About Us</Link>
                       <Link to={"#"}>Careers</Link>
                       <Link to={"#"}>News & Article</Link>
                    </div>
                    <div className='newsletter'>
                       <h2>Newsletter</h2>
                       <Link to={"#"}>Get exclusive deals by signing up to our Newsletter.</Link>
                       <Link to={"#"}>Careers</Link>
                       <Link to={"#"}>News & Article</Link>
                       <input type="text" placeholder='Email'/>
                       <button>Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Footer