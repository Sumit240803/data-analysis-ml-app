import React from 'react';
import "../general/css/Navbar.css";
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='nav'>
      <h3>DataBuzz</h3>
      <div className='mid-nav'>
        
        <span>
        <Link className='nav-link' to={"/resources"}>
        Resources
        </Link>
        </span>
       
        <span>
          <Link className='nav-link' to={"/explore"}>
          Explore
          </Link>
          </span>
        <span>
          <Link className='nav-link' to={"/contact"}>
          Contact
          </Link>
          </span>
      </div>
      <div> <Link to={"/login"} className='nav-link'>Get Started</Link></div>
    </div>
  );
};

export default Navbar;