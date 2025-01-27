import React from 'react'
import "../general/css/Navbar.css"
const Navbar = () => {
  return (
    <div className='nav'>
        <h3>
            DataBuzz
        </h3>
        <div className='mid-nav'>
            <span>Resources</span>
            <span>Explore</span>
            <span>Contact</span>
        </div>
        <div>
            Get Started
        </div>
    </div>
  )
}

export default Navbar