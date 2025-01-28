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
      <div>Get Started</div>
    </div>
  );
};

export default Navbar;